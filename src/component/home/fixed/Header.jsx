"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CgMenuRightAlt, CgClose } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function Header() {
  const [active, setActive] = useState("Home");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuopen, setDesktopmenuopen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

  const link = [
    {
      id: 1,
      target: true,
      targetSrc: "/",
      label: "Home",
    },
    {
      id: 2,
      label: "Product",
      target: false,
      dropdown: true,
      dropdownSection: [
        {
          id: 1,
          label: "Hemp",
          details:
            "Hemp is a versatile and sustainable material used for modern eco-friendly products.",
          target: "/product?query=hemp",
        },
        {
          id: 2,
          label: "Bamboo",
          details:
            "Bamboo offers incredible strength and rapid renewability for innovative products.",
          target: "/product?query=bamboo",
        },
        {
          id: 3,
          label: "Hemp Organic",
          details:
            "Pure organic hemp cultivated for high-end sustainable fashion.",
          target: "/product?query=hemp-organic",
        },
        {
          id: 4,
          label: "Bamboo Fiber",
          details: "Ultra-soft bamboo fibers processed for daily comfort wear.",
          target: "/product?query=bamboo-fiber",
        },
        {
          id: 5,
          label: "Eco Blends",
          details: "Hybrid materials combining the best of hemp and bamboo.",
          target: "/product?query=eco-blends",
        },
        {
          id: 6,
          label: "Custom Goods",
          details:
            "Tailored sustainable items built to your exact specifications.",
          target: "/product?query=custom",
        },
      ],
    },
    {
      id: 3,
      label: "Services",
      target: false,
      dropdown: true,
      dropdownSection: [
        {
          id: 1,
          label: "Digital Marketing",
          details:
            "Grow your brand reach with cutting-edge digital marketing strategies.",
          target: "/services?query=digital",
        },
        {
          id: 2,
          label: "Tourism",
          details:
            "Experience guided, sustainable, and unforgettable tourism adventures.",
          target: "/services?query=tourism",
        },
      ],
    },
    {
      id: 4,
      target: true,
      targetSrc: "/customization",
      label: "Customization",
    },
  ];

  const router = useRouter();

  const handelSign = async (type) => {
    const agent = navigator.userAgent;
    const time = Date.now();

    const hash = await axios.get(
      "/api/v1/admin/auth/token?agent=" + agent + "&date=" + time,
    );
    if (!hash) {
      return console.log(
        "your are not abel to acces the !page, please refresh the page",
      );
    }
    if (type === "login") {
      router.push(`/auth/login?source=${hash.data}`);
    } else {
      router.push(`/auth/signin?source=${hash.data}`);
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor:
          hoveredIndex !== null
            ? "rgba(255, 255, 255, 0.98)"
            : "rgba(255, 255, 255, 0.95)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md  w-full"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="header-container max-w-[1300px] flex flex-col m-auto px-4">
        {/* Main Nav Bar */}
        <div className="header-main w-full flex justify-between py-4 items-center">
          {/* Brand Logo */}
          <div className="header-left m-0 p-0">
            <div className="header-brand">
              <Link
                href="/"
                className="text-lg md:text-xl font-bold text-black hover:text-gray-700 transition-colors overflow-hidden flex items-center" 
              >
                <Image src="/landing-src/copy-logo.png" alt="Nivani Ventures" width={500} height={500} className="w-[60px] h-full object-cover" />
                <div className="grid leading-tight">
                  <h1 className="playwrite-text leading-6">Nivani Ventures</h1>
                  <p className="text-[12px]  p-0 m-0 text-gray-600">Natural. Sustaninabel. Timless.</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="header-center hidden lg:block">
            <div className="header-nav-links flex gap-4 items-center">
              {link.map((data, index) => (
                <div
                  key={data.id}
                  onMouseEnter={() => {
                    if (data.dropdown) {
                      setHoveredIndex(index);
                    } else {
                      setHoveredIndex(null);
                    }
                  }}
                >
                  <Link
                    href={data.targetSrc || "#"}
                    onClick={() => {
                      setActive(data.label);
                      setHoveredIndex(null);
                    }}
                    className={`py-2 px-5 rounded-full border border-black transition-colors duration-200 inline-block ${
                      active === data.label
                        ? "bg-black text-white"
                        : "bg-transparent text-black hover:bg-gray-100"
                    }`}
                  >
                    {data.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Menu Button / Hamburger */}
          <div className="header-right lg:w-[280px] flex justify-end  gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="py-2 px-4 md:px-6 border md:hidden border-black rounded-full cursor-pointer hover:bg-gray-100 transition flex items-center gap-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <CgClose size={20} />
              ) : (
                <CgMenuRightAlt size={20} />
              )}
            </button>
            <button
              onClick={() => handelSign("login")}
              className="py-2 px-4 md:px-6 border border-black hidden md:flex rounded-full cursor-pointer hover:bg-gray-100 transition flex items-center gap-2"
              aria-label="Toggle Menu"
            >
              {/* <CgMenuRightAlt size={20} /> */}
              Login
            </button>
            <button
              onClick={() => handelSign()}
              className="py-2 px-4 md:px-6 border border-black hidden md:flex rounded-full cursor-pointer hover:bg-gray-800 transition flex items-center gap-2 bg-black text-white"
              aria-label="Toggle Menu"
            >
              {/* <CgMenuRightAlt size={20} /> */}
              Signin
            </button>
          </div>
        </div>

        <AnimatePresence>
          {hoveredIndex !== null && link[hoveredIndex]?.dropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden pb-6 pt-2 w-full hidden lg:block"
            >
              <div className="max-w-[1200px] mx-auto bg-white border border-gray-100 rounded-2xl p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {link[hoveredIndex].dropdownSection.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.target}
                      onClick={() => setHoveredIndex(null)}
                      className="group p-4 rounded-xl hover:bg-[#779076] text-gray-500 hover:text-white transition-all border border-gray-100 hover:border-transparent"
                    >
                      <h4 className="font-semibold text-black group-hover:text-white text-base">
                        {subItem.label}
                      </h4>
                      <p className="text-xs mt-1 line-clamp-2 text-gray-500 group-hover:text-gray-100">
                        {subItem.details}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile & Tablet Full-Screen / Drawer Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "calc(100vh - 80px)" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white overflow-y-auto w-full pb-10 border-t border-gray-100 "
            >
              <div className="flex flex-col gap-4 px-2 py-6">
                {link.map((data, index) => (
                  <div key={data.id} className="border-b border-gray-100 pb-3">
                    <div className="flex justify-between items-center">
                      <Link
                        href={data.targetSrc || "#"}
                        onClick={() => {
                          setActive(data.label);
                          if (!data.dropdown) setMobileMenuOpen(false);
                        }}
                        className={`text-lg font-medium px-3 py-2 rounded-lg ${
                          active === data.label
                            ? "text-black font-bold"
                            : "text-gray-700"
                        }`}
                      >
                        {data.label}
                      </Link>
                      {data.dropdown && (
                        <button
                          onClick={() =>
                            setMobileDropdownOpen(
                              mobileDropdownOpen === index ? null : index,
                            )
                          }
                          className="p-2 text-gray-500 hover:text-black"
                        >
                          <IoIosArrowDown
                            size={18}
                            className={`transform transition-transform duration-200 ${
                              mobileDropdownOpen === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Accordion Dropdown Section */}
                    <AnimatePresence>
                      {data.dropdown && mobileDropdownOpen === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 pr-2 flex flex-col gap-2 mt-2"
                        >
                          {data.dropdownSection.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.target}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileDropdownOpen(null);
                              }}
                              className="p-3 bg-gray-50 rounded-xl hover:bg-[#779076] group transition-all"
                            >
                              <h5 className="font-semibold text-black group-hover:text-white text-sm">
                                {subItem.label}
                              </h5>
                              <p className="text-xs text-gray-500 group-hover:text-gray-100 mt-0.5">
                                {subItem.details}
                              </p>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
