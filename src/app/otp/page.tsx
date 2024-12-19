"use client";
import React, { useState } from "react";
import ApiInstance from "@/apiInstance/apiInstance";
import { useRouter } from "next/navigation";

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const router = useRouter();
  const flagOfForgotPassword = globalThis?.window?.localStorage.getItem("is-forgot-password");
  const handleChange = (index: any, value: any) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = globalThis?.window?.localStorage.getItem("email");
    const password = globalThis?.window?.localStorage.getItem("password");
    const enteredOtp =  parseInt(otp.join(""))
    if (flagOfForgotPassword) {
      ApiInstance.post("/forgot-password", {
        email,
        otp: enteredOtp,
        newPassword: password,
      }).then((res) => {
        globalThis?.window?.localStorage.clear();
        router.push("/signin");
      });
    } else {
      ApiInstance.post("/verify", { email, otp: enteredOtp }).then((res) => {
        globalThis?.window?.localStorage.clear();
        router.push("/signin");
      });
    }
  };

  return (
    <>
      <div className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three  sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black  sm:text-3xl">
                  Verify
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Your code was sent to you via email
                </p>
                <form id="otp-form" onSubmit={handleSubmit}>
                  <div className="flex items-center justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        value={digit}
                        maxLength={1}
                        className="h-14 w-14 appearance-none rounded border border-transparent bg-slate-100 p-4 text-center text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    ))}
                  </div>
                  <div className="mx-auto mt-4 max-w-[260px]">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center whitespace-nowrap rounded-lg bg-mainColor px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                    >
                      Verify Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#003F32" />
                <stop offset="1" stopColor="#003F32" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#003F32" />
                <stop offset="1" stopColor="#003F32" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
