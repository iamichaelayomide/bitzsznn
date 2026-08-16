"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useState } from "react";

type Photo = {
  name: string;
  role: string;
  image: string;
  caption: string;
};

export function GalleryFeed({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-1.5 md:grid-cols-3 md:gap-2">
        {photos.map((photo, index) => (
          <button
            className="group relative aspect-square overflow-hidden bg-[#071007] text-left"
            key={`${photo.name}-${index}`}
            onClick={() => setActive(photo)}
            type="button"
          >
            <Image
              alt={photo.caption}
              className="object-contain transition duration-500 group-hover:scale-[1.05]"
              fill
              sizes="(min-width: 768px) 31vw, 48vw"
              src={photo.image}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,8,0),rgba(8,11,8,0.68))] opacity-0 transition group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-3 text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm font-semibold">{photo.name}</p>
              <p className="mt-1 text-xs text-white/78">{photo.role}</p>
            </div>
            <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/88 text-[#082005] opacity-0 transition group-hover:opacity-100">
              <Maximize2 className="size-4" strokeWidth={1.8} />
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/86 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <button
            aria-label="Close photo"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-[#082005]"
            onClick={() => setActive(null)}
            type="button"
          >
            <X className="size-5" strokeWidth={1.8} />
          </button>
          <div className="w-full max-w-5xl">
            <div className="relative mx-auto aspect-[4/5] max-h-[78vh] overflow-hidden rounded-[20px] bg-[#111] md:aspect-[16/10]">
              <Image alt={active.caption} className="object-contain" fill sizes="90vw" src={active.image} />
            </div>
            <div className="mx-auto mt-4 max-w-3xl text-center text-white">
              <p className="text-lg font-semibold">{active.name}</p>
              <p className="mt-1 text-sm text-white/72">{active.role}</p>
              <p className="mt-2 text-sm text-white/82">{active.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
