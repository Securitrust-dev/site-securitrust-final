#!/usr/bin/env python3
"""Lecture des données Search Console et GA4 pour les agents SEO (remplace Supermetrics).

Accès : compte de service Google « seo-agents@securitrust-seo.iam.gserviceaccount.com »,
lecture seule (Search Console : utilisateur restreint ; GA4 : lecteur).
La clé n'est JAMAIS dans ce dépôt (public). Elle est lue, dans cet ordre :
  1. GOOGLE_SA_KEY_B64 : contenu du fichier JSON encodé en base64 (variable d'environnement) ;
  2. GOOGLE_SA_KEY_JSON : contenu JSON brut ;
  3. GOOGLE_APPLICATION_CREDENTIALS : chemin d'un fichier JSON.

Dépendances : pip install --break-system-packages google-auth requests

Exemples (sortie JSON sur stdout) :
  python3 scripts/seo_data.py gsc --days 28 --dims query --limit 50
  python3 scripts/seo_data.py gsc --start 2026-11-01 --end 2026-11-07 --dims date
  python3 scripts/seo_data.py gsc --days 7 --dims page,query --filter page~rssi
  python3 scripts/seo_data.py ga4 --days 7 --dims sessionDefaultChannelGroup --metrics sessions,totalUsers,keyEvents
  python3 scripts/seo_data.py ga4 --days 1 --dims pagePath --metrics eventCount --event generate_lead
  python3 scripts/seo_data.py check   # vérifie les deux accès

Dates : Search Console a 2 à 3 jours de retard ; par défaut la période se termine
3 jours avant aujourd'hui pour GSC et hier pour GA4.
"""
import argparse
import base64
import datetime as dt
import json
import os
import sys

GSC_SITE = 'sc-domain:securitrust.fr'
GA4_PROPERTY = '543893918'
SCOPES = [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/analytics.readonly',
]


def session():
    try:
        from google.oauth2 import service_account
        from google.auth.transport.requests import AuthorizedSession
    except ImportError:
        sys.exit('Installer les dépendances : pip install --break-system-packages google-auth requests')
    info = None
    if os.environ.get('GOOGLE_SA_KEY_B64'):
        info = json.loads(base64.b64decode(os.environ['GOOGLE_SA_KEY_B64']).decode())
    elif os.environ.get('GOOGLE_SA_KEY_JSON'):
        info = json.loads(os.environ['GOOGLE_SA_KEY_JSON'])
    elif os.environ.get('GOOGLE_APPLICATION_CREDENTIALS'):
        with open(os.environ['GOOGLE_APPLICATION_CREDENTIALS']) as f:
            info = json.load(f)
    if not info:
        sys.exit('Clé absente : définir GOOGLE_SA_KEY_B64 (ou GOOGLE_SA_KEY_JSON / GOOGLE_APPLICATION_CREDENTIALS).')
    creds = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
    return AuthorizedSession(creds)


def period(args, lag):
    if args.start and args.end:
        return args.start, args.end
    end = dt.date.today() - dt.timedelta(days=lag)
    start = end - dt.timedelta(days=args.days - 1)
    return str(start), str(end)


def gsc(s, args):
    start, end = period(args, 3)
    body = {
        'startDate': start,
        'endDate': end,
        'dimensions': [d for d in args.dims.split(',') if d],
        'rowLimit': args.limit,
        'dataState': 'all',
    }
    if args.filter:
        groups = []
        for f in args.filter:
            dim, op, val = (f.partition('~') if '~' in f else f.partition('='))
            groups.append({'dimension': dim, 'operator': 'contains' if op == '~' else 'equals', 'expression': val})
        body['dimensionFilterGroups'] = [{'filters': groups}]
    r = s.post(
        f'https://searchconsole.googleapis.com/webmasters/v3/sites/{GSC_SITE.replace(":", "%3A")}/searchAnalytics/query',
        json=body,
    )
    r.raise_for_status()
    rows = [
        {**dict(zip(body['dimensions'], x.get('keys', []))),
         'clicks': x['clicks'], 'impressions': x['impressions'],
         'ctr': round(x['ctr'] * 100, 2), 'position': round(x['position'], 1)}
        for x in r.json().get('rows', [])
    ]
    return {'source': 'search_console', 'site': GSC_SITE, 'start': start, 'end': end, 'rows': rows}


def ga4(s, args):
    start, end = period(args, 1)
    body = {
        'dateRanges': [{'startDate': start, 'endDate': end}],
        'dimensions': [{'name': d} for d in args.dims.split(',') if d],
        'metrics': [{'name': m} for m in args.metrics.split(',') if m],
        'limit': args.limit,
    }
    if args.event:
        body['dimensionFilter'] = {'filter': {'fieldName': 'eventName', 'stringFilter': {'value': args.event}}}
    r = s.post(f'https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY}:runReport', json=body)
    r.raise_for_status()
    dims = [d['name'] for d in body['dimensions']]
    mets = [m['name'] for m in body['metrics']]
    rows = []
    for x in r.json().get('rows', []):
        row = dict(zip(dims, [d['value'] for d in x.get('dimensionValues', [])]))
        for k, v in zip(mets, [m['value'] for m in x.get('metricValues', [])]):
            row[k] = float(v) if '.' in v else int(v)
        rows.append(row)
    return {'source': 'ga4', 'property': GA4_PROPERTY, 'start': start, 'end': end, 'rows': rows}


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('cmd', choices=['gsc', 'ga4', 'check'])
    p.add_argument('--days', type=int, default=28)
    p.add_argument('--start')
    p.add_argument('--end')
    p.add_argument('--dims', default='')
    p.add_argument('--metrics', default='sessions,totalUsers,engagedSessions,keyEvents')
    p.add_argument('--limit', type=int, default=250)
    p.add_argument('--filter', action='append', help='GSC : dimension~contient ou dimension=égal (répétable)')
    p.add_argument('--event', help='GA4 : ne garder que cet événement (ex. generate_lead)')
    args = p.parse_args()
    s = session()
    if args.cmd == 'check':
        a = argparse.Namespace(**{**vars(args), 'days': 7, 'dims': '', 'filter': None, 'event': None, 'limit': 1,
                                  'metrics': 'sessions'})
        out = {'search_console': gsc(s, a)['rows'], 'ga4': ga4(s, a)['rows']}
    elif args.cmd == 'gsc':
        out = gsc(s, args)
    else:
        out = ga4(s, args)
    json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
    print()


if __name__ == '__main__':
    main()
