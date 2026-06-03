import {
  DeepLinkLanding,
  deepLinkMetadata,
} from "@/components/deep-link/deep-link-landing";

type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { id } = await params;
  return deepLinkMetadata("store", `/store/${id}`);
}

export default async function StoreDeepLinkPage({ params }: RouteProps) {
  const { id } = await params;
  return <DeepLinkLanding type="store" param={id} />;
}
