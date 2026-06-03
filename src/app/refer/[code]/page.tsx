import {
  DeepLinkLanding,
  deepLinkMetadata,
} from "@/components/deep-link/deep-link-landing";

type RouteProps = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { code } = await params;
  return deepLinkMetadata("refer", `/refer/${code}`);
}

export default async function ReferDeepLinkPage({ params }: RouteProps) {
  const { code } = await params;
  return <DeepLinkLanding type="refer" param={code} />;
}
