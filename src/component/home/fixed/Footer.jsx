"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaYoutube, FaFacebookF, FaTwitter } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// Clean Data Structure for Footer Content
const footerData = {
  newsletter: {
    title: "If you want dont miss the new product lunched",
    placeholder: "Enter Email",
    buttonText: "Submit",
  },
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Home", href: "/" },
        { label: "Product", href: "/product" },
        { label: "Services", href: "/services" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Digital marketing", href: "/services/digital-marketing" },
        { label: "Eco Tourism", href: "/services/eco-tourism" },
        { label: "Drone & Visual Media", href: "/services/drone-visual-media" },
        { label: "Podcast & Media", href: "/services/podcast-media" },
        { label: "Solar Solutions", href: "/services/solar-solutions" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  socials: [
    { icon: <FaInstagram size={16} />, href: "https://instagram.com" },
    { icon: <FaYoutube size={16} />, href: "https://youtube.com" },
    { icon: <FaFacebookF size={16} />, href: "https://facebook.com" },
    { icon: <FaTwitter size={16} />, href: "https://twitter.com" },
  ],
  brandName: "Nivani Ventures",
  copyright: "© All right reserved Nivani Venctures",
};

export default function Footer() {
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // GSAP entrance animation on scroll
  useEffect(() => {
    const el = footerRef.current;
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
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full pt-16 pb-8 px-6 md:px-16 text-slate-800 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #bbf2f6 0%, #85d8d8 35%, #184e68 70%, #061924 100%)",
      }}
    >
      {/* Background Mountain Layer Illustration / Graphic Asset */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none flex items-end justify-center">
        <Image
          src="/landing-src/19852075_6185893.jpg"
          alt="Mountain Landscape Background"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061924] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-20">
        {/* Top Row: Newsletter & Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Newsletter Section */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="text-base md:text-lg font-medium text-slate-800 max-w-sm leading-snug">
              {footerData.newsletter.title}
            </h3>

            {/* Subscription Form */}
            <form
              onSubmit={handleSubscribe}
              className="w-full max-w-md flex flex-col sm:flex-row items-center gap-2 p-2 rounded-full "
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footerData.newsletter.placeholder}
                required
                className="w-full sm:flex-1 py-2.5 px-5 rounded-full bg-white/40 text-slate-800 placeholder-slate-400 text-sm focus:outline-none border border-slate-200 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full sm:w-auto py-2.5 px-7 rounded-full bg-[#fcf6f0] text-slate-900 font-medium text-sm hover:bg-white transition-colors cursor-pointer shadow-sm border border-slate-200"
              >
                {subscribed ? "Success! ✓" : footerData.newsletter.buttonText}
              </motion.button>
            </form>
            {/* Social Media Icons with React Icons Rendered Properly */}
            <div className="flex items-center gap-3">
              {footerData.socials.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Link Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerData.columns.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <h4 className="font-semibold text-sm tracking-wide text-slate-900">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-xs md:text-sm text-slate-700 hover:text-slate-900 transition-colors font-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Center Watermark & Bottom Copyright */}
        <div className="flex flex-col items-center justify-center pt-10 text-center gap-3">
          <h2 className="text-5xl md:text-8xl font-normal tracking-tight">
            <span className="playwrite-text text-white drop-shadow-md">
              {footerData.brandName}
            </span>
          </h2>
          <p className="text-[11px] md:text-xs text-slate-300 font-light tracking-wider uppercase">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
