"use client"
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgGoogle } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [step, setStep] = useState(0)
    const router = useRouter()


    const handelVerifyAdmin = async () => {
        const res = await axios.post("/api/v1/auth/checkEmail", { email })
        // console.log(res)
        if (res.status === 200) {
            if (step === 0) {
                setStep((pev) => pev + 1)
            }
            return

        } else {
            return alert("server error")
        }
    }
    const handelMatchPassword = async () => {
        const res = await axios.post("/api/v1/auth/checkPass", { email, password })
        const token = res.data.data
        if (res.status === 200) {
            router.push(`/admin?token=${token}`)
        } else {
            alert(error.response?.data?.message || "Server error")

        }


    }
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
                    <div className="signin-content grid w-full max-w-[500px] gap-8">
                        <h1 className="text-3xl ">Hii Admin</h1>
                        <div className="signin-inputs gap-4 ">
                            {step === 0 && (
                                <div className="signin-step-1 ">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Email"
                                        className="px-4 py-2 border w-full rounded-full border-[#779076a4] focus:outline-[#779076]"
                                    />
                                </div>
                            )}
                            {step === 1 && (
                                <div className="signin-step-1 ">
                                    <input
                                        type="text"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="px-4 py-2 border w-full rounded-full border-[#779076a4] focus:outline-[#779076]"
                                    />
                                </div>
                            )}


                        </div>
                        {step === 0 && (
                            <div className="signin-btns w-full grid gap-4">
                                <button onClick={(e) => handelVerifyAdmin()} className="bg-[#779076] w-full px-4 py-2 rounded-full text-white cursor-pointer">
                                    Sign In{" "}
                                </button>
                                <hr className="text-gray-200" />
                            </div>
                        )}
                        {step === 1 && (
                            <div className="signin-btns w-full grid gap-4">
                                <button onClick={(e) => handelMatchPassword()} className="bg-[#779076] w-full px-4 py-2 rounded-full text-white cursor-pointer">
                                    Sign In{" "}
                                </button>
                                <hr className="text-gray-200" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
