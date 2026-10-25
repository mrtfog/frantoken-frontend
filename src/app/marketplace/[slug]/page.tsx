import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/features/marketplace/components/ProjectDetail";
import { demoProjects } from "@/features/marketplace/constants/marketplace.constants";

export function generateStaticParams() {
  return demoProjects.map((project) => ({ slug: project.id }));
}

type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = demoProjects.find((item) => item.id === slug);
  return {
    title: project
      ? `${project.name} · Ficha demo | FranToken`
      : "Ficha no encontrada | FranToken",
    description:
      "Ficha ilustrativa de franquicia. Sin oferta activa, vínculo comercial ni rentabilidad verificada.",
    robots: { index: false, follow: false },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = demoProjects.find((item) => item.id === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
