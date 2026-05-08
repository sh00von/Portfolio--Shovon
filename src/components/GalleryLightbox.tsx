"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CloseIcon } from "./icons";

export function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="block w-full text-left"
        onClick={() => setOpen(true)}
        aria-label={`Open ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={700}
          className="h-auto w-full transform object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
          sizes="(max-width: 640px) 50vw, 224px"
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 opacity-100 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-[#EDEDED] transition-colors hover:text-[#a1a1a1]"
            aria-label="Close lightbox"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
          <Image
            src={src}
            alt={alt}
            width={1400}
            height={1000}
            className="max-h-[95vh] max-w-[95vw] scale-100 rounded-md object-contain shadow-2xl transition-transform duration-300"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
