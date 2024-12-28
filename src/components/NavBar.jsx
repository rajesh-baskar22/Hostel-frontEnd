import { useState} from "react";
import {Link} from "react-router-dom";
import { useAuth } from "../Services/AuthProvider";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/imagelogo.webp";
export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };



  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 lg:py-3">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between h-16 bg-white/90 backdrop-blur-sm lg:rounded-md lg:shadow-xl lg:h-24 lg:px-8 lg:py-6 z-30">
          <div className="flex-shrink-0">
            <span className="flex">
              <img className="w-auto h-8 lg:h-12 hover:scale-105 transition-transform" src={logo} alt="Logo" />
            </span>
          </div>

          {/* Hamburger Icon */}
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden hover:bg-gray-100 focus:ring-2 focus:ring-blue-400"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
          {/* Desktop Links */}
          <div className="hidden ml-10 lg:flex lg:items-center lg:mr-auto lg:space-x-10">
            {["Features", "Solutions", "Resources", "Pricing"].map((link) => (
              <span
                key={link}
                href="#"
                title=""
                onClick={closeMenu}
                className="text-base font-medium text-gray-700 transition-all duration-200 hover:text-yellow-600 hover:scale-105 focus:text-yellow-600"
              >
                {link}
              </span>
            ))}
          </div>

          {/* Login and Signup Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link to={"/register"}>
              <span
                onClick={closeMenu}
                className="px-6 py-3 text-base font-medium text-white bg-yellow-600 rounded-full transition-all duration-200 hover:bg-yellow-700 hover:shadow-lg focus:ring-2 focus:ring-yellow-400"
              >
                Register
              </span>
            </Link>

            <Link to={"/"}>
              <span
                onClick={() => {
                  closeMenu();
                }}
                className="px-6 py-3 text-base font-medium text-yellow-600 border-2 border-yellow-600 rounded-full transition-all duration-200 hover:bg-yellow-50 hover:shadow-lg focus:ring-2 focus:ring-yellow-400"
              >
                Login
              </span>
            </Link>          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="flex flex-col py-4 pl-2 space-y-2 lg:hidden fixed top-10  bg-white border-2  w-full z-30 ">
            {["Features", "Solutions", "Resources", "Pricing"].map((link) => (
              <span
                key={link}
                href="#"
                title=""
                onClick={closeMenu}
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-yellow-600"
              >
                {link}
              </span>
            ))}
            {user == false ? (
              <Link to={"/register"}>
                <span
                  onClick={closeMenu}
                  className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                >
                  Sign up
                </span>
              </Link>
            ) : null}
            <Link to="/">
              <span
                onClick={() => {
                  closeMenu();
                }}
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                Sign in
              </span>
            </Link>
          </nav>
        )}
      </div>
      <ToastContainer />
    </header>
  );
};
  

export default NavBar
