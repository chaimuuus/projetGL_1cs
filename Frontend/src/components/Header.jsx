import Logo from '../assets/Logo.png'
import BASE_URL from "../config/config";
import { getTokenFromCookie, getProfileArtisan } from '../api/getProfile';
import { useState, useEffect } from 'react';



export const Header = () => {
    const hasNotifications = true; 
    const [user, setUser] = useState(null);
    // Function to fetch user profile
            const getUserProfile = async () => {
              try {
                const token = getTokenFromCookie();  // Get the token from cookies
                if (token) {
                  try{
                  const response = await getProfileArtisan({ 
                    headers: { 
                      authorization: `Bearer ${token}`
                    } 
                  });
                  setUser(response.user)
                
                  }catch (userLoginError) {
                    // If user login fails, try artisan login
                    
                  }
                  

                } else {
                  console.error("No token found");  // Log error if no token is found
                }
              } catch (error) {
                console.error("Error fetching profile:", error);  // Handle the error (e.g., show a notification)
                throw error;  // You can further handle the error as needed
              }
            };
          
            
            useEffect(() => {
              getUserProfile();  // Call the function when the component mounts
            }, []); 


    return (
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
            {/* Logo */}
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className="h-10" />
            </div>

            {/* Location Dropdown */}

            {/* Right Section */}
            {user && (
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-700 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                              d="M21 8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V8zm-2 0l-7 4-7-4"
                        />
                    </svg>
                    {hasNotifications && (
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    )}
                </div>

                {/* Notification */}
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-700 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
                        />
                    </svg>
                    {hasNotifications && (
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    )}
                </div>

                {/* User Info */}
                <div className="flex items-center ">
                    <span className="text-lg text-gray-700 bg-lightGrey  px-3 rounded-xl">{user.user_name}</span>
                    <img
                        src={`${user?.image_file}`}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </div>
            </div>)}
        </header>
    );
};
export default Header;

