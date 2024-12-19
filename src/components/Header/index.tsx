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

const Header = (): any => {
  const { token, setToken, userData , setUserData} = useContext(UserContext);
  const { status } = useSession();

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const router = useRouter();
  const usePathName = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        return
      }
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const logout = async () => {
    setDropdownOpen(false);
    setUserData(null);
    setToken(null)
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    if(status === "authenticated"){
      await signOut({ callbackUrl: "/signin" });
    } else {
     router.push('/signin');
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
        className={`header left-0 top-0 z-40 flex w-full items-center ${sticky
          ? "fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark"
          : "absolute bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${sticky ? "py-5 lg:py-2" : "pt-4"
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
            <div className="flex items-center mr-[12px] gap-[50px]">
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="block lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[22px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[8px] rotate-45" : " "
                    }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[22px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0 " : " "
                    }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[22x  px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                />
              </button>
              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[250px] rounded bg-white py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen
                  ? "visibility top-full opacity-100"
                  : "invisible top-[120%] opacity-0"
                  }`}
              >
                <ul className="block lg:flex lg:space-x-12">
                  {menuData?.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.path && (
                        <Link
                          href={menuItem.path}
                          className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 font-semibold max-[600px]:ml-[16px] ${usePathName === menuItem.path
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
              <div className="relative ml-4 cursor-pointer">
                <div
                  ref={trigger}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-4"
                >
                  <span className="hidden lg:block text-right">
                    <span className="block text-[18px] font-medium text-black dark:text-white">
                      {userData && userData?.name}
                    </span>
                  </span>
                  <Image src={"/images/profile-svg.svg"} height={22} width={22} alt="down" className="cursor-pointer" />
                </div>

                <div
                  ref={dropdown}
                  onFocus={() => setDropdownOpen(true)}
                  onBlur={() => setDropdownOpen(false)}
                  className={`w-[150px] shadow-2xl absolute right-0 mt-4 flex flex-col rounded-sm rounded-[5px] bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen ? "block" : "hidden"
                    }`}
                >
                  <ul className="flex flex-col py-7.5 dark:border-strokedark">
                    {
                      token ?
                        <>
                          <li className="flex px-4 items-center gap-2 pb-[12px] pt-[16px] hover:bg-gray-200" onClick={() => router.push('/profile')}>
                            <CgProfile color="black" fontSize={20} />
                            <span className="text-black font-medium test-[18px]">My Profile</span>
                          </li>
                          <li className="flex px-4 items-center gap-2 pb-[12px] pt-[16px] hover:bg-gray-200" onClick={() => router.push('/history')}>
                            <MdHistory color="black" fontSize={20} />
                            <span className="text-black font-medium test-[18px]">History</span>
                          </li>
                          <li className="flex px-4 items-center gap-2 pb-[12px] pt-[16px] hover:bg-gray-200" onClick={logout}>
                            <RiLogoutCircleLine color="black" fontSize={20} />
                            <span className="text-black font-medium test-[18px]">Logout</span>
                          </li>
                        </> :
                        <>
                          <li className="flex px-4 items-center gap-2 pb-[12px] pt-[16px] hover:bg-gray-200" onClick={() => router.push('/signin')}>
                            <AiOutlineLogin color="black" fontSize={20} />
                            <span className="text-black font-medium test-[18px]"> Login</span>
                          </li>
                          <li className="flex px-4 items-center gap-2 pb-[12px] pt-[16px] hover:bg-gray-200" onClick={() => router.push('/signup')}>
                            {/* <Image src={"/images/signup.png"} height={20} width={20} alt="signup" /> */}
                            <span className="text-black font-medium test-[18px]">Sign Up</span>
                          </li>
                        </>
                    }
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
