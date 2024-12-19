import React from 'react'

const PaymentModal = ({ open, setOpen, onConfirm }) => {


    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        globalThis?.window?.localStorage.setItem("paymentRedirect", "true");
        onConfirm()
    };

    return (
        open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 w-full max-w-lg mx-3">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-4 text-black">Access To Price Correction Risk</h2>
                        <p className='text-gray-700 text-sm'>Market dynamics and to download report is only with premium subscription Kindly upgrade to premium membership to access all.</p>
                        <div className="flex justify-end gap-x-2 mt-6">
                            <button
                                onClick={handleClose}
                                type="button"
                                className="px-8 py-3 text-base font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                            >
                                Cancle
                            </button>
                            <button
                                onClick={handleConfirm}
                                type="button"
                                className="ease-in-up bg-mainColor hidden rounded-[7px] px-8 py-3 text-base font-medium text-xl font-serif font-bold text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:block md:px-10 lg:px-10 xl:px-10 mr-3"
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    )
}

export default PaymentModal
