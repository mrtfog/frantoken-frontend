import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/features/marketplace/components/ProjectDetail";
import { getProject } from "@/features/marketplace/services/getProjects.service";

export const dynamic = "force-dynamic";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
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
  const project = await getProject(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
