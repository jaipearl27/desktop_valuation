"use client";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocationOn, MdOutlineMail, MdOutlinePermPhoneMsg } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import CircleShape from "Utills/Icons/Circle";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white pt-16 md:pt-20 lg:pt-24">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-8 max-w-[360px] lg:mb-12">
                <Link href="/" className="mb-6 inline-block">
                  <Image
                    src="/images/logo/desktopValuation.svg"
                    alt="logo"
                    width={70}
                    height={100}
                  />

                </Link>
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  We offer services such as land & Building. We aim to provide accurate valuations of property to banks, brokers and developers using our market research and algorithms by another service of desktop Valuation.
                </p>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black">
                  Useful Links
                </h2>
                <ul>
                  <li>
                    <Link
                      href="/pricing"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Support
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      href="/about"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      About
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black">Terms</h2>
                <ul>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/refund-policy"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms&condition"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="text-blac mb-10 text-xl font-bold text-black">
                  Contact Us
                </h2>
                <ul>
                  {/* <li className="mb-4 flex items-start gap-2 text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary">
                    <IoLocationOutline fontSize={50} />
                    Office No. 404, 4th Floor, Mahek Icon, Sumul Dairy Road, katargam, Surat – 395006
                  </li> */}
                  <li className="mb-4 flex items-start gap-2 text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary">
                    <MdOutlinePermPhoneMsg fontSize={22} />
                      +91-9687557070
                  </li>
                  <li className="mb-4 flex items-center gap-2 text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary">
                    <MdOutlineMail fontSize={22} />
                    contactus@desktopvaluation.in
                  </li>
                  <li className="mb-4 flex items-start gap-3 text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary">
                    <MdLocationOn fontSize={45} />
                    Office no 703, Silver trade Center, Mota Varachha, Surat, Gujarat - 394105
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div className="pb-3 flex justify-between">
            <div className="flex items-center">
              <a
                href="https://www.instagram.com/desktop_valuation/"
                aria-label="social-link"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                <AiFillInstagram fontSize={26} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61566856053236"
                aria-label="social-link"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                <FaFacebook fontSize={22} />
              </a>
              {/* <a
                href="/"
                aria-label="social-link"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                <FaSquareXTwitter fontSize={22} />
              </a>
              <a
                href="/"
                aria-label="social-link"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                <FaYoutube fontSize={22} />
              </a> */}
              <a
                href="https://www.linkedin.com/in/desktop-valuation-b148b233a/recent-activity/all/"
                aria-label="social-link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                <FaLinkedin fontSize={22} />
              </a>
            </div>
            <div className="text-black">
              {/* <Link href={"https://earthengineers.in/"} className="text-mainColor hover:underline" target="_blank"> Earth engineers</Link>, */}
              {/* Founded in 2020 is a Gov. approved valuation firm. */}
            </div>
          </div>
        </div>
        <div className="absolute bottom-24 left-0 z-[-1]">
          <CircleShape />
        </div>
        <div className="flex items-center justify-center text-black mb-4">
            <p>Copyright Ⓒ 2024 <strong>Desktop Valuation</strong>. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
