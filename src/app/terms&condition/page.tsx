import Breadcrumb from "@/components/Common/Breadcrumb";
import TermsCondition from "@/components/Terms&Condition";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Condition for Desktop Valuation Services",
  description: "Terms and Conditions outline the rules and guidelines users must agree to in order to use a product, service, or website. They define the rights, responsibilities, and obligations of both the user and the provider, covering areas such as privacy, liability, and acceptable use of the service.",
};

const TermsConditionPage = () => {
  return (
    <>
        <Breadcrumb
            pageName="Terms & Condition"
            title="Terms & Condition for Desktop Valuation Services"
            description="Terms and Conditions outline the rules and guidelines users must agree to in order to use a product, service, or website. They define the rights, responsibilities, and obligations of both the user and the provider, covering areas such as privacy, liability, and acceptable use of the service."
        />
        <TermsCondition />
    </>
  );
};

export default TermsConditionPage;
