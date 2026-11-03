import type { Metadata } from "next";
import { FranchiseDirectoryContainer } from "@/features/franchises/components/FranchiseDirectory.container";
export const metadata: Metadata = {
  title: "Mis franquicias | FranToken",
  robots: { index: false, follow: false },
};
export default function FranchisesPage() {
  return <FranchiseDirectoryContainer />;
}
