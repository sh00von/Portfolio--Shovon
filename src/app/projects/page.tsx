import type { Metadata } from "next";
import { Footer, Navigation } from "@/components/SiteChrome";
import { ProjectsClient } from "@/components/ProjectsClient";
import { resolveFromVariant, resolveHomePath } from "@/lib/homeVariants";

export const metadata: Metadata = {
  title: "Projects & Portfolio",
  description:
    "Explore a curated list of engineering, GIS, and software development projects by Minaruzzaman Shovon. Featuring AuthryAI deepfake detection and structural tools.",
  keywords: [
    "Minaruzzaman Shovon",
    "Portfolio",
    "Software Engineer",
    "Engineering Projects",
    "GIS",
    "Hydrology",
    "Full-stack Developer",
    "AuthryAI",
    "Deepfake Detection",
    "CUET",
  ],
  alternates: {
    canonical: "https://shovon.bd/projects",
  },
  openGraph: {
    url: "https://shovon.bd/projects",
    title: "Projects & Portfolio | Minaruzzaman Shovon",
    description:
      "A showcase of AI, GIS, and full-stack engineering applications built by Minaruzzaman Shovon.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Projects & Portfolio | Minaruzzaman Shovon",
    description:
      "A showcase of AI, GIS, and full-stack engineering applications built by Minaruzzaman Shovon.",
    images: ["/og.png"],
  },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const homePath = resolveHomePath(from);
  const fromVariant = resolveFromVariant(homePath);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation active="projects" homePath={homePath} fromVariant={fromVariant} />
      <main id="main-content" className="mx-auto w-full max-w-2xl flex-grow px-4 pb-24 lg:max-w-[60vw]">
        <h1 className="sr-only">Project Portfolio of Minaruzzaman Shovon</h1>
        <ProjectsClient />
      </main>
      <Footer backHome homePath={homePath} />
    </div>
  );
}
