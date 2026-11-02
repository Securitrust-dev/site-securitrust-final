// LP Google Ads du RSSI externalisé (noindex) — voir layout.tsx.
import { RssiLanding } from '@/components/rssi/RssiLanding';
import { casRssi } from '@/content/cas-clients-rssi';

export default function LpRssiPage() {
  return <RssiLanding variant="ads" cas={casRssi()} />;
}
