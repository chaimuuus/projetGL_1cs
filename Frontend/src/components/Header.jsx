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

