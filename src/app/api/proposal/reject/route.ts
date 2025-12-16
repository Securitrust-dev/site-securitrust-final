import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, answers, clientEmail } = body;

    if (!company || !clientEmail) {
      return NextResponse.json(
        { error: 'Données manquantes (company, clientEmail requis)' },
        { status: 400 }
      );
    }

    // Extraire quelques informations clés
    const hasAD = answers?.find((a: any) => a.questionId === 'hasAD')?.answer || 'Non spécifié';
    const userAccounts = answers?.find((a: any) => a.questionId === 'userAccounts')?.answer || 'Non spécifié';
    const securityMaturity = answers?.find((a: any) => a.questionId === 'securityMaturity')?.answer || 'Non spécifié';

    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #0a0f1c;
            color: #e2e8f0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: linear-gradient(135deg, #1a1f2e 0%, #0f1419 100%);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(56, 189, 248, 0.2);
          }
          .header {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 3px solid rgba(239, 68, 68, 0.3);
          }
          .header-icon {
            background: rgba(255, 255, 255, 0.1);
            display: inline-block;
            padding: 20px;
            border-radius: 50%;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }
          .header-subtitle {
            margin: 10px 0 0;
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
          }
          .alert-banner {
            background: linear-gradient(90deg, rgba(251, 191, 36, 0.2) 0%, rgba(239, 68, 68, 0.2) 100%);
            border-left: 4px solid #fbbf24;
            padding: 20px 30px;
            display: flex;
            align-items: flex-start;
          }
          .alert-icon {
            background: rgba(251, 191, 36, 0.2);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;
            font-size: 24px;
          }
          .alert-text {
            margin: 0;
            color: #fbbf24;
            font-weight: 600;
            font-size: 14px;
            line-height: 1.6;
          }
          .content {
            padding: 30px;
          }
          .section-box {
            background: rgba(56, 189, 248, 0.1);
            border-radius: 12px;
            padding: 25px;
            border: 1px solid rgba(56, 189, 248, 0.3);
            margin-bottom: 20px;
          }
          .section-title {
            margin: 0 0 20px;
            color: #38bdf8;
            font-size: 20px;
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          .info-table {
            width: 100%;
            border-collapse: collapse;
          }
          .info-row {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .info-row td {
            padding: 12px 0;
          }
          .info-label {
            color: #94a3b8;
            font-size: 14px;
            font-weight: 500;
            width: 140px;
          }
          .info-value {
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
          }
          .tech-section {
            background: rgba(168, 85, 247, 0.1);
            border-radius: 12px;
            padding: 25px;
            border: 1px solid rgba(168, 85, 247, 0.3);
            margin-bottom: 20px;
          }
          .tech-title {
            margin: 0 0 20px;
            color: #a855f7;
            font-size: 20px;
            font-weight: 600;
          }
          .badge-yes {
            display: inline-block;
            background: rgba(34, 197, 94, 0.2);
            color: #22c55e;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
          }
          .badge-no {
            display: inline-block;
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
          }
          .actions-box {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
            border-radius: 12px;
            padding: 25px;
            border: 1px solid rgba(34, 197, 94, 0.3);
            margin-bottom: 20px;
          }
          .actions-title {
            margin: 0 0 15px;
            color: #22c55e;
            font-size: 18px;
            font-weight: 600;
          }
          .actions-list {
            margin: 0;
            padding-left: 20px;
            color: #cbd5e1;
            font-size: 14px;
            line-height: 1.8;
          }
          .actions-list li {
            margin-bottom: 10px;
          }
          .actions-list strong {
            color: #ffffff;
          }
          .timestamp-box {
            background: rgba(30, 41, 59, 0.5);
            border-radius: 8px;
            padding: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }
          .timestamp-icon {
            font-size: 20px;
            margin-right: 15px;
          }
          .timestamp-text {
            margin: 0;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.6;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
            color: #ffffff;
            padding: 16px 40px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 10px 30px rgba(56, 189, 248, 0.3);
          }
          .footer {
            background: rgba(15, 23, 42, 0.8);
            padding: 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          .footer-title {
            margin: 0 0 10px;
            color: #ffffff;
            font-size: 18px;
            font-weight: 600;
          }
          .footer-text {
            margin: 0;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.6;
          }
          .footer-link {
            color: #38bdf8;
            text-decoration: none;
          }
          .footer-divider {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          .footer-copyright {
            margin: 0;
            color: #64748b;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0f1c; padding: 40px 20px;">
          <tr>
            <td align="center">
              <div class="container">
                
                <!-- Header -->
                <div class="header">
                  <div class="header-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <h1>⚠️ Proposition Refusée</h1>
                  <p class="header-subtitle">Un prospect a décliné votre offre</p>
                </div>

                <!-- Alert Banner -->
                <div class="alert-banner">
                  <div class="alert-icon">🔔</div>
                  <p class="alert-text">
                    <strong>ACTION REQUISE :</strong> Ce prospect nécessite un suivi immédiat et une relance personnalisée.
                  </p>
                </div>

                <!-- Company Info -->
                <div class="content">
                  <div class="section-box">
                    <h2 class="section-title">🏢 Informations de l'Entreprise</h2>
                    <table class="info-table">
                      <tr class="info-row">
                        <td class="info-label">Nom :</td>
                        <td class="info-value">${company.name}</td>
                      </tr>
                      <tr class="info-row">
                        <td class="info-label">SIRET :</td>
                        <td class="info-value">${company.siret}</td>
                      </tr>
                      <tr class="info-row">
                        <td class="info-label">Activité :</td>
                        <td class="info-value">${company.activityLabel || 'Non spécifié'}</td>
                      </tr>
                      <tr class="info-row">
                        <td class="info-label">Employés :</td>
                        <td class="info-value">${company.employeeCount || 'Non spécifié'}</td>
                      </tr>
                      <tr class="info-row">
                        <td class="info-label">Email Contact :</td>
                        <td>
                          <a href="mailto:${clientEmail}" style="color: #38bdf8; font-size: 14px; font-weight: 600; text-decoration: none;">
                            ${clientEmail}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Technical Profile -->
                  <div class="tech-section">
                    <h2 class="tech-title">🔐 Profil Technique</h2>
                    <table class="info-table">
                      <tr class="info-row">
                        <td class="info-label">Active Directory :</td>
                        <td>
                          <span class="${hasAD === 'Oui' ? 'badge-yes' : 'badge-no'}">
                            ${hasAD}
                          </span>
                        </td>
                      </tr>
                      <tr class="info-row">
                        <td class="info-label">Comptes utilisateurs :</td>
                        <td class="info-value">${userAccounts}</td>
                      </tr>
                      <tr class="info-row">
                        <td class="info-label">Maturité sécurité :</td>
                        <td class="info-value">${securityMaturity}</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Next Steps -->
                  <div class="actions-box">
                    <h2 class="actions-title">✅ Prochaines Actions Recommandées</h2>
                    <ol class="actions-list">
                      <li>
                        <strong>Relance téléphonique</strong> dans les 24-48h pour comprendre les raisons du refus
                      </li>
                      <li>
                        <strong>Analyse des objections</strong> et adaptation de l'offre si nécessaire
                      </li>
                      <li>
                        <strong>Proposition d'audit gratuit</strong> ou de démonstration technique personnalisée
                      </li>
                      <li>
                        <strong>Suivi CRM</strong> et programmation d'une relance à moyen terme (3-6 mois)
                      </li>
                    </ol>
                  </div>

                  <!-- Timestamp -->
                  <div class="timestamp-box">
                    <span class="timestamp-icon">📅</span>
                    <p class="timestamp-text">
                      <strong style="color: #ffffff;">Date et heure du refus :</strong><br>
                      ${dateStr} à ${timeStr}
                    </p>
                  </div>

                  <!-- CTA Button -->
                  <div style="text-align: center;">
                    <a href="mailto:${clientEmail}" class="cta-button">
                      📧 Contacter le Prospect
                    </a>
                  </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                  <p class="footer-title">SecuriTrust</p>
                  <p class="footer-text">
                    Votre partenaire en cybersécurité et conformité<br>
                    <a href="https://securitrust.fr" class="footer-link">www.securitrust.fr</a>
                  </p>
                  <div class="footer-divider">
                    <p class="footer-copyright">
                      © ${new Date().getFullYear()} SecuriTrust - Tous droits réservés
                    </p>
                  </div>
                </div>

              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

      if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is missing; skipping rejection email');
        return NextResponse.json({
          success: false,
          error: 'Service d\'email non configuré'
        }, { status: 500 });
      }

      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Securitrust <onboarding@resend.dev>',
        to: 'jad.joumblat@securitrust.fr',
        subject: `⚠️ Proposition Refusée - ${company.name}`,
        html: emailHtml,
      });

      console.log('📧 Email de refus envoyé à: jad.joumblat@securitrust.fr');
      console.log('🏢 Entreprise:', company.name);
      console.log('📨 Email client:', clientEmail);

      return NextResponse.json({
        success: true,
        message: 'Notification de refus envoyée avec succès'
      });

  } catch (error: any) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de refus:', error);
    return NextResponse.json(
      { error: error.message || 'Échec de l\'envoi de la notification de refus' },
      { status: 500 }
    );
  }
}