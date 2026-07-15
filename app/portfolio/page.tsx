import { getPublicProjects } from "@/app/actions/public";
import { PortfolioClient } from "@/components/portfolio-client";

// export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function Portfolio() {
  const projects = await getPublicProjects();
  return <PortfolioClient projects={projects as any} />;
}
