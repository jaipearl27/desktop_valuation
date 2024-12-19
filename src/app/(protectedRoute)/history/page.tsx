"use client"
import ApiInstance from '@/apiInstance/apiInstance';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Loader from '@/components/Common/Loader';
import Pagination from '@/components/Common/Pagination';

const TableCell = ({ content, isCenter }) => (
    <td className={`border-b border-[#eee] px-2 py-3 sm:px-4 sm:py-5 dark:border-strokedark ${isCenter ? "text-center" : ""}`}>
        <h5 className="text-xs sm:text-sm font-medium text-black dark:text-white">
            {content}
        </h5>
    </td>
);

interface JwtTypes {
    id: string;
}

const History = () => {
    const dataLimit = 5;
    const router = useRouter();
    const [users, setUserData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        const getUserId = async () => {
            const token = globalThis?.window?.localStorage.getItem("token");
            if (token) {
                const decoded = jwtDecode<JwtTypes>(token);
                getUserDetail(decoded.id);
            }
        };
        getUserId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip]);

    const getUserDetail = async (id: string) => {
        setLoading(true);
        try {
            const response = await ApiInstance.get(`/report/byUser/${id}?limit=${dataLimit}&skip=${skip}`);
            const usersData = response?.data?.report?.map((user: any) => ({
                _id: user?._id,
                type_of_property: user?.type_of_property,
                dataFields: {
                    'Address': user?.property_address,
                    'Property Type': user?.type_of_property,
                    'Carpet Area': user?.carpet_area ? user.carpet_area : "-",
                    'Super BuiltUp Area': user?.super_built_up_area ? user.super_built_up_area : "-",
                    'Price': user?.final_valuation,
                    'Date': user?.report_date,
                    'Action': 'View'
                }
            }));
            setUserData(usersData);
            setTotalCount(response.data.total);
            if (usersData.length > 0) {
                setHeaders(Object.keys(usersData[0].dataFields));
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    const viewPage = (id: string, type_of_property: any) => {
        if (type_of_property === "Apartment") {
            router.push(`/apartment-details/${id}`);
        } else if (type_of_property === "Commercial") {
            router.push(`/commercial-details/${id}`);
        } else if (type_of_property === "Villa" || "Independent") {
            router.push(`/villa-details/${id}`);
        } else if (type_of_property === "Land") {
            router.push(`/land-details/${id}`);
        }
    };

    return (
        <div className="container relative z-10 overflow-hidden pt-28 lg:pt-[150px]">
            {loading ? <Loader /> :
                <div className="relative overflow-x-auto">
                    <div className="rounded-sm px-2 pb-2 sm:px-5 sm:pb-2.5 pt-6 max-[700px]:w-[360px]">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-slate-100 text-left dark:bg-meta-4">
                                    {headers.map((item, index) => (
                                        <th className="px-2 py-3 text-xs sm:px-4 sm:py-4 sm:text-sm font-medium text-black" key={index}>
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        {headers.map((header, fieldIndex) => (
                                            <TableCell key={fieldIndex} content={header === 'Action' ? (
                                                <button
                                                    className="hover:text-primary bg-zinc-300 p-1 rounded-[15px]"
                                                    onClick={() => viewPage(user?._id, user?.type_of_property)}
                                                >
                                                    <Image src="./images/view.svg" alt="View" height={20} width={20} />
                                                </button>
                                            ) : user.dataFields[header]} 
                                                isCenter={header === "Carpet Area" || header === "Super BuiltUp Area"}
                                            />
                                        ))}
                                    </tr>
                                ))}
                            </tbody>    
                        </table>
                        {totalCount > dataLimit && (
                            <Pagination
                                totalCount={totalCount}
                                dataLimit={dataLimit}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                afterPageChange={() => { }}
                                setSkip={setSkip}
                                skip={skip}
                            />
                        )}
                    </div>
                </div>
            }
        </div>
    );
};

export default History;

