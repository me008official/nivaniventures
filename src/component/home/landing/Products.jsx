"use client";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------------------- */
/*  Static data (module scope → not re-created on every render)                */
/* -------------------------------------------------------------------------- */

const STICKY_TOP = 96; // px – must match `lg:top-24` (6rem) below
const STEP_HEIGHT_VH = 70; // scroll distance given to each section on desktop
const IMAGE_SIZES = "(min-width: 1024px) 58vw, 100vw";

const MAIN_TABS = [
  { id: "qualities", label: "Qualities" },
  { id: "products", label: "Products" },
];

const MATERIALS = [
  {
    id: "hemp",
    label: "Hemp",
    labelContent: "Hemp Fabric (NIVINI Hemp)",
    labelDesc:
      "Golden Fiber hemp is one of the strongest, most durable, and eco-friendly natural textiles on earth",
    sections: [
      {
        id: "durability",
        label: "Durability & Strength",
        description:
          "Golden Fiber hemp is one of the strongest, most durable, and eco-friendly natural textiles on earth.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "breathability",
        label: "Breathability & Thermoregulation",
        description:
          "Highly breathable with natural micro-pores, keeping you cool in summer and warm in winter. It also becomes softer with every single wash.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "eco",
        label: "Eco-Footprint",
        description:
          "Requires minimal water to grow and naturally replenishes the soil, making it a zero-waste agricultural powerhouse.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "usage",
        label: "Best Used For",
        description:
          "Ideal for heavy-duty apparel, eco-friendly bags, durable footwear, and sustainable home textiles.",
        image: "/landing-src/hemp.avif",
      },
    ],
  },
  {
    id: "bamboo",
    label: "Bamboo",
    labelContent: "Bambo Fabric (NIVINI Bambo)",
    labelDesc:
      "Bamboo fibers possess a cashmere-like smooth texture that feels luxurious against sensitive skin.",
    sections: [
      {
        id: "softness",
        label: "Natural Softness",
        description:
          "Bamboo fibers possess a cashmere-like smooth texture that feels luxurious against sensitive skin.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "wicking",
        label: "Moisture Wicking",
        description:
          "Pulls moisture away from the body efficiently, ensuring absolute dryness and comfort throughout the day.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "antibacterial",
        label: "Antibacterial Properties",
        description:
          "Naturally resists odor-causing bacteria, keeping your garments fresh for much longer periods.",
        image: "/landing-src/hemp.avif",
      },
    ],
  },
  {
    id: "organic-cotton",
    label: "Organic Cotton",
    labelContent: "Organic Cotton Fabric (NIVINI Cotton)",
    labelDesc:
      "Grown without harmful synthetic pesticides or fertilizers, protecting both ecosystem biodiversity and farmers.",
    sections: [
      {
        id: "purity",
        label: "Chemical-Free Purity",
        description:
          "Grown without harmful synthetic pesticides or fertilizers, protecting both ecosystem biodiversity and farmers.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "hypoallergenic",
        label: "Hypoallergenic Comfort",
        description:
          "Gentle on sensitive skin types, eliminating risks of irritation typically caused by chemical residues.",
        image: "/landing-src/hemp.avif",
      },
    ],
  },
  {
    id: "nepali-suruwal",
    label: "Nepali Suruwal",
    labelContent: "Nepali Traditional Suruwal (NIVINI Traditional)",
    labelDesc:
      "Crafted using indigenous traditional handloom techniques passed down through Himalayan generations.",
    sections: [
      {
        id: "heritage",
        label: "Heritage Weave",
        description:
          "Crafted using indigenous traditional handloom techniques passed down through Himalayan generations.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "resilience",
        label: "Cultural Resilience",
        description:
          "Designed structurally for freedom of movement, endurance, and authentic cultural aesthetic expression.",
        image: "/landing-src/hemp.avif",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Small presentational components (memoised → no needless re-renders while   */
/*  the scroll handler updates the active section)                             */
/* -------------------------------------------------------------------------- */

const MainTabs = memo(function MainTabs({ activeId, onChange }) {
  return (
    <div className=" mb-12 flex justify-center">
      <div
        role="tablist"
        aria-label="Content type"
        className=" flex gap-2 rounded-full bg-black p-1.5"
      >
        {MAIN_TABS.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`cursor-pointer rounded-full px-6 py-2 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                isActive
                  ? "bg-white text-black shadow-md"
                  : "text-white hover:text-neutral-300"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});

const MaterialTabs = memo(function MaterialTabs({ activeIndex, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Material"
      className="sticky top-17 z-30 mb-12 flex flex-wrap justify-start gap-3 bg-white py-4"
    >
      {MATERIALS.map((material, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={material.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(index)}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
              isActive
                ? "border-black bg-black text-white shadow"
                : "border-neutral-300 bg-white text-black hover:border-black"
            }`}
          >
            {material.label}
          </button>
        );
      })}
    </div>
  );
});

const SectionNav = memo(function SectionNav({
  material,
  activeIndex,
  onSelect,
  onSeeProducts,
}) {
  return (
    <div className="flex h-fit flex-col justify-start">
      <ul className="mb-8 flex flex-col gap-4">
        {material.sections.map((section, index) => {
          const isActive = activeIndex === index;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive ? "true" : undefined}
                className={`cursor-pointer text-left text-xl font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:text-2xl ${
                  isActive
                    ? "translate-x-2 font-bold text-[#779076]"
                    : "text-neutral-300 hover:text-neutral-500"
                }`}
              >
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

const ActiveCard = memo(function ActiveCard({
  materialId,
  section,
  index,
  reduceMotion,
}) {
  const motionProps = useMemo(
    () =>
      reduceMotion
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.15 },
          }
        : {
            initial: { opacity: 0, y: 15, scale: 0.98 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -15, scale: 0.98 },
            transition: { duration: 0.3, ease: "easeInOut" },
          },
    [reduceMotion],
  );

  return (
    <div className="w-full overflow-hidden rounded-3xl p-6  md:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {/* Key includes the material id – section ids repeat across materials,
            so a key of section.id alone would skip the transition. */}
        <m.div
          key={`${materialId}-${section.id}`}
          {...motionProps}
          className="flex flex-col gap-6"
          aria-live="polite"
        >
          <div className="relative h-[240px] w-full overflow-hidden rounded-[50px] bg-white shadow-md md:h-[300px]">
            <Image
              src={section.image}
              alt={section.label}
              fill
              sizes={IMAGE_SIZES}
              className="object-cover"
            />
          </div>
          <div className="min-h-[7.5rem]">
            <p className="text-lg  text-[#779076] leading-relaxed ">
              {section.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                // onClick={onSeeProducts}
                className="cursor-pointer rounded-full bg-[#779076] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#779076b9]"
              >
                See Product
              </button>
              <button
                type="button"
                className="cursor-pointer text-sm font-medium text-black underline underline-offset-4 transition-colors hover:text-neutral-600"
              >
                Learn More About {section.label}
              </button>
            </div>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function Products() {
  const [activeMainTab, setActiveMainTab] = useState("qualities");
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const reduceMotion = useReducedMotion();

  const trackRef = useRef(null); // tall element that provides scroll distance
  const panelRef = useRef(null); // sticky panel (nav + card)
  const scrollTriggerRef = useRef(null);
  const lockRef = useRef(false); // ignores scroll updates during click-scroll
  const lockTimerRef = useRef(null);

  const material = MATERIALS[activeMenuIndex];
  const sectionCount = material.sections.length;
  const activeSection =
    material.sections[Math.min(activeSectionIndex, sectionCount - 1)];

  /* ---- Scroll-driven active section (one ScrollTrigger, desktop only) ---- */
  useEffect(() => {
    if (activeMainTab !== "qualities") return;
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!track || !panel) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: track,
        // Track's top reaches the sticky offset → panel becomes "stuck"
        start: `top top+=${STICKY_TOP}`,
        // Track's bottom reaches panel's bottom → panel is released
        end: () => `bottom top+=${STICKY_TOP + panel.offsetHeight}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (lockRef.current) return;
          const next = Math.min(
            sectionCount - 1,
            Math.floor(self.progress * sectionCount),
          );
          setActiveSectionIndex(next); // React bails out if unchanged
        },
      });
      scrollTriggerRef.current = trigger;

      return () => {
        trigger.kill();
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, [activeMainTab, activeMenuIndex, sectionCount]);

  useEffect(() => () => clearTimeout(lockTimerRef.current), []);

  /* ------------------------------- Handlers -------------------------------- */

  const handleMainTabChange = useCallback((id) => {
    setActiveMainTab(id);
    setActiveSectionIndex(0);
  }, []);

  const handleMaterialChange = useCallback((index) => {
    setActiveMenuIndex(index);
    setActiveSectionIndex(0);
  }, []);

  const handleSectionSelect = useCallback(
    (index) => {
      setActiveSectionIndex(index);

      const trigger = scrollTriggerRef.current;
      if (!trigger) return; // mobile / tablet: no scroll-linking, state is enough

      // Scroll to the middle of this section's band
      const top =
        trigger.start +
        ((index + 0.5) / sectionCount) * (trigger.end - trigger.start);

      // Don't let intermediate sections flash while the smooth scroll passes them
      lockRef.current = true;
      clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        lockRef.current = false;
      }, 900);

      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [sectionCount, reduceMotion],
  );

  const handleSeeProducts = useCallback(
    () => handleMainTabChange("products"),
    [handleMainTabChange],
  );

  /* -------------------------------- Render --------------------------------- */

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="min-h-screen w-full bg-white px-4 py-16 text-black md:px-12">
        <MainTabs activeId={activeMainTab} onChange={handleMainTabChange} />

        {activeMainTab === "qualities" ? (
          <div className="mx-auto max-w-7xl">
            <MaterialTabs
              activeIndex={activeMenuIndex}
              onChange={handleMaterialChange}
            />
            <div className="section-main-details ">
              <h3 className="text-[28px] font-bold  text-black">
                {material.labelContent} 
              </h3>
              <p className="text-[24px] leading-relaxed text-[#779076] max-w-[500px]">
                {material.labelDesc}
              </p>
            </div>

   
            <div
              ref={trackRef}
              className="relative lg:h-[var(--track-h)] py-8 md:py-0"
              style={{ "--track-h": `${sectionCount * STEP_HEIGHT_VH}vh` }}
            >
              <div
                ref={panelRef}
                className="grid grid-cols-1 items-center gap-10 lg:sticky lg:top-24 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-5">
                  <SectionNav
                    material={material}
                    activeIndex={activeSectionIndex}
                    onSelect={handleSectionSelect}
                    onSeeProducts={handleSeeProducts}
                  />
                </div>

                <div className="lg:col-span-7">
                  <ActiveCard
                    materialId={material.id}
                    section={activeSection}
                    index={activeSectionIndex}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <h2 className="text-2xl font-semibold uppercase tracking-wider text-neutral-400 md:text-3xl">
              Coming Soon
            </h2>
          </div>
        )}
      </section>
    </LazyMotion>
  );
}
