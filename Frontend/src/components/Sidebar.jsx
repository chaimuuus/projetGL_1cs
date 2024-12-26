import { useState } from 'react';
import { BiMessageSquareDetail, BiUser, BiCog, BiLogOut } from 'react-icons/bi';
import { RiBillLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

export const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [activePage, setActivePage] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: <MdDashboard className="text-iconSize text-lightBlue" />, label: 'Tableau de bord', color: 'text-lightBlue' },
    { id: 'devis', icon: <RiBillLine className="text-iconYellow text-iconSize" />, label: 'Devis' },
    { id: 'messages', icon: <BiMessageSquareDetail className="text-iconYellow text-iconSize" />, label: 'Messagerie' },
    { id: 'profile', icon: <BiUser className="text-iconYellow text-iconSize" />, label: 'Profile' },
    { id: 'settings', icon: <BiCog className="text-iconYellow text-iconSize" />, label: 'Paramétres' },
    { id: 'logout', icon: <BiLogOut className="text-iconYellow text-iconSize" />, label: 'Se déconnecter' },
  ];

  return (
    <div 
      className={`sidebar-container bg-lightYellow h-full transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-60' : 'w-20'
      } relative`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 bg-lightYellow rounded-full p-1 shadow-md hover:bg-yellow-100 transition-colors duration-200"
      >
        <IoIosArrowBack className={`text-iconYellow transition-transform duration-300 ${
          !isExpanded ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Sidebar content */}
      <div className="p-4">
        <ul className="sidebar-nav space-y-8">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                onClick={() => setActivePage(item.id)}
                className={`sidebar-nav-link flex items-center transition-all duration-200 
                  ${isExpanded ? 'space-x-2 px-2' : 'justify-center'} 
                  ${activePage === item.id 
                    ? ' rounded-md  px-4 py-2 text-lightBlue' 
                    : 'text-textBlack  py-2 rounded-md'
                  }`}
              >
                <div className={`${activePage === item.id ? 'text-lightGreen' : ''}`}>
                  {item.icon}
                </div>
                {isExpanded && (
                  <span className={`transition-colors duration-200 ${
                    item.color || ''
                  }`}>
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;