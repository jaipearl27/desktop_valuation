"use client";
import { FormLabel } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ApiInstance from "@/apiInstance/apiInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Loader from "@/components/Common/Loader";
import * as yup from "yup";
import { UserContext } from "@/context/UserContext";
import SubscriptionModal from "@/components/SubscriptionModal/SubscriptionModal";

const Land: React.FC = () => {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingSubmitValues, setPendingSubmitValues] = useState(null);

  const validationSchema = yup.object({
    landArea: yup
      .number()
      .required("Land Area is required")
      .min(0, "Land Area must be a positive number"),
    mesurment: yup.string().required("Mesurment is required"),
    location: yup.string().required("Location is required"),
    address: yup.string().required("Address is required"),
    owner: yup.string().required("Owner is required"),
  });
  const formik = useFormik({
    initialValues: {
      landArea: 0,
      mesurment: "",
      location: "",
      address: "",
      owner: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.landArea === 0) {
        toast.error("Please Add Land Area of your Property");
        return;
      }
      if (isNaN(values.landArea)) {
        toast.error("Area must be numeric");
        return;
      }
      if (parseInt(values.landArea.toString()) < 0) {
        toast.error("Invalid Data");
        return;
      }

      if (!values.mesurment) {
        toast.error("Please select Input Area Measurement");
        return;
      }
      if (
        userData?.subscriptions_id?._id &&
        userData?.no_of_report > 0 &&
        userData?.is_paid === true
      ) {
        await submitForm(values);
      } else {
        // If not, store the values and prompt the user to subscribe
        setPendingSubmitValues(values);
        toast.error("Please buy a plan to generate a report.");
        setTimeout(() => {
          setOpen(true);
        }, 1000);
      }
    },
  });

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const distance = values.location === "City" ? 2000 : 10000;
      const landAreaConverted = checkAreaOfMeasurement(values.mesurment);

      const data = {
        land_area: landAreaConverted,
        user_id: userData?._id,
        latitude: parseFloat(
          globalThis?.window?.localStorage.getItem("latitude") || "0",
        ),
        longitude: parseFloat(
          globalThis?.window?.localStorage.getItem("longitude") || "0",
        ),
        distance: distance,
        address: globalThis?.window?.localStorage.getItem("fullAddress") || "",
        type_of_property: "Land",
        land_location: values.location,
        owner_address: values.address,
        owner_name: values.owner,
      };

      const res = await ApiInstance.post("/report/nearestLocationReport", data);
      if (res.data?.report_id) {
        toast.success(res?.data?.message);
        localStorage.removeItem("propertyType");
        router.push(`/land-details/${res?.data?.report_id}`);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkAreaOfMeasurement = (data: string): number => {
    if (data === "sqmt") {
      return parseInt(
        (parseInt(formik.values.landArea.toString()) * 10.76391042).toString(),
      );
    } else if (data === "yard area") {
      return parseInt(
        (parseInt(formik.values.landArea.toString()) * 9).toString(),
      );
    } else {
      return parseInt(formik.values.landArea.toString());
    }
  };

  useEffect(() => {
    if (
      pendingSubmitValues &&
      userData?.is_paid === true &&
      userData?.subscriptions_id?._id &&
      userData?.no_of_report > 0
    ) {
      // Submit the form with pending values
      submitForm(pendingSubmitValues);
      // Clear the pending values to prevent re-submission
      setPendingSubmitValues(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, pendingSubmitValues]);

  return (
    <div className="mt-16 pb-[120px] pt-[120px]">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <Loader />
        </div>
      )}

      <div
        className={`relative ${loading ? "opacity-50" : "opacity-100"} container transition-opacity duration-300`}
      >
        <div className="mb-5 mt-4 flex justify-center font-serif text-4xl font-semibold text-black max-[600px]:text-[24px]">
          <h2>Land / Plot</h2>
        </div>
        <div className="p-8 pb-8 pt-8 shadow-2xl">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="grid grid-cols-2 gap-4 max-[600px]:flex max-[600px]:flex-col">
              <div className="">
                <FormLabel htmlFor="landArea">Land Area</FormLabel>
                <input
                  type="number"
                  id="landArea"
                  name="landArea"
                  value={formik.values.landArea || ""}
                  placeholder="Enter your land area"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                />
                {formik.touched.landArea && formik.errors.landArea ? (
                  <div className="text-red-600">{formik.errors.landArea}</div>
                ) : null}
              </div>
              <div className="">
                <FormLabel htmlFor="mesurment">Measurement</FormLabel>
                <select
                  id="mesurment"
                  name="mesurment"
                  value={formik.values.mesurment}
                  onChange={formik.handleChange}
                  className="w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                >
                  <option value="" disabled>
                    Measurement
                  </option>
                  <option value="sqmt">SQMT</option>
                  <option value="yard area">Yard Area</option>
                  <option value="sqft">SQFT</option>
                </select>
                {formik.touched.mesurment && formik.errors.mesurment ? (
                  <div className="text-red-600">{formik.errors.mesurment}</div>
                ) : null}
              </div>
              <div className="">
                <FormLabel htmlFor="location">Select Location</FormLabel>
                <select
                  id="location"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  className="w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                >
                  <option value="" disabled>
                    Location
                  </option>
                  <option value="Village">Village</option>
                  <option value="City">City</option>
                </select>
                {formik.touched.location && formik.errors.location ? (
                  <div className="text-red-600">{formik.errors.location}</div>
                ) : null}
              </div>
              <div className="">
                <FormLabel htmlFor="owner">Owner Name</FormLabel>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formik.values.owner}
                  placeholder="Enter your owner name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                />
                {formik.touched.owner && formik.errors.owner ? (
                  <div className="text-red-600">{formik.errors.owner}</div>
                ) : null}
              </div>
              <div className="">
                <FormLabel htmlFor="address">Owner Address</FormLabel>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  placeholder="Enter your owner address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-600">{formik.errors.address}</div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="ease-in-up mt-8 rounded-sm bg-mainColor px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {open && <SubscriptionModal open={open} handleClose={handleClose} />}
    </div>
  );
};

export default Land;
