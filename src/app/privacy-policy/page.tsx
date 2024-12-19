import Breadcrumb from "@/components/Common/Breadcrumb";
import PrivacyPolicy from "@/components/PrivacyPolicy";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "A website or app's privacy policy describes how it gathers, utilizes, and safeguards users' personal data. It describes the kinds of data that are gathered, why they are gathered, and how users' privacy is protected. This document guarantees openness and adherence to legal requirements.",
};

const PrivacyPolicyPage = () => {
  return (
    <>
        <Breadcrumb
            pageName="Privacy Policy"
            title="Privacy Policy"
            description="A website or app's privacy policy describes how it gathers, utilizes, and safeguards users' personal data. It describes the kinds of data that are gathered, why they are gathered, and how users' privacy is protected. This document guarantees openness and adherence to legal requirements."
        />
        <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;
