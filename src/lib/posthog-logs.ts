// Logs serveur envoyés à PostHog (OpenTelemetry, côté Node uniquement).
// Inactif sans NEXT_PUBLIC_POSTHOG_KEY. Aucune donnée personnelle dans les attributs.
import { SeverityNumber } from '@opentelemetry/api-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchLogRecordProcessor, LoggerProvider } from '@opentelemetry/sdk-logs';

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';
const posthogLogsConfigured = Boolean(posthogKey && posthogHost);

if (!posthogLogsConfigured && process.env.NODE_ENV !== 'production') {
  const missingVariable = posthogKey ? 'NEXT_PUBLIC_POSTHOG_HOST' : 'NEXT_PUBLIC_POSTHOG_KEY';
  console.warn(`${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`);
}

export const posthogLogsProvider = posthogLogsConfigured
  ? new LoggerProvider({
      resource: resourceFromAttributes({ 'service.name': 'securitrust-nextjs' }),
      processors: [
        new BatchLogRecordProcessor({
          exporter: new OTLPLogExporter({
            url: `${posthogHost}/i/v1/logs`,
            timeoutMillis: 2000,
            headers: {
              Authorization: `Bearer ${posthogKey}`,
              'Content-Type': 'application/json',
            },
          }),
        }),
      ],
    })
  : undefined;

export const posthogLogsLogger = posthogLogsProvider?.getLogger('securitrust-posthog-logs');
export { SeverityNumber };

