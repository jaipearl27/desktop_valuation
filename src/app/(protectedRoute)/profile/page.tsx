"use client"
import ApiInstance from '@/apiInstance/apiInstance';
import Loader from '@/components/Common/Loader';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const getUserId = () => {
        const token = globalThis?.window?.localStorage.getItem("token")!;
        const decoded: any = jwtDecode(token);
        getUserDetail(decoded);
    };

    useEffect(() => {
        getUserId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserDetail = async (decoded: { id: string; }) => {
        setLoading(true);
        try {
            const response = await ApiInstance.get("/user/" + decoded?.id);
            setUserData(response?.data?.user);
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    const subscriptionExpireDate = userData?.subscriptions_expire 
    ? new Date(userData.subscriptions_expire).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',  // You can change this to 'numeric' or 'short' for different formats
        day: 'numeric'
    })
    : 'N/A';

    return (
        <div className='container relative z-10 overflow-hidden pt-28 lg:pt-[150px]'>
            {loading ? <Loader /> :
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 bg-gray-100 rounded-lg shadow-md">
                    <div className="flex flex-col justify-center mt-14">
                        <div className="flex items-center mb-6">
                            <h3 className="text-gray-800 text-lg font-semibold mr-4 font-serif">Email:</h3>
                            <p className="text-gray-600">{userData?.email}</p>
                        </div>
                        <div className="flex items-center mb-6">
                            <h3 className="text-gray-800 text-lg font-semibold mr-4 font-serif">Mobile No:</h3>
                            <p className="text-gray-600">{userData?.phone}</p>
                        </div>
                        <div className="flex items-center mb-6">
                            <h3 className="text-gray-800 text-lg font-semibold mr-4 font-serif">Name:</h3>
                            <p className="text-gray-600">{userData?.name}</p>
                        </div>
                        {
                            userData?.subscriptions_id?.plan_name ?
                            <>
                                <div className="flex items-center mb-6">
                                    <h3 className="text-gray-800 text-lg font-semibold mr-4 font-serif">Plan Name:</h3>
                                    <p className="text-gray-600">{userData?.subscriptions_id?.plan_name}</p>
                                </div>
                                
                                <div className="flex items-center mb-6">
                                    <h3 className="text-gray-800 text-lg font-semibold mr-4 font-serif">Remaining Report:</h3>
                                    <p className="text-gray-600">{userData?.no_of_report}/{userData?.subscriptions_id?.no_of_report} </p>
                                </div>
                                <div className="flex items-center mb-6">
                                    <h3 className="text-gray-800 text-lg font-semibold mr-4 font-serif">Your Subscription Expire:</h3>
                                    <p className="text-gray-600">{subscriptionExpireDate}</p>
                                </div> 
                            </> : " "
                        }
                    </div>
                    {
                        userData?.subscriptions_id ?
                            <div className="flex flex-col items-center justify-center p-6">
                                <h2 className="text-2xl font-bold mb-5 text-black font-serif max-[400px]:text-[20px]">Your Plan Memo</h2>
                                <div className="flex flex-col items-center bg-[#c9d79f] p-6 rounded-3xl">
                                    <h3 className="text-lg font-bold uppercase mb-4">{userData?.subscriptions_id?.plan_name}</h3>
                                    <div className="flex items-baseline mb-4">
                                        <span className="text-5xl font-extrabold mr-2 max-sm:text-[40px]">₹{userData?.subscriptions_id?.final_price}</span>
                                        <span className="text-gray-600 text-lg font-bold">/month</span>
                                    </div>
                                </div>
                            </div> : ""
                    }
                </div>}
        </div>
    );
};

export default Profile;
