import { useState, useEffect } from 'react';
import { BiMessageSquareDetail, BiUser, BiCog, BiLogOut } from 'react-icons/bi';
import { RiBillLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { getTokenFromCookie, getProfileArtisan } from '../api/getProfile';
import Cookies from 'js-cookie'; // Import Cookies to handle cookie removal

export const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const navigate = useNavigate(); // Hook for navigation

  const menuItems = [
    { id: '', icon: <MdDashboard className="text-iconSize text-lightBlue" />, label: 'Tableau de bord', color: 'text-lightBlue' },
    { id: 'devis', icon: <RiBillLine className="text-iconYellow text-iconSize" />, label: 'Devis' },
    { id: 'messagerie', icon: <BiMessageSquareDetail className="text-iconYellow text-iconSize" />, label: 'Messagerie' },
    { id: 'edit-profile', icon: <BiUser className="text-iconYellow text-iconSize" />, label: 'Profile' },
    { id: 'logout', icon: <BiLogOut className="text-iconYellow text-iconSize" />, label: 'Se déconnecter' },
  ];

  const [user, setUser] = useState(null);

  // Function to fetch user profile
  const getUserProfile = async () => {
    try {
      const token = getTokenFromCookie();  // Get the token from cookies
      if (token) {
        try {
          const response = await getProfileArtisan({ 
            headers: { 
              authorization: `Bearer ${token}`
            } 
          });
          setUser(response.user);
          console.log(response);
        } catch (userLoginError) {
          // If user login fails, try artisan login
        }
      } else {
        console.error("No token found");  // Log error if no token is found
      }
    } catch (error) {
      console.error("Error fetching profile:", error);  // Handle the error
      throw error;
    }
  };

  useEffect(() => {
    getUserProfile();  // Call the function when the component mounts
  }, []);

  // Logout handler
  const handleLogout = () => {
    Cookies.remove('token'); // Clear the token cookie
    navigate('/login'); // Redirect to the login page
  };

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
              {item.id === 'logout' ? ( // Check if the item is the logout button
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    handleLogout(); // Call the logout handler
                  }}
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
              ) : (
                <Link to={`/${user?.role || "user"}/${item.id}`}>
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
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;