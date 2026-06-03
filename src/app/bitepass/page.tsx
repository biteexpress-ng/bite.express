import {
  DeepLinkLanding,
  deepLinkMetadata,
} from "@/components/deep-link/deep-link-landing";

export function generateMetadata() {
  return deepLinkMetadata("bitepass", "/bitepass");
}

export default function BitePassDeepLinkPage() {
  return <DeepLinkLanding type="bitepass" />;
}
