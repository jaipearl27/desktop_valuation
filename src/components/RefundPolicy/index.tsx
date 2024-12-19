import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="max-w-3xl md:mx-auto p-6 bg-white shadow-md rounded-lg m-5 mx-5">
            <p className="mb-4 text-body-color">
                At <strong>EARTH ENGINEERS</strong> (Desktop Valuation), we are committed to delivering accurate, reliable, and timely real estate
                valuation services using our automated valuation model (AVM). While we strive to offer high-quality
                service, certain situations may warrant a refund request. Our refund policy is designed to be clear
                and fair while taking into account the nature of AVM-based estimations.
            </p>
           
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-body-color">1. Eligibility for Refunds</h2>
            <p className="mb-4 text-body-color">Refunds will be provided under the following conditions:</p>
            <ul className="list-disc list-inside mb-4  text-body-color">
                <li>If the service was not initiated or delivered within the promised time frame due to internal delays.</li>
                <li>If there was a technical error during the valuation process, resulting in the non-delivery of the report.</li>
                <li>If a cancellation request is made before the valuation process begins.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-body-color">2. Non-Refundable Circumstances</h2>
            <p className="mb-4 text-body-color">Due to the nature of AVM-based valuations, refunds will not be provided in the following cases:</p>
            <ul className="list-disc list-inside mb-4 text-body-color">
                <li>
                    Dissatisfaction with the estimated value provided in the report. Our AVM system uses
                    comprehensive data and sophisticated algorithms to generate the most accurate and
                    objective estimation, and therefore, no refunds can be made on the value itself.
                </li>
                <li>Once the valuation process has been initiated and services have been delivered.</li>
                <li>If incomplete or inaccurate information is provided by the client that affects the valuation.</li>
                <li>Any delays or disruptions caused by factors beyond our control, such as third-party interventions or regulatory approvals.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-body-color">3. Refund Request Process</h2>
            <ul className="list-disc list-inside mb-4 text-body-color">
                <li>To request a refund, please contact our support team at <strong>+91-9687557070</strong> or email us at{" "}  
                    <a href="mailto:contactus@desktopvaluation.in" className="text-body-color-600 hover:underline">
                    <strong>contactus@desktopvaluation.in</strong>
                    </a> within 7 days of placing the order.</li>
                <li>Once we receive your request, we will review it and notify you of the decision regarding your refund.</li>
                <li>If approved, refunds will be processed within 7-10 business days and will be credited back to your original payment method.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-body-color">4. Changes to This Policy</h2>
            <p className="mb-4 text-body-color">
                Desktop Valuation reserves the right to update or modify this refund policy at any time. Any changes will be reflected on this page and will take effect immediately upon posting.
            </p>

            <p className="mb-4 text-body-color">
                If you have any questions or need further clarification regarding our refund policy, please contact us at <strong>+91-9687557070</strong> or{" "} 
                <a href="mailto:contactus@desktopvaluation.in" className="text-body-color-600 hover:underline">
                    <strong>contactus@desktopvaluation.in</strong>
                </a>
            </p>
        </div>
    );
}

export default RefundPolicy;
