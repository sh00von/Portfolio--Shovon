"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PageAnimations({ projects = false }: { projects?: boolean }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add("ready");

    gsap.from("nav a", {
      y: -20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2,
    });

    if (projects) {
      gsap.from("#filter-pills .pill", {
        y: 10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.2,
      });
      return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }

    const heroTimeline = gsap.timeline({ delay: 0.5 });
    heroTimeline
      .from("#main-content > section:first-of-type h1", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        "#main-content > section:first-of-type p",
        {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
      )
      .from(
        "#main-content > section:first-of-type div a",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8",
      );

    gsap.utils.toArray<HTMLElement>("section[id]").forEach((section) => {
      gsap.from(section.children, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    });

    gsap.utils.toArray<HTMLElement>("#gallery .break-inside-avoid").forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out",
      });
    });

    gsap.utils.toArray<HTMLElement>("#experience .group").forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%" },
        x: -20,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out",
      });
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [projects]);

  return null;
}
