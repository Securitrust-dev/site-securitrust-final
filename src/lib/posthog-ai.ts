import Anthropic from '@anthropic-ai/sdk';
import { Anthropic as PostHogAnthropic } from '@posthog/ai/anthropic';
import { randomUUID } from 'crypto';
import { PostHog } from 'posthog-node';

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const aiSessionId = randomUUID();

const posthog = posthogKey && posthogHost
  ? new PostHog(posthogKey, {
      host: posthogHost,
      privacyMode: false,
      flushAt: 1,
      flushInterval: 0,
      requestTimeout: 2000,
      fetchRetryCount: 0,
    })
  : undefined;

if (!posthog && process.env.NODE_ENV !== 'production') {
  const missingVariable = posthogKey ? 'NEXT_PUBLIC_POSTHOG_HOST' : 'NEXT_PUBLIC_POSTHOG_KEY';
  console.warn(`${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`);
}

export function createAnthropicClient(apiKey: string) {
  if (!posthog) return new Anthropic({ apiKey, baseURL: 'https://api.anthropic.com' });

  return new PostHogAnthropic({
    apiKey,
    baseURL: 'https://api.anthropic.com',
    posthog,
  });
}

export function aiObservabilityOptions() {
  if (!posthog) return {};

  return {
    posthogTraceId: randomUUID(),
    posthogProperties: { $ai_session_id: aiSessionId },
  };
}

export async function flushAiObservability() {
  await posthog?.flush().catch(() => {});
}
