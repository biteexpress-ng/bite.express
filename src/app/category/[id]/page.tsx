import {
  DeepLinkLanding,
  deepLinkMetadata,
} from "@/components/deep-link/deep-link-landing";

type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps) {
  const { id } = await params;
  return deepLinkMetadata("category", `/category/${id}`);
}

export default async function CategoryDeepLinkPage({ params }: RouteProps) {
  const { id } = await params;
  return <DeepLinkLanding type="category" param={id} />;
}
