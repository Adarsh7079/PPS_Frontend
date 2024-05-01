import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import Button from "../Button";
import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import Footer from "../Footer";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [open, setOpne] = useState(false);
  return (
    <nav className=" ">
      <div className="  bg-[#034a68] fixed top-0 w-full z-50">
        <div className="flex items-center font-medium  justify-between mx-10">
          <div className=" z-50 p-1 md:w-auto  w-full flex justify-between ">
            <img
              src="https://indianpsychiatricsociety.org/wp-content/uploads/2019/11/IPS-Logo-Full-Trans-200.png"
              alt=""
              className="md:w-[200px] hidden md:flex h-[100px] md:cursor-pointer"
            />
          </div>
          <div>
            <div className="hidden md:flex text-[12px] text-gray-300  justify-end pb-4 gap-3 -mt-1">
              <Link to="" className=" border-e-2 px-3 border-gray-400">
                Contact Us
              </Link>
              <Link>Registration Form</Link>
            </div>
            <div>
              {" "}
              <ul className=" md:flex hidden uppercase items-center md:gap-8 text-gray-300 text-sm mt-3">
                <NavLinks />
                <div>
                  <button className=" bg-[#a3ad40] p-[5px] rounded-sm px-2 text-gray-100 uppercase">
                    Update Details
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#034a68] fixed top-0 w-full z-50">
        <div className="w-full flex justify-end">
          {open ? (
            <div
              onClick={() => setOpne(!open)}
              className=" text-2xl font-bold md:hidden   bg-red-200 h-[40px] flex justify-center items-center p-3 py-10  "
            >
              {" "}
              &#10060;
            </div>
          ) : (
            <div
              onClick={() => setOpne(!open)}
              className=" text-5xl font-bold md:hidden   bg-[#3587aa] h-[40px] flex justify-center items-center p-3 py-10  "
            >
              {" "}
              &#8801;
            </div>
          )}
        </div>
        {/* Mobile view  */}
        <div
          className={`md:hidden  bg-white  w-[70%] h-full bottom-0 duration-500 ${
            open
              ? "fixed left-0 top-0 h-auto z-100 translate-x-0"
              : "left-[-100%]"
          }`}
        >
          {open && (
            <div>
              <div className="w-full flex py-5 ">
                <img
                  src="https://indianpsychiatricsociety.org/wp-content/uploads/2020/08/IPS-Logo-Dark2.png"
                  alt=""
                  className="md:w-[200px] block md:hidden h-[100px] md:cursor-pointer"
                />
              </div>
              <div className="">
                {/* NavBar Mobile */}
                <MobileNav />
              </div>
              <div>
                <button className=" bg-blue-400 h-[50px] rounded-md text-white w-[200px] uppercase hover:bg-gray-300">
                  update details
                </button>
              </div>
              <div className=" flex gap-2 mx-auto mt-3">
                <div className=" rounded-full bg-blue-300 hover:bg-blue-600 p-2 flex justify-center items-center">
                  {" "}
                  <TiSocialFacebook className=" text-white text-3xl font-bold" />
                </div>
                <div className=" rounded-full bg-blue-300 hover:bg-blue-600 p-3 flex justify-center items-center">
                  {" "}
                  <SlSocialInstagram className=" text-white text-xl font-bold flex" />
                </div>
                <div className=" rounded-full bg-blue-300 hover:bg-blue-600 p-3 flex justify-center items-center">
                  {" "}
                  <FaXTwitter className=" text-white text-2xl font-bold" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
