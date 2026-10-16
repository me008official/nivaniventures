"default client";
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Clean Data Structure for Contact Banner
const contactData = {
  titlePart1: "Get in",
  titleHighlight: "Touch",
  titlePart2: "with",
  companyName: "Nivani",
  companyNamea: " Ventures",
  backgroundImage: "/landing-src/inggrid-koe-kbKEuU-YEIw-unsplash.jpg", // Replace with your misty mountain background image asset
  placeholderText: "Enter Email",
  buttonText: "Submit",
};

export default function ContactBanner() {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
      },
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-16 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Banner Container with Rounded Corners & Background Image */}
        <div className="relative w-full h-[400px] md:h-[450px] rounded-[48px] overflow-hidden shadow-xl flex flex-col items-center justify-center p-6 text-center">
          {/* Background Image with Dark/Misty Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={contactData.backgroundImage}
              alt="Misty Mountain Background"
              fill
              className="object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 backdrop-brightness-90"></div> */}
          </div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-2xl flex flex-col items-center gap-6 w-full">
            {/* Header Titles */}
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
                {contactData.titlePart1}{" "}
                <span className="playwrite-text font-normal text-[#557A54]">
                  {contactData.titleHighlight}
                </span>{" "}
                {contactData.titlePart2}
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md flex gap-2">
                <p className= "bricolage-text">{contactData.companyName} </p> <p>            {contactData.companyNamea}</p>
              </h3>
            </div>

            {/* Form Input & Button Bar */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-inner"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={contactData.placeholderText}
                required
                className="w-full sm:flex-1 py-3 px-6 rounded-full bg-black/30 text-white placeholder-neutral-300 text-sm focus:outline-none border border-transparent focus:border-white/40 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full sm:w-auto py-3 px-8 rounded-full bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 transition-colors cursor-pointer shadow-md"
              >
                {submitted ? "Success! ✓" : contactData.buttonText}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
