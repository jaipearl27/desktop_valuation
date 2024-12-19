"use client";

import ApiInstance from "@/apiInstance/apiInstance";
import PricingBox from "@/components/Pricing/PricingBox";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Subscribe = () => {

  const router = useRouter();
  const [allSubscription, setAllSubscription] = useState([]);
  const [userData, setUserData] = useState<any>({});
  let selectedPlanId = "";

  const getUserId = () => {
    const token = globalThis?.window?.localStorage.getItem("token")!;
    const decoded: any = jwtDecode(token);
    getUserDetail(decoded)
  };

  useEffect(() => {
    getUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserDetail = async (decoded: { id: string; }) => {
    try {
      const response = await ApiInstance.get("/user/" + decoded?.id);
      setUserData(response?.data?.user)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: "",
    name: "",
    description: "",
    image: "/favicon.ico",
    currency: "INR",
    handler: async function (response: any) {
      const paymentId = response?.razorpay_payment_id;
      const payload = {
        user_id: userData?._id,
        razor_pay_response: paymentId,
        subscriptions_id: selectedPlanId,
      };

      try {
        const res = await ApiInstance.post("/razorpay", payload);
        if (res.status === 201) {
          router.push('/')
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }

      alert(paymentId);
    },
    prefill: {
      name: userData?.role,
      contact: userData.phone,
      email: userData?.email,
    },
    notes: {
      address: "",
    },
    theme: {
      color: "#F37254",
      hide_topbar: false,
    },
  };


  const openPayModal = (options: any, plan: any): any => {
    options.amount = (plan.final_price * 100).toString();
    selectedPlanId = plan._id;
    options.notes = {
      id: plan._id,
      userId: userData?._id,
    };
    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options);

      rzp1.open();
    } else {
      console.error("Razorpay is not loaded");
    }
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/subscription");
        const sortedData = res?.data?.allSubscriptionPlan?.sort(
          (a: any, b: any) => a.plan_no - b.plan_no,
        );
        setAllSubscription(sortedData);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center pt-[150px]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="flex cursor-pointer max-[350px]:flex-col max-[550px]:flex-col">
          {allSubscription?.map((plan: any, index: number) => (
            <div key={index}>
              <PricingBox
                packageName={plan?.plan_name}
                price={plan?.final_price}
                duration={"Month"}
                title="Start With Plan"
                onClick={() => openPayModal(options, plan)}
              >
                <p className="mb-8 text-[18px] font-medium text-gray-600">
                  {plan?.no_of_report} reports available at a {plan?.discount}%
                  discount.
                </p>

              </PricingBox>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
