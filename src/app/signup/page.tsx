"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import ApiInstance, { updateToken } from "@/apiInstance/apiInstance";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"; 
import { useSession } from 'next-auth/react';
import SelectRole from "@/components/SelectRole";
import { UserContext } from "@/context/UserContext";
import FullScreenLoader from "@/components/FullScreenLoader";


const SignupPage = () => {
  const { setToken } = useContext(UserContext);
  const router = useRouter()
  const { data: session,status } = useSession();
  const [popUp,setPopUp] = useState(false);
  const [loading,setLoading] = useState(true);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      banker_role_value: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Your FullName is Required'),
      email: Yup.string().email('Invalid email address').required('Email Is Required'),
      role: Yup.string().required('Your Role Is Required'),
      password: Yup.string().oneOf([Yup.ref('password'), null]).min(8, 'Password must be 8 characters').required('Password Is Required'),
      phone: Yup.string().required('Your Phone No Is Required').max(10)
        .required(),
      banker_role_value: Yup.string().when('role', (role: any) => {
        if (role[0] === 'BANKER')
          return Yup.string().required('Banker Role is Required')
        return Yup.string().notRequired()
      }),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        setSubmitting(true);
        globalThis?.window?.localStorage.setItem("email", values.email);
        const response = await ApiInstance.post('/user', values);

        if (response.status === 201) {
          router.push('/otp');
        }

      } catch (error) {
        toast.error(error.response.data.message);
        console.error('Error submitting form:', error);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });


  const roleData = [
    {
      value: "",
      roleName: "Select...",
    },
    {
      value: "VALUER",
      roleName: "Valuer",
    },
    {
      value: "BANKER",
      roleName: "Banker",
    },
    {
      value: "BROKER",
      roleName: "Broker",
    },
    {
      value: "INDIVIDUAL",
      roleName: "Individual",
    },
  ];


  const bankNames = [
    "Select...",
    "Adani Capital Pvt. Ltd.",
    "Adani Housing Finance Pvt. Ltd.",
    "ART Housing Finance",
    "Axis Bank",
    "Bank of Baroda",
    "Bank of India",
    "Bank of Maharashtra",
    "Baroda Gujarat Gramin Bank",
    "Canara Bank",
    "Central Bank of India",
    "City Union Bank",
    "Corporation Bank",
    "DRT Ahmedabad",
    "Easy Housing Finance Ltd.",
    "Electronica Finance Ltd.",
    "Federal Bank",
    "Fullerton India Credit Company Ltd.",
    "Fusion Micro Finance Ltd.",
    "HDFC Bank",
    "Hero Housing Finance",
    "Hindustan Fluorocarbon Ltd.",
    "Home First Finance Company",
    "Home First Finance Company India Ltd. (HFFC)",
    "ICICI Bank",
    "IDBI Bank",
    "Indian Bank",
    "Indian Overseas Bank",
    "IndusInd Bank",
    "Jana Housing Finance Limited",
    "Jana Small Finance Bank",
    "Kotak Mahindra Prime Ltd.",
    "MAS Financial Services",
    "Neo Leaf Housing Finance",
    "PNB Housing Finance",
    "PNB Housing Finance Ltd.",
    "Punjab & Sind Bank",
    "Punjab National Bank",
    "Shamrao Vitthal Co-operative Bank",
    "State Bank of India",
    "Sutex Bank",
    "SVC Co-operative Bank Ltd.",
    "SRG Housing Finance",
    "UCO Bank",
    "Ujjivan Small Finance Bank",
    "Union Bank of India",
    "Yes Bank Ltd.",
  ];

  const checkUser = async () => {
    try {
      const res = await ApiInstance.get(`/user/check/${session?.user?.email}`);
      if(res.data.exists){
        const payload = {
          email: session?.user?.email,
          type: 'google',
        };
        await callLoginApi(payload);
      } else {
        setPopUp(true);
      }
    } catch (error) {
      console.error("Error checking user:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }  finally {
      setLoading(false);
    }
  };
  const callLoginApi = async (payload) => {
    try {
      const res = await ApiInstance.post('/login', payload);
      if (res.status === 200) {
        setToken(res.data.token);
        toast.success("Login successful!");
        updateToken(res.data.token);
        router.push('/');
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }  finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      setLoading(true);
      checkUser();
    }
    if(status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session,status]);

    const handleGoogleSignIn = async () => {
      setLoading(true);
      await signIn('google', { 
        redirect: false,
      })
    };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three  sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black  sm:text-3xl">
                  Create your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  It&apos;s totally free and super easy
                </p>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm text-dark "
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.name}
                      placeholder="Enter your full name"
                      className="border-stroke  w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-mainColor dark:shadow-two "
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <span className="text-red-500 font-medium text-sm">{formik.errors.name}</span>
                    ) : null}
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="mobile"
                      className="mb-3 block text-sm text-dark "
                    >

                      Mobile No.{" "}
                    </label>
                    <input
                      id="phone"
                      type="number"
                      name="phone"
                      placeholder="Enter your Mobile No."
                      className="no-spinner border-stroke  w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-mainColor dark:shadow-two "
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.phone}
                      maxLength={10}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <span className="text-red-500 font-medium text-sm">{formik.errors.phone}</span>
                    ) : null}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark "
                    >

                      Email{" "}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter Your Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.email}
                      className="border-stroke  w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-mainColor dark:shadow-two "
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <span className="text-red-500 font-medium text-sm">{formik.errors.email}</span>
                    ) : null}

                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark "
                    >

                      Your Password{" "}
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.password}
                      placeholder="Enter your Password"
                      className="border-stroke  w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-mainColor dark:shadow-two "
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <span className="text-red-500 font-medium text-sm">{formik.errors.password}</span>
                    ) : null}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="role"
                      className="mb-3 block text-sm text-dark "
                    >

                      Choose the profile that describes you{" "}
                    </label>
                    <select
                      id="role"
                      name="role"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.role}
                      className="border-stroke  w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-mainColor dark:shadow-two "
                    >
                      {roleData.map((item, index) => (
                        <option key={index} value={item.value}>{item.roleName}</option>
                      ))}
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                      <span className="text-red-500 font-medium text-sm">{formik.errors.role}</span>
                    ) : null}

                  </div>

                  {formik.values?.role === "BANKER" && (
                    <div className="mb-8">
                      <label
                        htmlFor="bank"
                        className="mb-3 block text-sm text-dark "
                      >

                        Choose the Bank{" "}
                      </label>
                      <select
                        id="banker_role_value"
                        name="banker_role_value"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values?.banker_role_value}
                        className="border-stroke  w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-mainColor dark:shadow-two "

                      >
                        {bankNames.map((item, index) => (
                          <option key={index} value={item}>{item}</option>
                        ))}
                      </select>
                      {formik.touched.banker_role_value && formik.errors.banker_role_value ? (
                        <span className="text-red-500 font-medium text-sm">{formik.errors.banker_role_value}</span>
                      ) : null}

                    </div>
                  )}
                  <div className="mb-8 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          className="sr-only"
                        />
                        <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 ">
                          <span className="opacity-0">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <span>
                        By creating account means you agree to the
                        <a href="#0" className="text-mainColor hover:underline">

                          Terms and Conditions{" "}
                        </a>
                        , and our
                        <a href="#0" className="text-mainColor hover:underline">

                          Privacy Policy{" "}
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-sm bg-mainColor px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-mainColor/90 dark:shadow-submit-dark"
                    >
                      {formik.isSubmitting ? "Loading..." : "Sign up"}
                    </button>
                  </div>
                </form>
                <button
                  onClick={() => handleGoogleSignIn()}
                  className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  <FaGoogle className="mr-2" /> Signup with Google
                </button>

                <p className="text-center text-base font-medium text-body-color">
                  Already using Startup?{" "}
                  <Link
                    href="/signin"
                    className="text-mainColor hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
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
      <SelectRole popUp={popUp} setPopUp={setPopUp} />  
    </>
  );
};

export default SignupPage;
