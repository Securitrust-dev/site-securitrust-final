// /rssi-externalise — page de référence « RSSI externalisé » (indexée).
// Le contenu et le formulaire vivent dans <RssiLanding>, partagé avec la LP Google Ads
// /lp/rssi-externalise. Le guide pilier (sections longues + FAQ et son FAQPage) est
// inséré avant l'appel à l'action final.
import { RssiLanding } from '@/components/rssi/RssiLanding';
import { PillarGuide } from '@/components/PillarGuide';
import { casRssi } from '@/content/cas-clients-rssi';

export default function RssiExternalisePage() {
  return (
    <RssiLanding variant="seo" cas={casRssi()}>
      <PillarGuide slug="rssi-externalise" />
    </RssiLanding>
  );
}
