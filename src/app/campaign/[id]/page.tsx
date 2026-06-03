import {
  DeepLinkLanding,
  deepLinkMetadata,
} from "@/components/deep-link/deep-link-landing";

type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { id } = await params;
  return deepLinkMetadata("campaign", `/campaign/${id}`);
}

export default async function CampaignDeepLinkPage({ params }: RouteProps) {
  const { id } = await params;
  return <DeepLinkLanding type="campaign" param={id} />;
}
