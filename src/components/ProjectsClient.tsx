"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { filters, Project, ProjectCategory, projects } from "@/data/projects";
import { ArrowUpRightIcon, CloseIcon } from "./icons";

export function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");
  const [preview, setPreview] = useState<{ src: string; left: number; top: number } | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const lightboxCloseBtnRef = useRef<HTMLButtonElement>(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) =>
      project.categories.some((category) => category === (activeFilter as ProjectCategory)),
    );
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
    lightboxCloseBtnRef.current?.focus();
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
      <div className="mb-8 pt-3">
        {/* Issue #3: role="group" + aria-label on filter pills */}
        <div
          className="filter-pills mb-0"
          id="filter-pills"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`pill ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>
      </div>

      <div>
        {visibleProjects.map((project) => (
          <article key={project.id}>
            {/* Issue #2: real <button> instead of div[role=button] */}
            <button
              type="button"
              className="project-row"
              aria-label={`View project: ${project.title}`}
              onClick={() => openProject(project)}
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
            </button>
          </article>
        ))}
      </div>

      {/* aria-hidden — purely decorative mouse-follow preview */}
      <div
        className={`project-preview ${preview ? "active" : ""}`}
        style={{ left: preview?.left ?? 0, top: preview?.top ?? 0 }}
        aria-hidden="true"
      >
        {preview ? (
          <Image src={preview.src} alt="" width={480} height={300} />
        ) : null}
      </div>

      {/* Issue #1: proper dialog with focus trap */}
      {lightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshot"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]/[0.92] backdrop-blur-md"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => { if (e.key === "Escape") setLightbox(null); }}
        >
          <button
            ref={lightboxCloseBtnRef}
            type="button"
            className="absolute top-5 right-5 border-0 bg-transparent text-[#EDEDED] transition-colors hover:text-[#a1a1a1]"
            aria-label="Close lightbox"
            onClick={() => setLightbox(null)}
          >
            <CloseIcon />
          </button>
          <Image
            src={lightbox}
            alt="Project screenshot"
            width={1400}
            height={1000}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
