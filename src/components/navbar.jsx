import React from "react";
import logo from "../assets/whitelogo.svg"; // Adjust the path to where your logo is located

const Navbar = () => {
  return (
    <div className="!text-[16px]  !text-white z-50 px-28  sticky top-0 left-0 w-full">
      <nav className="flex justify-between  items-center ">
        {/* Logo on the left */}
        <div>
          <a href="/">
            <img width={150} src={logo} alt="Your Logo" className="h-8" />
          </a>
        </div>

        {/* Links aligned to the left and responsive */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:underline">
            _ING
          </a>
          <a href="#" className="hover:underline">
            Solutions
          </a>
          <a href="#" className="hover:underline">
            Method
          </a>
          <a href="#" className="hover:underline">
            focus
          </a>
          <a href="#" className="hover:underline">
            Blog
          </a>
        </div>

        {/* Hamburger menu for mobile view */}
        <div className="md:hidden">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="flex flex-col !text-[16px] space-y-4 p-4">
          <a href="#" className="hover:underline">
            _ING
          </a>
          <a href="#" className="hover:underline">
            Solutions
          </a>
          <a href="#" className="hover:underline">
            METHOD
          </a>
          <a href="#" className="hover:underline">
            focus
          </a>
          <a href="#" className="hover:underline">
            Blog
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
