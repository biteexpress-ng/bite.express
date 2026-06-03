import {
  DeepLinkLanding,
  deepLinkMetadata,
} from "@/components/deep-link/deep-link-landing";

type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { id } = await params;
  return deepLinkMetadata("order", `/order/${id}`);
}

export default async function OrderDeepLinkPage({ params }: RouteProps) {
  const { id } = await params;
  return <DeepLinkLanding type="order" param={id} />;
}
