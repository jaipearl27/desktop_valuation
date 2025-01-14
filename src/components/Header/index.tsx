"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import menuData from "./menuData";
import { UserContext } from "@/context/UserContext";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";
import Dropdown from "./Dropdown"

const Header = (): any => {
  const { token, setToken, userData, setUserData } = useContext(UserContext);
  const { status } = useSession();

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const customTrigger = useRef<any>(null);

  const customDropdown = useRef<any>(null);

  const router = useRouter();
  const usePathName = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customDropdownOpen, setCustomDropdownOpen] = useState(false);

  const [showMobDropdown, setShowMobDropdown] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, [token]);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      setDropdownOpen(false);
    };

    const customClickHandler = ({ target }: MouseEvent) => {
      if (!customDropdown.current) return;
      if (
        !customDropdown ||
        customDropdown.current.contains(target) ||
        customTrigger.current.contains(target)
      ) {
        return;
      }
      setCustomDropdownOpen(false);
    };

    document.addEventListener("click", customClickHandler);
    return () => document.removeEventListener("click", customClickHandler);
  }, []);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const logout = async () => {
    setDropdownOpen(false);
    setUserData(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    if (status === "authenticated") {
      await signOut({ callbackUrl: "/signin" });
    } else {
      router.push("/signin");
    }
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${
                sticky ? "py-5 lg:py-2" : "pt-4"
              } `}
            >
              <Image
                src="/images/logo/desktopValuation.svg"
                alt="logo"
                width={70}
                height={100}
              />
            </Link>
          </div>
          <div className="mr-[12px] flex items-center gap-[50px]">
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="block lg:hidden"
            >
              <span
                className={`dark:bg-white relative my-1.5 block h-0.5 w-[22px] bg-black transition-all duration-300 ${
                  navbarOpen ? " top-[8px] rotate-45" : " "
                }`}
              />
              <span
                className={`dark:bg-white relative my-1.5 block h-0.5 w-[22px] bg-black transition-all duration-300 ${
                  navbarOpen ? "opacity-0 " : " "
                }`}
              />
              <span
                className={`w-[22x px] dark:bg-white relative my-1.5  block h-0.5 bg-black transition-all duration-300 ${
                  navbarOpen ? " top-[-8px] -rotate-45" : " "
                }`}
              />
            </button>
            <nav
              id="navbarCollapse"
              className={`navbar dark:border-body-color/20 dark:bg-dark absolute right-0 z-30 w-[250px] rounded bg-white py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                navbarOpen
                  ? "visibility top-full opacity-100"
                  : "invisible top-[120%] opacity-0"
              }`}
            >
              <ul className="block lg:flex lg:space-x-12">
                {menuData?.map((menuItem, index) => (
                  <li key={index} className="group relative">
                    {menuItem?.dropdown ? (
                      <Dropdown  data={menuItem} setShowMobDropdown={setShowMobDropdown} />
                    ) : (
                      <Link
                        href={menuItem.path}
                        className={`flex py-2 text-base font-semibold max-[600px]:ml-[16px] lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                          usePathName === menuItem.path
                            ? "text-mainColor"
                            : "text-black hover:text-mainColor"
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* profile dropdown */}
            <div className="relative ml-4 cursor-pointer">
              <div
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
              >
                <span className="hidden text-right lg:block">
                  <span className="dark:text-white block text-[18px] font-medium text-black">
                    {userData && userData?.name}
                  </span>
                </span>
                <Image
                  src={"/images/profile-svg.svg"}
                  height={22}
                  width={22}
                  alt="down"
                  className="cursor-pointer"
                />
              </div>

              <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`shadow-default dark:border-strokedark dark:bg-boxdark absolute right-0 mt-4 flex w-[150px] flex-col rounded-sm bg-white shadow-2xl ${
                  dropdownOpen ? "block" : "hidden"
                }`}
              >
                <ul className="py-7.5 dark:border-strokedark flex flex-col">
                  {token ? (
                    <>
                      <li
                        className="flex items-center gap-2 px-4 pb-[12px] pt-[16px] hover:bg-gray-200"
                        onClick={() => router.push("/profile")}
                      >
                        <CgProfile color="black" fontSize={20} />
                        <span className="test-[18px] font-medium text-black">
                          My Profile
                        </span>
                      </li>
                      <li
                        className="flex items-center gap-2 px-4 pb-[12px] pt-[16px] hover:bg-gray-200"
                        onClick={() => router.push("/history")}
                      >
                        <MdHistory color="black" fontSize={20} />
                        <span className="test-[18px] font-medium text-black">
                          History
                        </span>
                      </li>
                      <li
                        className="flex items-center gap-2 px-4 pb-[12px] pt-[16px] hover:bg-gray-200"
                        onClick={logout}
                      >
                        <RiLogoutCircleLine color="black" fontSize={20} />
                        <span className="test-[18px] font-medium text-black">
                          Logout
                        </span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className="flex items-center gap-2 px-4 pb-[12px] pt-[16px] hover:bg-gray-200"
                        onClick={() => router.push("/signin")}
                      >
                        <AiOutlineLogin color="black" fontSize={20} />
                        <span className="test-[18px] font-medium text-black">
                          {" "}
                          Login
                        </span>
                      </li>
                      <li
                        className="flex items-center gap-2 px-4 pb-[12px] pt-[16px] hover:bg-gray-200"
                        onClick={() => router.push("/signup")}
                      >
                        {/* <Image src={"/images/signup.png"} height={20} width={20} alt="signup" /> */}
                        <span className="test-[18px] font-medium text-black">
                          Sign Up
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
