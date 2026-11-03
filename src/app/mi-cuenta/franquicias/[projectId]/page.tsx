import type { Metadata } from "next";
import { FranchiseManagementContainer } from "@/features/franchises/components/FranchiseManagement.container";
export const metadata: Metadata = {
  title: "Gestión de franquicia | FranToken",
  robots: { index: false, follow: false },
};
export default async function FranchisePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <FranchiseManagementContainer id={projectId} />;
}
