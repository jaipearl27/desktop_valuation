"use client";
import { useEffect, useState } from "react";
import ApiInstance from "@/apiInstance/apiInstance";
import MapComponent from "@/components/MapComponent/MapComponent";
import Loader from '@/components/Common/Loader';
import { useParams } from "next/navigation";
import DownloadPDF from "@/components/DownloadPdf/DownloadPDF";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const formatToIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
};

const LandDetails = () => {
    const { id } = useParams();
    const [isDraggable, setIsDraggable] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState<any>({});
    const [mapUrls, setMapUrls] = useState({ normal: null, satellite: null })

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const response = await ApiInstance.get(`/report/${id}`);
                const DV = formatToIndianCurrency(response?.data?.report?.DV);
                const RV = formatToIndianCurrency(response?.data?.report?.RV);
                const land_value = formatToIndianCurrency(response?.data?.report?.land_value);
                const final_valuation = formatToIndianCurrency(response?.data?.report?.final_valuation);
                const unit_rate_considered_for_land = formatToIndianCurrency(response?.data?.report?.unit_rate_considered_for_land);

                setReportData({...response?.data?.report, DV, RV, land_value , final_valuation, unit_rate_considered_for_land});
                const latitude = response?.data?.report?.latitude;
                const longitude = response?.data?.report?.longitude;
                if (latitude && longitude) {
                    const normalMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x600&maptype=roadmap&key=${process.env.NEXT_PUBLIC_YOUR_API_KEY}&markers=color:red%7C${latitude},${longitude}`;
                    const satelliteMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x600&maptype=satellite&key=${process.env.NEXT_PUBLIC_YOUR_API_KEY}&markers=color:red%7C${latitude},${longitude}`;
                    setMapUrls({ normal: normalMapUrl, satellite: satelliteMapUrl });
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (id) {
            getUserData();
        }
    }, [id])

    const dataFields = [
        { label: "Owner Name", value: reportData?.owner_name },
        { label: "Owner Address", value: reportData?.owner_address },
        { label: "Report Date", value: reportData?.report_date },
        { label: "Case Ref No.", value: reportData?.case_ref_no },
        { label: "Property Address", value: reportData?.property_address },
        { label: "Nearest Landmark", value: reportData?.nearest_landmark },
        { label: "Property Land Area", value: reportData?.property_land_area },
        {
            label: "Built Up Area / Carpet Area / Super Built Up Area",
            value: reportData?.built_up_area_carpet_area_super_built_up_area,
        },
        { label: "Land Value", value: reportData?.land_value },
        { label: "Type Of Property", value: reportData?.type_of_property },
        { label: "Distress Value", value: reportData?.DV },
        { label: "Realizable Value", value: reportData?.RV },
    ];

    return (
        <>
            {loading ? <Loader /> :
                <div className="mt-[40px] py-16">
                    <div className="container pt-8">
                        <div className="mx-4 grid grid-cols-2 max-[700px]:flex max-[700px]:flex-col max-[700px]:mx-0">
                            <div className="w-full px-4 max-[700px]:px-0">
                                <div className="mb-12 text-center">
                                    <div className="w-[100%]">
                                        {reportData?.longitude && reportData?.latitude && (
                                            <MapComponent
                                                initialLatitude={reportData?.latitude}
                                                initialLongitude={reportData?.longitude}
                                                isDraggable={isDraggable}
                                                setIsDraggable={setIsDraggable}
                                                setOpen={setOpen}
                                                mapTypeId="SETELLITE"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 bg-mainColor">
                                    <p className="pb-[12px] pt-[12px] text-center font-serif text-2xl font-semibold text-white">
                                        Confirm Land Details
                                    </p>
                                </div>
                                <div className="h-[80%] bg-gray-200 max-[700px]:p-[8px]">
                                    <div className="pt-15 grid  w-full grid-cols-2 gap-8 pb-10 pl-10 pt-10 text-center max-[700px]:ml-0 max-[700px]:flex max-[700px]:flex-col max-[700px]:pl-0">
                                        <div className="mr-2 text-[16px] font-semibold text-black max-[700px]:text-[20px] max-[400px]:mb-[8px]">
                                            LandArea <p className="text-black">{reportData?.land_area}</p>
                                        </div>
                                        <div className="mr-2 border-l-4 border-green-950 text-[16px] font-semibold text-black max-[700px]:border-l-0 max-[700px]:text-[22px] max-[400px]:mb-[8px]">
                                            SuperBuiltup
                                            <p className="text-black">
                                                {reportData?.built_up_area_carpet_area_super_built_up_area}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-10 w-full  pb-10 pt-10 text-center  max-[700px]:mt-0 max-[700px]:pt-0">
                                        <p className="text-[25px] font-semibold text-slate-600 max-[700px]:text-[14px]">
                                            {reportData?.property_address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-10 mt-10 bg-mainColor text-center">
                                <p className="pb-[15px] pt-[15px] text-center font-serif text-2xl font-semibold text-white max-[700px]:text-[22px]">
                                    Market Value Of The Property
                                </p>
                            </div>
                            <div className="grid grid-cols-2 max-[700px]:flex max-[700px]:flex-col">
                                <div className="w-full overflow-x-auto">
                                    <table className="mx-auto w-full table-auto bg-white">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border px-4 py-2 text-black">Particulars</th>
                                                <th className="border px-4 py-2 text-black">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataFields?.map((item: any, index: number) => (
                                                <tr key={index} className="hover:bg-gray-100">
                                                    <td className="w-[50%] border px-4 py-2 text-black">
                                                        {item.label}
                                                    </td>
                                                    <td className="w-[50%] border px-4 py-2 text-black">
                                                        {item.value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="mx-auto mt-5 flex justify-start">
                        <DownloadPDF reportData={reportData} mapUrls={mapUrls} />
                    </div>
                                </div>
                                <div className="max-[700px]:ml-0 max-[700px]:mt-[24px] max-[700px]:p-[46px] max-[700px]:text-[18px] ml-20 flex flex-col items-center justify-center  rounded-[6px] bg-mainColor text-3xl font-semibold text-black text-white max-[1024px]:text-[24px]">
                                    Final Composite Value Of Unit
                                    <p className="text-5xl max-[700px]:text-[24px] max-[700px]:mt-[6px] max-[1024px]:text-[28px]">₹ {reportData?.final_valuation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default LandDetails;
