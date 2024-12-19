import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | Get Help from Our Expert Team",
  description: "Need assistance? Our dedicated support team is here to help. Submit your request, and we'll respond promptly via email to ensure you get the support you need.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact page"
        title="We're Here to Help!"
        description="If you need assistance, our support team is ready to assist you. Submit your request, and we’ll get back to you as soon as possible via email."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
