import { cookies } from 'next/headers';
import { createHmac } from 'crypto';
import { client } from '@/db';
import AdminLoginForm from './AdminLoginForm';

const COOKIE_NAME = 'st_admin_auth';

function createSessionToken(key: string): string {
  return createHmac('sha256', key).update('admin:session:v1').digest('hex');
}

interface Row { [key: string]: unknown }

async function getStats() {
  try {
    // Views last 30 days
    const totalViews = await client.execute(
      `SELECT COUNT(*) as c FROM page_views WHERE created_at >= datetime('now', '-30 days')`
    );
    const totalViewsToday = await client.execute(
      `SELECT COUNT(*) as c FROM page_views WHERE created_at >= datetime('now', 'start of day')`
    );
    const totalViews7d = await client.execute(
      `SELECT COUNT(*) as c FROM page_views WHERE created_at >= datetime('now', '-7 days')`
    );

    // Unique sessions last 30 days
    const uniqueSessions = await client.execute(
      `SELECT COUNT(DISTINCT session_id) as c FROM page_views WHERE created_at >= datetime('now', '-30 days')`
    );

    // Avg duration (seconds) last 30 days
    const avgDuration = await client.execute(
      `SELECT AVG(duration) as c FROM page_views WHERE created_at >= datetime('now', '-30 days') AND duration IS NOT NULL AND duration > 0`
    );

    // Daily views — last 14 days
    const dailyViews = await client.execute(
      `SELECT DATE(created_at) as day, COUNT(*) as count FROM page_views
       WHERE created_at >= datetime('now', '-14 days')
       GROUP BY DATE(created_at) ORDER BY day ASC`
    );

    // Top pages last 30 days
    const topPages = await client.execute(
      `SELECT path, COUNT(*) as count FROM page_views
       WHERE created_at >= datetime('now', '-30 days')
       GROUP BY path ORDER BY count DESC LIMIT 15`
    );

    // Device breakdown
    const devices = await client.execute(
      `SELECT device_type, COUNT(*) as count FROM page_views
       WHERE created_at >= datetime('now', '-30 days')
       GROUP BY device_type`
    );

    // Top referrers
    const referrers = await client.execute(
      `SELECT referrer, COUNT(*) as count FROM page_views
       WHERE created_at >= datetime('now', '-30 days') AND referrer IS NOT NULL AND referrer != ''
       GROUP BY referrer ORDER BY count DESC LIMIT 10`
    );

    // Country breakdown
    const countries = await client.execute(
      `SELECT country, COUNT(*) as count FROM page_views
       WHERE created_at >= datetime('now', '-30 days') AND country IS NOT NULL
       GROUP BY country ORDER BY count DESC LIMIT 10`
    );

    // Recent visits
    const recent = await client.execute(
      `SELECT path, device_type, country, ip, referrer, duration, created_at
       FROM page_views ORDER BY id DESC LIMIT 30`
    );

    return {
      totalViews: Number((totalViews.rows[0] as Row)?.c ?? 0),
      totalViewsToday: Number((totalViewsToday.rows[0] as Row)?.c ?? 0),
      totalViews7d: Number((totalViews7d.rows[0] as Row)?.c ?? 0),
      uniqueSessions: Number((uniqueSessions.rows[0] as Row)?.c ?? 0),
      avgDuration: Math.round(Number((avgDuration.rows[0] as Row)?.c ?? 0)),
      dailyViews: dailyViews.rows as Row[],
      topPages: topPages.rows as Row[],
      devices: devices.rows as Row[],
      referrers: referrers.rows as Row[],
      countries: countries.rows as Row[],
      recent: recent.rows as Row[],
    };
  } catch {
    return null;
  }
}

function fmtDuration(s: number) {
  if (!s) return '—';
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch { return iso; }
}

function fmtDay(d: string) {
  try {
    return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  } catch { return d; }
}

async function getDayLogs(date: string) {
  try {
    const rows = await client.execute({
      sql: `SELECT path, device_type, country, ip, referrer, duration, created_at
            FROM page_views
            WHERE DATE(created_at) = ?
            ORDER BY id DESC
            LIMIT 500`,
      args: [date],
    });
    const count = await client.execute({
      sql: `SELECT COUNT(*) as c FROM page_views WHERE DATE(created_at) = ?`,
      args: [date],
    });
    return {
      rows: rows.rows as Row[],
      total: Number((count.rows[0] as Row)?.c ?? 0),
    };
  } catch {
    return null;
  }
}

