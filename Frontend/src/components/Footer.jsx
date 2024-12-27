import logo from "../assets/logo.png"
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () =>{
    return (
        <div className="flex bg-custom_grey">
          <div className="w-2/3 p-2 pl-36 flex items-center">
            <img src={logo} alt="DZ-Artisan Logo" className="h-9" />
            <p className="text-black font-semibold text-lg">DZ-Artisan</p>
          </div>
          <div className="w-1/3 p-2 flex items-center">
            <div class="border-l border-neutral-900/50 h-10 mr-10"></div>
            <FaRegCopyright />
            <p className="ml-1">Artisandz.com 2025  Tous droits réservés</p>
          </div>
      </div>
    );
}
export default Footer;