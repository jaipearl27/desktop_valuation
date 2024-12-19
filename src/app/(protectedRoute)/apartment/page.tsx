"use client";
import { FormLabel } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ApiInstance from "@/apiInstance/apiInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Loader from "@/components/Common/Loader";
import * as yup from "yup";
import { UserContext } from "@/context/UserContext";
import SubscriptionModal from "@/components/SubscriptionModal/SubscriptionModal";

const Apartment: React.FC = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { userData } = useContext(UserContext);
  const [area, setArea] = useState<number>();
  const [selectArea, setSelectArea] = useState<string>("Carpet");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingSubmitValues, setPendingSubmitValues] = useState(null);

  const validationSchema = yup.object({
    unit_size: yup
      .number()
      .required("Unit Size is required")
      .min(0, "Unit Size must be a positive number"),
    areaMesurment: yup.string().required("Area Measurement is required"),
    age_of_property: yup
      .number()
      .required("Age of Property is required")
      .min(0, "Age of Property must be a positive number"),
    no_of_floor: yup
      .number()
      .required("Number of Floors is required")
      .min(0, "Number of Floors must be a positive number"),
    floor_of_unit: yup
      .number()
      .required("Floor of Unit is required")
      .min(0, "Floor of Unit must be a positive number"),
    flat_no: yup
      .number()
      .required("Flat Number is required")
      .min(0, "Flat Number must be a positive number"),
    address: yup.string().required("Address is required"),
    owner: yup.string().required("Owner is required"),
  });

  const formik = useFormik({
    initialValues: {
      unit_size: 0,
      areaMesurment: "",
      age_of_property: 0,
      loading: 35,
      no_of_floor: 0,
      floor_of_unit: 0,
      flat_no: 0,
      address: "",
      owner: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isNaN(values.unit_size) || isNaN(values.age_of_property)) {
        toast.error("Unit Size and Property of Age must be numeric");
        return;
      }
      if (
        parseInt(values.unit_size.toString()) < 0 ||
        parseInt(values.age_of_property.toString()) < 0
      ) {
        toast.error("Invalid Data");
        return;
      }
      if (!values.areaMesurment) {
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
      const data = {
        // carpet_area: checkAreaOfMeasurement(
        //   selectArea === "Carpet" ? values.unit_size : area,
        // ),

        // super_built_up_area: checkAreaOfMeasurement(
        //   selectArea === "Super Built-Up" ? values.unit_size : area,
        // ),
        carpet_area: selectArea === "Carpet" ? checkAreaOfMeasurement(values.unit_size): area,
        super_built_up_area: selectArea === "Carpet" ? area : checkAreaOfMeasurement(values.unit_size),
        type_of_property: "Apartment",
        no_of_floor: parseInt(values.no_of_floor.toString()),
        floor_of_unit: parseInt(values.floor_of_unit.toString()),
        flat_no: parseInt(values.flat_no.toString()),
        loading: values.loading,
        age_of_property: parseInt(values.age_of_property.toString()),
        latitude: parseFloat(
          globalThis?.window?.localStorage.getItem("latitude"),
        ),
        longitude: parseFloat(
          globalThis?.window?.localStorage.getItem("longitude"),
        ),
        distance: parseFloat(
          globalThis?.window?.localStorage.getItem("distance"),
        ),
        address: globalThis?.window?.localStorage.getItem("fullAddress"),
        user_id: userData?._id,
        owner_address: values.address,
        owner_name: values.owner,
      };

      const res = await ApiInstance.post("/report/nearestLocationReport", data);
      if (res.data?.report_id) {
        toast.success(res?.data?.message);
        localStorage.removeItem("propertyType");
        router.push(`/apartment-details/${res?.data?.report_id}`);
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

  const checkAreaOfMeasurement = (data: number): number => {
    if (formik.values.areaMesurment === "sqmt") {
      return parseInt((parseInt(data.toString()) * 10.76391042).toString());
    } else if (formik.values.areaMesurment === "yard area") {
      return parseInt((parseInt(data.toString()) * 9).toString());
    } else {
      return parseInt(data.toString());
    }
  };

  useEffect(() => {
    const establishYear = formik.values.age_of_property;
    if (establishYear < 3) {
      formik.setFieldValue("loading", 45);
    } else if (establishYear >= 3 && establishYear < 8) {
      formik.setFieldValue("loading", 40);
    } else if (establishYear >= 8 && establishYear < 12) {
      formik.setFieldValue("loading", 35);
    } else if (establishYear >= 12) {
      formik.setFieldValue("loading", 30);
    } else {
      formik.setFieldValue("loading", 35);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.age_of_property]);

  useEffect(() => {
    const unitsize = formik.values.unit_size;
    const result =
      checkAreaOfMeasurement(unitsize) * (formik.values.loading / 100);
    if (selectArea === "Carpet") {
      // When Carpet is selected
      setArea(
        Math.floor(
          checkAreaOfMeasurement(unitsize) /
            ((100 - formik.values.loading) / 100),
        ),
      );
    } else {
      // When Super Built-Up is selected
      setArea(Math.floor(checkAreaOfMeasurement(unitsize) - result));
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.unit_size,
    formik.values.loading,
    selectArea,
    formik.values.areaMesurment,
  ]);

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
          <h2>Apartment</h2>
        </div>
        <div className="p-8 pb-8 pt-8 shadow-2xl">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="mt-4 grid grid-cols-2 gap-4 max-[600px]:flex max-[600px]:flex-col">
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
            <div className="mt-4 grid grid-cols-2 gap-4 max-[600px]:mb-2 max-[600px]:flex max-[600px]:flex-col">
              <div className="max-[600px]:mb-[10px]">
                <FormLabel htmlFor="selectArea">Select Type Of Area</FormLabel>
                <select
                  id="selectArea"
                  name="selectArea"
                  value={selectArea}
                  onChange={(e) => setSelectArea(e.target.value)}
                  className="w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                >
                  <option value="" disabled>
                    Select Type Of Area
                  </option>
                  <option value="Carpet">Carpet</option>
                  <option value="Super Built-Up">Super Built-Up</option>
                </select>
              </div>
              <div className="max-[600px]:mb-[10px]">
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
                {formik.touched.areaMesurment && formik.errors.areaMesurment ? (
                  <div className="text-red-600">
                    {formik.errors.areaMesurment}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 max-[600px]:flex max-[600px]:flex-col">
              <div className="">
                <FormLabel htmlFor="carpet_area">Unit Size</FormLabel>
                <input
                  type="number"
                  ref={inputRef}
                  id="unit_size"
                  name="unit_size"
                  value={formik.values.unit_size || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                  placeholder="Enter your unit size"
                />
                {formik.touched.unit_size && formik.errors.unit_size ? (
                  <div className="text-red-600">{formik.errors.unit_size}</div>
                ) : null}
              </div>
              <div className="">
                <FormLabel htmlFor="select_area">
                  {selectArea === "Carpet"
                    ? "Super Built-Up (Square feet)"
                    : "Carpet (Square feet)"}
                </FormLabel>
                <input
                  disabled
                  type="number"
                  id="select_area"
                  name="select_area"
                  value={area}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                  placeholder={
                    selectArea === "Carpet"
                      ? "Super Built-Up (Square feet)"
                      : "Carpet (Square feet)"
                  }
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 max-[600px]:flex max-[600px]:flex-col">
              <div className="">
                <FormLabel htmlFor="carpet_area">Total No. Of Floors</FormLabel>
                <input
                  type="number"
                  id="no_of_floor"
                  name="no_of_floor"
                  value={formik.values.no_of_floor || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                  placeholder="Enter your no of floor"
                />
                {formik.touched.no_of_floor && formik.errors.no_of_floor ? (
                  <div className="text-red-600">
                    {formik.errors.no_of_floor}
                  </div>
                ) : null}
              </div>
              <div className="">
                <FormLabel htmlFor="select_area">Floor Of The Unit</FormLabel>
                <input
                  type="number"
                  id="floor_of_unit"
                  name="floor_of_unit"
                  value={formik.values.floor_of_unit || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                  placeholder="Enter your floor of the unit"
                />
                {formik.touched.floor_of_unit && formik.errors.floor_of_unit ? (
                  <div className="text-red-600">
                    {formik.errors.floor_of_unit}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 max-[600px]:mb-2 max-[600px]:flex max-[600px]:flex-col">
              <div className="">
                <FormLabel htmlFor="loading">Flat No</FormLabel>
                <input
                  type="number"
                  id="flat_no"
                  name="flat_no"
                  value={formik.values.flat_no || ""}
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                  placeholder="Enter your flat no"
                />
                {formik.touched.flat_no && formik.errors.flat_no ? (
                  <div className="text-red-600">{formik.errors.flat_no}</div>
                ) : null}
              </div>
              <div className="">
                <FormLabel htmlFor="loading">Loading</FormLabel>
                <input
                  type="number"
                  id="loading"
                  name="loading"
                  value={formik.values.loading}
                  ref={inputRef}
                  onChange={formik.handleChange}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                  placeholder="Loading..."
                  disabled
                />
              </div>
              <div className="">
                <FormLabel htmlFor="age_of_property">Age Of Property</FormLabel>
                <input
                  type="number"
                  id="age_of_property"
                  name="age_of_property"
                  value={formik.values.age_of_property || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="no-spinner w-full rounded-none border-b border-gray-300 bg-white p-4 text-gray-800 placeholder-gray-600 focus:outline-none"
                  placeholder="Enter your age of property"
                />
                {formik.touched.age_of_property &&
                formik.errors.age_of_property ? (
                  <div className="text-red-600">
                    {formik.errors.age_of_property}
                  </div>
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

export default Apartment;