export default async function AdminStatsPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(COOKIE_NAME);
  const dashboardKey = process.env.DASHBOARD_KEY;

  if (!dashboardKey || authCookie?.value !== createSessionToken(dashboardKey)) {
    return <AdminLoginForm />;
  }

  const params = await searchParams;
  const selectedDate = params.date ?? '';

  const stats = await getStats();
  const dayLogs = selectedDate ? await getDayLogs(selectedDate) : null;

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-center">
          <p className="text-cyan-400 text-lg font-mono mb-2">Analytics Dashboard</p>
          <p className="text-white/50 text-sm">Aucune donnée disponible — le tracker vient d&apos;être activé.</p>
          <p className="text-white/30 text-xs mt-4">Les premières visites apparaîtront ici automatiquement.</p>
        </div>
      </div>
    );
  }

  const maxDaily = Math.max(...stats.dailyViews.map((d) => Number(d.count)), 1);
  const totalDevices = stats.devices.reduce((s, d) => s + Number(d.count), 0) || 1;

  return (
    <div className="min-h-screen text-white" style={{ background: '#030303', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white font-semibold tracking-wider text-sm uppercase">SecuriTrust — Analytics</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-white/30 text-xs font-mono">30 derniers jours</span>
          <form action="/api/admin-logout" method="POST">
            <button type="submit" className="text-white/30 hover:text-white/60 text-xs font-mono transition-colors">
              Déconnexion
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Vues aujourd\'hui', value: stats.totalViewsToday, sub: null },
            { label: 'Vues 7 jours', value: stats.totalViews7d, sub: null },
            { label: 'Vues 30 jours', value: stats.totalViews, sub: null },
            { label: 'Sessions uniques', value: stats.uniqueSessions, sub: '30 jours' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{kpi.label}</p>
              <p className="text-3xl font-bold text-cyan-400">{kpi.value.toLocaleString('fr-FR')}</p>
              {kpi.sub && <p className="text-white/30 text-xs mt-1">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Avg duration */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Durée moyenne</p>
            <p className="text-3xl font-bold text-emerald-400">{fmtDuration(stats.avgDuration)}</p>
            <p className="text-white/30 text-xs mt-1">par page visitée</p>
          </div>
          {/* Device breakdown in a card */}
          <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Appareils (30 jours)</p>
            <div className="flex flex-wrap gap-6">
              {stats.devices.map((d) => {
                const pct = Math.round((Number(d.count) / totalDevices) * 100);
                const colors: Record<string, string> = { mobile: 'bg-violet-400', tablet: 'bg-amber-400', desktop: 'bg-cyan-400' };
                const color = colors[String(d.device_type)] ?? 'bg-white/40';
                return (
                  <div key={String(d.device_type)} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="text-white text-sm capitalize">{String(d.device_type) || 'inconnu'}</span>
                    <span className="text-white/50 text-sm font-mono">{pct}%</span>
                    <span className="text-white/30 text-xs">({Number(d.count)})</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Daily bar chart */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Vues par jour — 14 derniers jours</p>
          {stats.dailyViews.length === 0 ? (
            <p className="text-white/30 text-sm">Pas encore de données.</p>
          ) : (
            <div className="flex items-end gap-2 h-32">
              {stats.dailyViews.map((d) => {
                const h = Math.max(4, Math.round((Number(d.count) / maxDaily) * 128));
                return (
                  <div key={String(d.day)} className="flex-1 flex flex-col items-center gap-1 group">
                    <span className="text-cyan-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity font-mono">{d.count as number}</span>
                    <div
                      className="w-full rounded-t bg-cyan-500/70 hover:bg-cyan-400 transition-colors"
                      style={{ height: h }}
                      title={`${d.day}: ${d.count} vues`}
                    />
                    <span className="text-white/30 text-[9px] font-mono">{fmtDay(String(d.day))}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Top pages */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Pages les plus visitées</p>
            <div className="space-y-2">
              {stats.topPages.length === 0 && <p className="text-white/30 text-sm">Pas encore de données.</p>}
              {stats.topPages.map((p, i) => {
                const maxCount = Number(stats.topPages[0]?.count ?? 1);
                const pct = Math.round((Number(p.count) / maxCount) * 100);
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-white/20 text-xs font-mono w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-white text-xs truncate font-mono">{String(p.path)}</span>
                        <span className="text-cyan-400 text-xs font-bold ml-2 flex-shrink-0">{p.count as number}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500/50 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top referrers + countries */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Sources de trafic</p>
              <div className="space-y-2">
                {stats.referrers.length === 0 && <p className="text-white/30 text-sm">Pas encore de données.</p>}
                {stats.referrers.map((r, i) => {
                  let host = String(r.referrer || '');
                  try { host = new URL(host).hostname; } catch { /* keep raw */ }
                  return (
                    <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-white/5">
                      <span className="text-white/70 truncate font-mono text-xs max-w-[200px]">{host || 'direct'}</span>
                      <span className="text-white/50 text-xs">{r.count as number}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {stats.countries.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Pays</p>
                <div className="space-y-2">
                  {stats.countries.map((c, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-white/5">
                      <span className="text-white/70 text-xs font-mono">{String(c.country) || '—'}</span>
                      <span className="text-white/50 text-xs">{c.count as number}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Day logs section */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest">
                {selectedDate ? `Logs du ${fmtDay(selectedDate)}` : 'Visites récentes (30 dernières)'}
              </p>
              {dayLogs && (
                <p className="text-cyan-400 text-sm font-mono mt-1">{dayLogs.total} visite{dayLogs.total > 1 ? 's' : ''} ce jour-là</p>
              )}
            </div>
            <form method="GET" action="/admin-stats" className="flex items-center gap-2">
              <input
                type="date"
                name="date"
                defaultValue={selectedDate}
                className="bg-white/5 border border-white/15 text-white text-xs font-mono rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500/60 [color-scheme:dark]"
              />
              <button
                type="submit"
                className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-2 rounded-lg transition-colors"
              >
                Voir
              </button>
              {selectedDate && (
                <a
                  href="/admin-stats"
                  className="text-white/30 hover:text-white/60 text-xs font-mono px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                >
                  Réinitialiser
                </a>
              )}
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs table-fixed">
              <colgroup>
                <col style={{ width: '32%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '8%' }} />
                <col style={{ width: '8%' }} />
                <col style={{ width: '28%' }} />
              </colgroup>
              <thead>
                <tr className="text-white/30 border-b border-white/10">
                  <th className="text-left py-2 pr-4 font-medium">Page</th>
                  <th className="text-left py-2 pr-4 font-medium">IP</th>
                  <th className="text-left py-2 pr-4 font-medium">Appareil</th>
                  <th className="text-left py-2 pr-4 font-medium">Pays</th>
                  <th className="text-left py-2 pr-4 font-medium">Durée</th>
                  <th className="text-left py-2 font-medium">Référent</th>
                </tr>
              </thead>
              <tbody>
                {(dayLogs ? dayLogs.rows : stats.recent).map((r, i) => {
                  let refHost = String(r.referrer || '');
                  try { refHost = refHost ? new URL(refHost).hostname : '—'; } catch { refHost = refHost || '—'; }
                  return (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-2 pr-4 font-mono text-white/70 overflow-hidden" title={String(r.path)}>
                        <span className="block truncate">{String(r.path)}</span>
                      </td>
                      <td className="py-2 pr-4 font-mono text-cyan-400/60 text-[11px] overflow-hidden">
                        <span className="block truncate">{String(r.ip || '—')}</span>
                      </td>
                      <td className="py-2 pr-4 text-white/40 capitalize overflow-hidden">
                        <span className="block truncate">{String(r.device_type || '—')}</span>
                      </td>
                      <td className="py-2 pr-4 text-white/40 overflow-hidden">
                        <span className="block truncate">{String(r.country || '—')}</span>
                      </td>
                      <td className="py-2 pr-4 text-emerald-400/70">{fmtDuration(Number(r.duration))}</td>
                      <td className="py-2 text-white/30 overflow-hidden" title={String(r.referrer || '')}>
                        <span className="block truncate text-[11px] font-mono">{refHost}</span>
                      </td>
                    </tr>
                  );
                })}
                {dayLogs && dayLogs.rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-white/30">Aucune visite ce jour-là.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
