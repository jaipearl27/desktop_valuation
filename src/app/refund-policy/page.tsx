import Breadcrumb from "@/components/Common/Breadcrumb";
import RefundPolicy from "@/components/RefundPolicy";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "A refund policy describes the circumstances under which clients are eligible to get a refund for goods or services they have paid for. It describes the requirements for eligibility, when refund requests must be made, and how to return goods or terminate services.",
};

const RefundPolicyPage = () => {
  return (
    <>
        <Breadcrumb
            pageName="Refund Policy"
            title="Refund Policy"
            description="A refund policy describes the circumstances under which clients are eligible to get a refund for goods or services they have paid for. It describes the requirements for eligibility, when refund requests must be made, and how to return goods or terminate services."
        />
        <RefundPolicy />
    </>
  );
};

export default RefundPolicyPage;
