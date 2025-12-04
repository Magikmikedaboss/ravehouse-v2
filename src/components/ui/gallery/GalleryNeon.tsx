"use client";

import Image from "next/image";
import { useState } from "react";

const items = [
  {
    id: 1,
    title: "Warehouse Eclipse — Techno Night",
    tag: "Warehouse",
    src: "/images/gallery/wh1.jpg",
  },
  {
    id: 2,
    title: "Neon Alley — Bass Riot",
    tag: "Bass",
    src: "/images/gallery/bass1.jpg",
  },
  {
    id: 3,
    title: "Skyline Strip — Rooftop Session",
    tag: "Rooftop",
    src: "/images/gallery/roof1.jpg",
  },
  {
    id: 4,
    title: "Basement 305 — Communion",
    tag: "Afterhours",
    src: "/images/gallery/after1.jpg",
  },
];

const tags = ["All", "Warehouse", "Bass", "Rooftop", "Afterhours"];

export default function GalleryNeon() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? items : items.filter((i) => i.tag === active);

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-white drop-shadow-lg">
          Ravehouse Entertainment Gallery
        </h1>
        <p className="mt-2 text-neutral-300">
          Moments from the underground — warehouses, rooftops, afterhours.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-4 py-1.5 text-sm rounded-full transition-all backdrop-blur-md border
              ${
                active === tag
                  ? "bg-pink-600/40 border-pink-500 text-white shadow-[0_0_20px_rgba(255,20,100,0.6)]"
                  : "bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10"
              }
            `}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Masonry-style grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="mb-6 break-inside-avoid group cursor-pointer transition-all"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-md
                bg-[#1A0B0B]/60 border border-white/5
                group-hover:shadow-[0_0_30px_rgba(255,0,80,0.5)]
                group-hover:-translate-y-1 transition-all duration-300"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={900}
                height={600}
                className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-lg font-semibold drop-shadow-lg">
                  {item.title}
                </h3>
                <span className="text-pink-400 text-sm">{item.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
