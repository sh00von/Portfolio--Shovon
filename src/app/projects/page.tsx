import type { Metadata } from "next";
import { Footer, Navigation } from "@/components/SiteChrome";
import { PageAnimations } from "@/components/PageAnimations";
import { ProjectsClient } from "@/components/ProjectsClient";

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

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageAnimations projects />
      <Navigation active="projects" />
      <main className="mx-auto w-full max-w-2xl flex-grow px-4 pb-24">
        <h1 className="sr-only">Project Portfolio of Minaruzzaman Shovon</h1>
        <ProjectsClient />
      </main>
      <Footer backHome />
    </div>
  );
}
