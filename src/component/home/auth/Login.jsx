import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CgGoogle } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";

export default function Login() {
  return (
    <div className="signin-container">
      <div className="signin-main grid md:grid-cols-2">
        <div className="w-full h-[100vh] hidden md:flex">
          <Image
            src="/landing-src/nivini-mountain-bg.jpg"
            alt="Nivini Mountain Background"
            width={500}
            height={500}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="signin-compoent h-[100vh] w-full flex justify-center items-center px-8 text-start">
          <div className="button absolute z-1 top-2 right-2 cursor-pointer bg-black px-4 py-1 rounded-full text-white">
            <Link href={"/auth/admin"}>Admin</Link>
          </div>
          <div className="signin-content grid w-full max-w-[500px] gap-8">
            <h1 className="text-3xl ">Take any product Your's</h1>
            <div className="signin-inputs ">
              <div className="signin-step-1 ">
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="px-4 py-2 border w-full rounded-full border-[#779076a4] focus:outline-[#779076]"
                />
              </div>
            </div>
            <div className="signin-btns w-full grid gap-4">
              <button className="bg-[#779076] w-full px-4 py-2 rounded-full text-white cursor-pointer">
                Sign In{" "}
              </button>
              <hr className="text-gray-200" />
              <div className="extra-btns grid gap-2">
                <button className="bg-white border border-gray-200 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-black cursor-pointer">
                  <CgGoogle size={20} /> Google
                </button>
                <button className="bg-white border border-gray-200 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-black cursor-pointer">
                  <FaGithub size={20} /> Github
                </button>
                {/* <button className="bg-white border border-gray-200 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-black cursor-pointer">
                  <CgGoogle size={20} /> Google
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
