"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_VENTURES = [
  {
    id: 1,
    label: "Eco Tourism",
    title: "Eco Tourism",
    description:
      "That Nivini is deeply rooted in its local Himalayan ecosystem, promoting mindful travel rather than mass tourism.",
    bgImage: "/landing-src/pexels-basnetsurendra7-10753291.jpg",
    cards: [
      {
        id: 1,
        src: "/landing-src/pexels-aj-negi0004-20052370.jpg",
        alt: "Himalayan Trekking",
      },
      {
        id: 2,
        src: "/landing-src/pexels-anuj-yadav-34803963-8735480.jpg",
        alt: "Nature Photography",
      },
      {
        id: 3,
        src: "/landing-src/pexels-yogendras31-31947312.jpg",
        alt: "Sustainable Transport",
      },
    ],
  },
  {
    id: 2,
    label: "Drone & Visual Media",
    title: "Drone & Visual Media",
    description:
      "Capturing breathtaking aerial perspectives and cinematic visual stories directly from high-altitude terrains.",
    bgImage: "/landing-src/nivini-mountain-bg.jpg",
    cards: [
      {
        id: 1,
        src: "/landing-src/pexels-aj-negi0004-20052370.jpg",
        alt: "Aerial Shot 1",
      },
      {
        id: 2,
        src: "/landing-src/pexels-anuj-yadav-34803963-8735480.jpg",
        alt: "Cinematic Reel",
      },
      {
        id: 3,
        src: "/landing-src/pexels-yogendras31-31947312.jpg",
        alt: "Equipment Setup",
      },
    ],
  },
  {
    id: 3,
    label: "Digital Marketing",
    title: "Digital Marketing",
    description:
      "Scaling eco-friendly brands through data-driven campaigns, organic growth strategies, and high-converting funnels.",
    bgImage: "/landing-src/nivini-mountain-bg.jpg",
    cards: [
      { id: 1, src: "/landing-src/hemp.avif", alt: "Strategy Meeting" },
      { id: 2, src: "/landing-src/hemp.avif", alt: "Analytics Dashboard" },
      { id: 3, src: "/landing-src/hemp.avif", alt: "Brand Growth" },
    ],
  },
  {
    id: 4,
    label: "Podcast & Media",
    title: "Podcast & Media",
    description:
      "Amplifying voices of sustainability, mountain communities, and conscious founders through engaging audio series.",
    bgImage: "/landing-src/nivini-mountain-bg.jpg",
    cards: [
      { id: 1, src: "/landing-src/hemp.avif", alt: "Studio Recording" },
      { id: 2, src: "/landing-src/hemp.avif", alt: "Live Interview" },
      { id: 3, src: "/landing-src/hemp.avif", alt: "Audio Editing" },
    ],
  },
  {
    id: 5,
    label: "Solar Solutions",
    title: "Solar Solutions",
    description:
      "Empowering remote regions with clean, renewable solar energy systems designed for rugged environmental conditions.",
    bgImage: "/landing-src/nivini-mountain-bg.jpg",
    cards: [
      { id: 1, src: "/landing-src/hemp.avif", alt: "Panel Installation" },
      { id: 2, src: "/landing-src/hemp.avif", alt: "Solar Array" },
      { id: 3, src: "/landing-src/hemp.avif", alt: "Green Energy Output" },
    ],
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState(1);
  const sectionRef = useRef(null);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["services"],
  //   queryFn: async () => {
  //     const res = await axios.get("/api/v1/admin/website/services");
  //     return res.data?.data ?? DEFAULT_VENTURES;
  //   },
  // });
  const data = []

  const ventures = Array.isArray(data) && data.length > 0 ? data : DEFAULT_VENTURES;
  const activeVenture = ventures.find((v) => v.id === activeId) ?? ventures[0] ?? DEFAULT_VENTURES[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  // if (isLoading) {
  //   return null;
  // }

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-4 md:px-8 bg-white text-neutral-900"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center max-w-2xl mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Our <span className="playwrite-text text-emerald-700">Ventures</span> & Services
          </h2>
          <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
            Selling hemp t-shirts and drone photography on the same site can
            look disjointed if poorly designed.
          </p>
        </div>

        <div className="sticky top-17 z-30 flex flex-wrap justify-center gap-2 md:gap-3 mb-12 py-4 bg-white w-full">
          {ventures.map((venture) => (
            <button
              key={venture.id}
              onClick={() => setActiveId(venture.id)}
              className={`py-2.5 px-6 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border ${
                activeId === venture.id
                  ? "bg-black text-white border-black scale-105"
                  : "bg-white text-neutral-800 border-neutral-200 hover:border-black"
              }`}
            >
              {venture.label}
            </button>
          ))}
        </div>

        <div className="relative w-full rounded-[40px] md:rounded-[50px] overflow-hidden min-h-[550px] md:min-h-[600px] flex flex-col justify-between p-6 sm:p-10 md:p-16">
          <div className="absolute inset-0 -z-10">
            <Image
              src={activeVenture.bgImage}
              alt={activeVenture.title}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center text-center text-white mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenture.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col items-center max-w-2xl"
              >
                <h3 className="playwrite-text text-3xl sm:text-4xl md:text-5xl font-normal mb-4 tracking-wide">
                  {activeVenture.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-neutral-200 mb-8 leading-relaxed">
                  {activeVenture.description}
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button className="bg-black text-white border border-black py-3 px-8 rounded-full font-medium text-sm hover:bg-neutral-800 transition-colors cursor-pointer shadow-lg">
                    Book Now
                  </button>
                  <button className="bg-transparent text-white border border-white py-3 px-8 rounded-full font-medium text-sm hover:bg-white/10 transition-colors cursor-pointer">
                    Explore More
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="z-10 max-w-[1200px] absolute w-full grid grid-cols-1 sm:grid-cols-3 gap-16 md:16 lg:gap-[140px] mt-16 hidden md:grid bottom-1">
          <AnimatePresence mode="wait">
            {activeVenture.cards.map((card, idx) => (
              <motion.div
                key={`${activeVenture.id}-${card.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                  ease: "easeInOut",
                }}
                className="relative h-[220px] sm:h-[250px] md:h-[280px] lg:h-[320px] lg:w-[300px] rounded-[40px] overflow-hidden shadow-xl border border-white/20 bg-white/10 backdrop-blur-md"
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs md:text-sm font-semibold tracking-wide">
                    {card.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
