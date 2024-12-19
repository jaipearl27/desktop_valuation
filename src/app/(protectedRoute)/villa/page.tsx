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

const Villa = () => {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingSubmitValues, setPendingSubmitValues] = useState(null);
  const validationSchema = yup.object({
    land_area: yup
      .number()
      .required("Land Area is required")
      .test(
        "is-not-zero",
        "Land Area must not be empty and it is a positive number",
        (value) => value !== 0,
      ),
    // construction_area: yup.string().required("Construction Area is required"),
    age_of_property: yup
      .number()
      .required("Age of Property is required")
      .test(
        "is-not-zero",
        "Age of Property is required",
        (value) => value !== 0,
      ),
    areaMesurment: yup.string().required("Area Mesurment is required"),
    house_no: yup
      .number()
      .required("House No is required")
      .min(0, "House No must be a positive number"),
    address: yup.string().required("Address is required"),
    owner: yup.string().required("Owner is required"),
  });
  const formik = useFormik({
    initialValues: {
      land_area: 0,
      construction_area: 0,
      age_of_property: 0,
      type: "",
      areaMesurment: "",
      house_no: "",
      address: "",
      owner: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (
        values.land_area === 0 ||
        // values.construction_area === 0 ||
        values.age_of_property === 0
      ) {
        toast.error("Please Add Data of your Property");
        return;
      }
      if (
        isNaN(values.land_area) ||
        isNaN(values.construction_area) ||
        isNaN(values.age_of_property)
      ) {
        toast.error("Area and Age Data must be numeric");
        return;
      }
      if (
        parseInt(values.land_area.toString()) < 0 ||
        // parseInt(constructionArea.toString()) < 0 ||
        parseInt(values.age_of_property.toString()) < 0
      ) {
        toast.error("Invalid Data");
        return;
      }
      if (!values.areaMesurment) {
        toast.error("Please select Input Area Measurement");
        return;
      }
      if (!values.type) {
        toast.error("Please select Type of your Property");
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
      const constructionArea = values.construction_area
        ? parseInt(values.construction_area.toString())
        : 0;

      const data = {
        land_area: checkAreaOfMeasurement(values.areaMesurment),
        construction_area: constructionArea,
        age_of_property: parseInt(values.age_of_property.toString()),
        type: values.type,
        house_no: parseInt(values.house_no.toString()),
        type_of_property: "Independent",
        latitude: parseFloat(
          globalThis?.window?.localStorage.getItem("latitude") || "0",
        ),
        longitude: parseFloat(
          globalThis?.window?.localStorage.getItem("longitude") || "0",
        ),
        distance: parseFloat(
          globalThis?.window?.localStorage.getItem("distance") || "0",
        ),
        address: globalThis?.window?.localStorage.getItem("fullAddress") || "",
        user_id: userData?._id,
        owner_address: values.address,
        owner_name: values.owner,
      };

      const res = await ApiInstance.post("/report/nearestLocationReport", data);
      if (res.data?.report_id) {
        toast.success(res?.data?.message);
        localStorage.removeItem("propertyType");
        router.push(`/villa-details/${res?.data?.report_id}`);
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

  const checkAreaOfMeasurement = (data: any) => {
    if (data === "sqmt") {
      return parseInt((formik.values.land_area * 10.76391042).toString());
    } else if (data === "yard area") {
      return parseInt((formik.values.land_area * 9).toString());
    } else {
      return parseInt(formik.values.land_area.toString());
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
          <h2>Independent House / Villa</h2>
        </div>
        <div className="p-8 pb-8 pt-8 shadow-2xl">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="grid grid-cols-2 gap-4 max-[600px]:flex max-[600px]:flex-col">
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
            <div className="mt-4 grid grid-cols-2 gap-4 max-[600px]:flex max-[600px]:flex-col">
              <div className="">
                <FormLabel htmlFor="land_area">Land Area</FormLabel>
                <input
                  type="number"
                  id="land_area"
                  name="land_area"
                  placeholder="Enter your land area"
                  value={formik.values.land_area || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                />
                {formik.touched.land_area && formik.errors.land_area ? (
                  <div className="text-red-600">{formik.errors.land_area}</div>
                ) : null}
              </div>
              <div className="">
                <FormLabel htmlFor="construction_area">
                  Construction Area
                </FormLabel>
                <input
                  type="number"
                  id="construction_area"
                  name="construction_area"
                  placeholder="Enter your construction area"
                  value={formik.values.construction_area || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                />
                {formik.touched.construction_area &&
                formik.errors.construction_area ? (
                  <div className="text-red-600">
                    {formik.errors.construction_area}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 max-[600px]:flex max-[600px]:flex-col">
              <div className="">
                <FormLabel htmlFor="age_of_property">Age Of Property</FormLabel>
                <input
                  type="number"
                  id="age_of_property"
                  name="age_of_property"
                  value={formik.values.age_of_property || ""}
                  placeholder="Enter your age of property"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                />
                {formik.touched.age_of_property &&
                formik.errors.age_of_property ? (
                  <div className="text-red-600">
                    {formik.errors.age_of_property}
                  </div>
                ) : null}
              </div>
              <div className="max-[600px]:mb-[12px]">
                <FormLabel htmlFor="type">Property Type</FormLabel>
                <select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  className="w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                >
                  <option value="" disabled>
                    Property Type
                  </option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 max-[600px]:flex max-[600px]:flex-col">
              <div className="">
                <FormLabel htmlFor="age_of_property">
                  House / Villa No
                </FormLabel>
                <input
                  type="number"
                  id="house_no"
                  name="house_no"
                  value={formik.values.house_no}
                  placeholder="Enter your house/villa no"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                />
                {formik.touched.house_no && formik.errors.house_no ? (
                  <div className="text-red-600">{formik.errors.house_no}</div>
                ) : null}
              </div>
              <div className="">
                <FormLabel htmlFor="areaMesurment">
                  Input Area Measurement
                </FormLabel>
                <select
                  id="areaMesurment"
                  name="areaMesurment"
                  value={formik.values.areaMesurment}
                  onChange={formik.handleChange}
                  className="w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                >
                  <option value="" disabled>
                    Input Area Measurement
                  </option>
                  <option value="sqmt">SQMT</option>
                  <option value="yard area">Yard Area</option>
                  <option value="sqft">SQFT</option>
                </select>
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

export default Villa;
