"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./icons";

const navItems = [
  { href: "/#experience", label: "Experience" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Connect" },
];

const themeChangeEvent = "site-theme-change";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
  };
}

function getThemeSnapshot() {
  return localStorage.getItem("theme") === "light";
}

function getThemeServerSnapshot() {
  return false;
}

function ThemeButton() {
  const isLight = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getThemeServerSnapshot);

  useEffect(() => {
    document.body.classList.add("ready");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isLight ? "#f7f7f7" : "#171717");
  }, [isLight]);

  const toggleTheme = () => {
    const next = !isLight;
    localStorage.setItem("theme", next ? "light" : "dark");
    window.dispatchEvent(new Event(themeChangeEvent));
    document.documentElement.classList.toggle("light", next);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#f7f7f7" : "#171717");
  };

  return (
    <button
      type="button"
      className="theme-toggle inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm transition-colors"
      aria-label="Toggle theme"
      aria-pressed={isLight}
      onClick={toggleTheme}
    >
      {isLight ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function Navigation({ active }: { active?: "projects" | "blog" }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="mx-auto w-full max-w-2xl px-4 py-6 lg:max-w-[60vw]" aria-label="Main navigation">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-medium tracking-tight text-[#EDEDED] transition-colors hover:text-gray-300"
          aria-label="Home"
        >
          Minaruzzaman Shovon
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                (active === "projects" && item.label === "Projects") ||
                (active === "blog" && item.label === "Blog")
                  ? "page"
                  : undefined
              }
              className={
                (active === "projects" && item.label === "Projects") ||
                (active === "blog" && item.label === "Blog")
                  ? "border-b border-[#444] pb-px text-[#EDEDED]"
                  : "text-[#888] transition-colors hover:text-[#EDEDED]"
              }
            >
              {item.label}
            </Link>
          ))}
          <ThemeButton />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeButton />
          <button
            type="button"
            className="theme-toggle inline-flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className="block h-0.5 w-5 bg-current transition-all duration-300"
              style={{ transform: open ? "translateY(8px) rotate(45deg)" : undefined }}
            />
            <span
              className="block h-0.5 w-5 bg-current transition-all duration-300"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-0.5 w-5 bg-current transition-all duration-300"
              style={{ transform: open ? "translateY(-8px) rotate(-45deg)" : undefined }}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="overflow-hidden transition-all duration-300 ease-in-out md:hidden"
        style={{ maxHeight: open ? 220 : 0, opacity: open ? 1 : 0 }}
      >
        <div className="mt-4 flex flex-col gap-4 border-t border-[#2a2a2a] pt-5 pb-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                (active === "projects" && item.label === "Projects") ||
                (active === "blog" && item.label === "Blog")
                  ? "text-[#EDEDED]"
                  : "text-[#888] transition-colors hover:text-[#EDEDED]"
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function Footer({ backHome = false }: { backHome?: boolean }) {
  return (
    <footer className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between px-4 pb-10 text-sm text-[#555] sm:flex-row lg:max-w-[60vw]">
      <span>&copy; 2026 Minaruzzaman Shovon</span>
      {backHome ? (
        <Link href="/" className="back-link">
          &larr; Home
        </Link>
      ) : null}
    </footer>
  );
}
