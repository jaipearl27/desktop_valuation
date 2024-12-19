"use client";
import { useContext, useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import ApiInstance from "@/apiInstance/apiInstance";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/context/UserContext";

interface PricingProps {
  showSectionTitle?: boolean; // Add prop for controlling SectionTitle visibility
  onCloseModal?: () => void
}

const Pricing = ({showSectionTitle = true, onCloseModal}: PricingProps) => {
  const router = useRouter();
  const { userData, refetchUserData } = useContext(UserContext);
  const [allSubscription, setAllSubscription] = useState([]);
  const [activePlanName, setActivePlanName] = useState<string | null>(null);
  let selectedPlanId = "";

  useEffect(() => {
    refetchUserData();
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token" && event.newValue) {
        refetchUserData();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Get the active plan name from userData
    if (userData && userData.subscriptions_id) {
      setActivePlanName(userData.subscriptions_id.plan_name); // Accessing plan_name
    }
  }, [userData]);



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
          if(!showSectionTitle){
            onCloseModal()
            refetchUserData()
          }
          else{
            router.push('/');
          }
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
      globalThis?.window?.localStorage.setItem("paymentSuccess", "true");
    },
    prefill: {
      name: userData?.role,
      contact: userData?.phone,
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
    if (!userData) {
      router.push('/signin');
      return;
    }

    options.amount = (plan.final_price_with_gst * 100).toString();
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
    <>
    {showSectionTitle && (
      <SectionTitle
        title="Simple and Affordable Pricing"
        paragraph=""
        center
        width="665px"
      />
    )}
      <div className="flex items-center justify-center max-[350px]:">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-6 lg:py-16">
          <div className="flex cursor-pointer max-[350px]:flex-col max-[550px]:flex-col max-[600px]:flex-col">
            {allSubscription?.map((plan: any, index: number) => (
              <div key={index}>
                <PricingBox
                  packageName={plan?.plan_name}
                  price={plan?.price}
                  final_price={plan.per_report_price}
                  final_price_with_gst={plan.final_price_with_gst}
                  duration={plan.discount ? `per report (${plan.discount}% off)` : "per report"}
                  title="Start With Plan"
                  onClick={() => openPayModal(options, plan)}
                  isActive={activePlanName === plan.plan_name}
                >
                  {plan?.specification?.map(item => <div key={item} className="mb-3 flex items-center">
                    <span className="mr-3 flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full bg-mainColor bg-opacity-10 text-primary">
                      <svg width="8" height="6" viewBox="0 0 8 6" className="currentColor">
                        <path d="M2.90567 6.00024C2.68031 6.00024 2.48715 5.92812 2.294 5.74764L0.169254 3.43784C-0.0560926 3.18523 -0.0560926 2.78827 0.169254 2.53566C0.39461 2.28298 0.74873 2.28298 0.974086 2.53566L2.90567 4.66497L7.02642 0.189715C7.25175 -0.062913 7.60585 -0.062913 7.83118 0.189715C8.0566 0.442354 8.0566 0.839355 7.83118 1.09198L3.54957 5.78375C3.32415 5.92812 3.09882 6.00024 2.90567 6.00024Z">
                        </path>
                      </svg>
                    </span>
                    <p className="m-0 text-base font-medium text-body-color">{item}</p>
                  </div>)}
                  {/* <p className="mb-8 text-[18px] font-medium text-gray-600">
                    {plan.no_of_report} reports available {plan.discount !== 0 && `at a ${plan.discount}%
                    discount.`}
                  </p> */}
                </PricingBox>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
