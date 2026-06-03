import {
  DeepLinkLanding,
  deepLinkMetadata,
} from "@/components/deep-link/deep-link-landing";

type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { id } = await params;
  return deepLinkMetadata("product", `/product/${id}`);
}

export default async function ProductDeepLinkPage({ params }: RouteProps) {
  const { id } = await params;
  return <DeepLinkLanding type="product" param={id} />;
}
