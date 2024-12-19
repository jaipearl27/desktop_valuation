import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";

import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Support | Get Help from Our Expert Team",
//   description: "Need assistance? Our dedicated support team is here to help. Submit your request, and we'll respond promptly via email to ensure you get the support you need.",
// };

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Pricing page"
        title=""
        description=""
      />

      <Pricing />
    </>
  );
};

export default ContactPage;
