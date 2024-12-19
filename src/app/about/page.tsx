import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Earth engineers",
  description: "We aim to provide accurate valuations of property to banks, brokers and developers using our market research and algorithms by one of us our service of desktop Valuation.",
  // other metadata
};

const About = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        title="Our Journey, Mission, and Values"
        description="Earth engineers, founded in 2020, is a Gov. approved valuation firm. We offer services such as land & Building, Plant, Machinery & Equipment’s etc.  We aim to provide accurate valuations of property to banks, brokers and developers using our market research and algorithms by one of us our service of desktop Valuation."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default About;
