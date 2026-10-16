"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Clean Data Structure for Founder Section (with graphic image path)
const founderData = {
  badge: "Founder",
  titleLine1: "The strategist bhind",
  titleLine2: "our Service",
  founder: {
    name: "Nischal Barailey",
    role: "Founder & Proprietor - Nivani Venctures",
    image: "/landing-src/a79681d6-34c7-4f84-92c5-176e4df93552.jpg",
    alt: "Nischal Barailey - Founder & Proprietor",
    bio: "Nivani Venctures was created with a vision to connect nature, creativity, sustainability, and modern innovation. Our goal is to create meaningful products and services while building a responsible and future-focused brand.",
  },
  graphicsImage: "/landing-src/67062429880.png", // Replace with your actual graphic image path
  graphicsAlt: "Sustainable Innovation Graphic",
};

export default function Founder() {
  const sectionRef = useRef(null);

  // GSAP entrance animation on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 px-4 md:px-12 bg-white text-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block bg-black text-white px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            {founderData.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-xl">
            {founderData.titleLine1} <br />
            {founderData.titleLine2}
          </h2>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Founder Image Card */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[500px] h-[540px] rounded-[36px] overflow-hidden shadow-xl bg-neutral-100 border border-neutral-200"
            >
              <Image
                src={founderData.founder.image}
                alt={founderData.founder.alt}
                fill
                className="object-cover object-top"
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Bio & Image Graphic Asset */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-8">
            
            {/* Bio Details */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                <span className="playwrite-text text-neutral-900 font-normal">
                  {founderData.founder.name}
                </span>
              </h3>
              <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-6">
                {founderData.founder.role}
              </p>
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-light">
                {founderData.founder.bio}
              </p>
            </div>

            {/* Graphic Illustration Asset Container */}
            <div className="relative w-full w-full h-[320px] rounded-[28px] overflow-hidden ">
              <Image
                src={founderData.graphicsImage}
                alt={founderData.graphicsAlt}
                fill
                className="object-cover"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}