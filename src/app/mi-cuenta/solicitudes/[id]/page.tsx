import type { Metadata } from "next";
import { ApplicationDetailContainer } from "@/features/franchises/components/ApplicationDetail.container";
export const metadata: Metadata = {
  title: "Detalle de solicitud | FranToken",
  robots: { index: false, follow: false },
};
export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ApplicationDetailContainer id={id} />;
}
