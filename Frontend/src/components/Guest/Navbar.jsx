import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

// import Hero from "./Hero";
// import Footer from "../components/Footer"
export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <nav className="w-full h-24 flex flex-col justify-center items-center sticky top-0 z-50 bg-yellow-200">
      <div className="container mx-auto lg:px-3 w-full">
        <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <h2 className="text-primary font-bold text-4xl">DZ-ARTISAN</h2>
            </div>
          </div>
          <ul className="flex items-center xl:gap-12 gap-x-4 max-lg:hidden">
            <a
              href="/"
              className="leading-normal no-underline text-black text-lg hover:text-primary"
            >
              Accueil
            </a>
            <a
              href="/Services"
              className="leading-normal no-underline text-light text-lg hover:text-primary"
            >
               Services
            </a>
            <a
              href="/About"
              className="leading-normal no-underline text-light text-lg hover:text-primary"
            >
              À propos
            </a>
            <a
              href="/Contact"
              className="leading-normal no-underline text-light text-lg hover:text-primary"
            >
Contact            </a>
          </ul>

          <div className="flex gap-4 max-lg:hidden">
            <Link to="/login" > 
              <button className="bg-transparent rounded shadow h-12 px-6 outline-none text-light hover:bg-primary hover:text-white cursor-pointer text-base transition-bg hover:border hover:border-primary">
                Se connecter
              </button>
            </Link>
            <Link to="/welcome">
              <button className="bg-primary rounded shadow h-12 px-6 outline-none text-white hover:bg-white hover:text-primary cursor-pointer text-base transition-colors hover:border hover:border-primary">
                {"S'inscrire"}
              </button>
            </Link>
          </div>

          {dropdown ? (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <MdClose />
            </div>
          ) : (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <HiMenuAlt3 />
            </div>
          )}
        </div>
        {dropdown && (
          <div className="lg:hidden w-full fixed top-24 bg-primary transition-all">
            <div className="w-full flex flex-col items-baseline gap-4">
              <ul className="flex flex-col justify-center w-full">
                <a
                  href="../components/Hero.jsx"
                  className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                >
                  Acceil
                </a>
                <a
                  href="#footer"
                  className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                >
                  À propos
                </a>
                <a
                  href="#"
                  className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                >
                  Contact
                </a>
                <a
                  href="#blog"
                  className="px-6 h-10 flex items-center leading-normal no-underline text-white font-bold text-lg hover:text-primary text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                >
                  Blog
                </a>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
