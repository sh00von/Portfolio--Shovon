"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { filters, Project, ProjectCategory, projects } from "@/data/projects";
import { ArrowUpRightIcon, CloseIcon } from "./icons";

export function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");
  const [preview, setPreview] = useState<{ src: string; left: number; top: number } | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) =>
      project.categories.some((category) => category === (activeFilter as ProjectCategory)),
    );
  }, [activeFilter]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const rows = gsap.utils.toArray<HTMLElement>(".project-row");
    rows.forEach((row, i) => {
      gsap.from(row, {
        scrollTrigger: { trigger: row, start: "top 92%" },
        x: -12,
        opacity: 0,
        duration: 0.55,
        delay: i < 3 ? i * 0.05 : 0,
        ease: "power2.out",
      });
    });
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [activeFilter]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setPreview((current) => {
        if (!current) return current;
        let left = event.clientX + 32;
        let top = event.clientY - 80;
        if (left + 250 > window.innerWidth) left = event.clientX - 260;
        if (top < 10) top = 10;
        if (top + 180 > window.innerHeight) top = window.innerHeight - 185;
        return { ...current, left, top };
      });
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const openProject = (project: Project) => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
      return;
    }
    if (project.image) setLightbox(project.image);
  };

  return (
    <>
      <div className="filter-pills" id="filter-pills">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`pill ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === "all" ? "All" : filter}
          </button>
        ))}
      </div>

      <div>
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            className="project-row"
            tabIndex={0}
            role="link"
            aria-label={`View Project: ${project.title} (${project.categories.join(", ")})`}
            onClick={() => openProject(project)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openProject(project);
              }
            }}
            onMouseEnter={() =>
              project.image ? setPreview({ src: project.image, left: 0, top: 0 }) : undefined
            }
            onMouseLeave={() => setPreview(null)}
          >
            <span className="project-num" aria-hidden="true">
              {project.num}
            </span>
            <div>
              <h2 className="project-title">{project.title}</h2>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ArrowUpRightIcon />
          </article>
        ))}
      </div>

      <div
        className={`project-preview ${preview ? "active" : ""}`}
        style={{ left: preview?.left ?? 0, top: preview?.top ?? 0 }}
      >
        {preview ? (
          <Image src={preview.src} alt="Project preview" width={480} height={300} />
        ) : null}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]/[0.92] opacity-100 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 border-0 bg-transparent text-[#EDEDED] transition-colors hover:text-[#a1a1a1]"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <CloseIcon />
          </button>
          <Image
            src={lightbox}
            alt="Project screenshot"
            width={1400}
            height={1000}
            className="max-h-[90vh] max-w-[92vw] scale-100 rounded-lg object-contain shadow-2xl transition-transform duration-300"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
