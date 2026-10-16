"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Clean Data Structure for Testimonials
const testimonialsData = {
  column1: [
    {
      type: "review",
      name: "Neyotech Sento",
      role: "Himalyan Tourist",
      avatar: "/landing-src/hemp.avif",
      quote:
        "An amazing first tour experience with Nivini Tour Service! Low cost, great service, and wonderful staff behavior. Highly recommend them to anyone planning their first trip.",
      bgColor: "bg-[#557A54]",
    },
    {
      type: "video",
      videoThumb: "/landing-src/hemp.avif",
      caption:
        "Hey i order Hemp Shirt on Nivini Ventures and i am happy to order the clothes",
      buttonText: "Watch",
    },
  ],
  column2: [
    {
      type: "video",
      videoThumb: "/landing-src/hemp.avif",
      altText: "Featured Founder",
      caption:
        "Hey i order Hemp Shirt on Nivini Ventures and i am happy to order the clothes",
      buttonText: "Watch",
    },
    {
      type: "review",
      name: "Neyotech Sento",
      role: "Himalyan Tourist",
      avatar: "/hemp.avif",
      quote:
        "An amazing first tour experience with Nivini Tour Service! Low cost, great service, and wonderful staff behavior. Highly recommend them to anyone planning their first trip.",
      bgColor: "bg-[#557A54]",
    },
  ],
  column3: [
    {
      type: "review",
      name: "Neyotech Sento",
      role: "Himalyan Tourist",
      avatar: "/landing-src/hemp.avif",
      quote:
        "An amazing first tour experience with Nivini Tour Service! Low cost, great service, and wonderful staff behavior. Highly recommend them to anyone planning their first trip.",
      bgColor: "bg-[#557A54]",
    },
    {
      type: "video",
      videoThumb: "/landing-src/hemp.avif",
      caption:
        "Hey i order Bamboo Mouth Cleaner on Nivini Ventures and i am happy to order the Item",
      buttonText: "Watch",
    },
  ],
};

export default function Testimonials() {
  const sectionRef = useRef(null);

  // GSAP entrance animation on scroll
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
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  // Helper renderer to map card types dynamically
  const renderCard = (item, index) => {
    if (item.type === "review") {
      return (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className={`${item.bgColor} text-white p-8 rounded-[36px] shadow-lg flex flex-col justify-between`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/30">
              <Image
                src={item.avatar}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-base">{item.name}</h4>
              <p className="text-xs text-emerald-100/80">{item.role}</p>
            </div>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-emerald-50 font-light playwrite-text">
            &ldquo;{item.quote}&rdquo;
          </p>
        </motion.div>
      );
    }

    if (item.type === "video") {
      return (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className=" p-6 rounded-[36px] flex flex-col gap-4"
        >
          <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden shadow-inner bg-neutral-200 group">
            <Image
              src={item.videoThumb}
              alt="Video Review Thumbnail"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform cursor-pointer">
                ▶
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs md:text-sm playwrite-text text-neutral-800 leading-snug">
              {item.caption}
            </p>
            <button className=" flex items-center gap-1.5 bg-[#4B6B48] text-white py-2 px-4 rounded-full text-xs font-semibold shadow hover:bg-[#3d573a] transition-colors cursor-pointer shrink-0">
              <span>▶</span> {item.buttonText}
            </button>
          </div>
        </motion.div>
      );
    }

    if (item.type === "image") {
      return (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-[420px] rounded-[36px] overflow-hidden shadow-xl bg-amber-100"
        >
          <Image
            src={item.imageSrc}
            alt={item.altText}
            fill
            className="object-cover"
          />
        </motion.div>
      );
    }

    return null;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-4 md:px-12 bg-white text-neutral-900"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Meet The{" "}
            <span className="playwrite-text text-neutral-900 font-normal">
              People
            </span>{" "}
            Bringing <br />
            Experiences To Life
          </h2>
        </div>

        {/* Asymmetric 3-Column Layout Driven By Data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start w-full">
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            {testimonialsData.column1.map((item, idx) => renderCard(item, idx))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
            {testimonialsData.column2.map((item, idx) => renderCard(item, idx))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8">
            {testimonialsData.column3.map((item, idx) => renderCard(item, idx))}
          </div>
        </div>
      </div>
    </section>
  );
}
