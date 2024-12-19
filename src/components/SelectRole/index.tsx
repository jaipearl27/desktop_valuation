"use client";
import ApiInstance, { updateToken } from "@/apiInstance/apiInstance";
import { signOut, useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserContext } from "@/context/UserContext";
import { Dialog } from "@mui/material";

// List of bank names
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

const SelectRole = ({ popUp, setPopUp }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedBank, setSelectedBank] = useState(""); // State for selected bank
  const { data: session } = useSession();
  const router = useRouter();
  const { setToken } = useContext(UserContext);
  const propertyType = globalThis?.window?.localStorage.getItem("propertyType");
  

  const roleData = [
    { value: "", roleName: "Select..." },
    { value: "VALUER", roleName: "Valuer" },
    { value: "BANKER", roleName: "Banker" },
    { value: "BROKER", roleName: "Broker" },
    { value: "INDIVIDUAL", roleName: "Individual" },
  ];

  const handleSelectRole = (e) => {
    setSelectedRole(e.target.value);
    if (e.target.value !== "BANKER") setSelectedBank(""); // Reset bank selection when not BANKER
  };

  const handleSelectBank = (e) => {
    setSelectedBank(e.target.value);
  };

  const callLoginApi = async (payload) => {
    try {
      const res = await ApiInstance.post("/login", payload);
      if (res.status === 200) {
        setToken(res.data.token);
        toast.success("Login successful!");
        updateToken(res.data.token);
        if(propertyType){
          router.push(`/${propertyType}`)
        }else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleContinue = async () => {
    const payload = {
      email: session?.user?.email,
      role: selectedRole,
      type: "google",
      bank: selectedBank, // Include selected bank in the payload
    };
    await callLoginApi(payload);
    setPopUp(false);
  };

  const handleClose = async () => {
    setPopUp(false);
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <Dialog classes={{ paper: "rounded-2xl" }} open={popUp}>
        <button
          className="flex justify-end text-xl font-bold me-3 mt-2 text-red-600 hover:text-black"
          onClick={handleClose}
        >
          ×
        </button>
      <div className="relative mb-8 p-5">
        <label htmlFor="role" className="mb-3 block text-sm text-dark">
          Choose the profile that describes you{" "}
        </label>
        <select
          id="role"
          name="role"
          onChange={handleSelectRole}
          value={selectedRole}
          className="border-stroke dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-mainColor"
        >
          {roleData.map((item, index) => (
            <option key={index} value={item.value}>
              {item.roleName}
            </option>
          ))}
        </select>

        {/* Show bank selection only if the selected role is BANKER */}
        {selectedRole === "BANKER" && (
          <div className="mt-4">
            <label htmlFor="bank" className="mb-3 block text-sm text-dark">
              Select your Bank
            </label>
            <select
              id="bank"
              name="bank"
              onChange={handleSelectBank}
              value={selectedBank}
              className="border-stroke dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-mainColor"
            >
              {bankNames.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          disabled={
            !selectedRole || (selectedRole === "BANKER" && !selectedBank)
          }
          onClick={handleContinue}
          className={`${
            (!selectedRole || (selectedRole === "BANKER" && !selectedBank)) &&
            "cursor-not-allowed bg-gray-400"
          } dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-mainColor px-9 py-2 mt-5 text-base font-medium text-white shadow-submit duration-300 hover:bg-mainColor/90`}
        >
          Continue
        </button>
      </div>
    </Dialog>
  );
};

export default SelectRole;
