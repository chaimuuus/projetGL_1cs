import { FaLocationDot } from "react-icons/fa6";
//import { MdEmail } from "react-icons/md";
import { useState, useEffect } from "react";
import { getTokenFromCookie, getProfileArtisan } from '../../../api/getProfile';


function UserProfile() {


    const [user, setUser] = useState(null);


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
    
    console.log(user);
    const User = {
        Name: user?.user_name,
        Location: user?.address,
        Telephone: user?.phone_number,
    };

    return (
        <div  style={{ backgroundColor: 'rgba(249, 249, 249, 1)' }}
            className='bg-slate-300 flex-1 mt-0 p-6 flex justify-center items-center h-full flex-col gap-4'>
            <div className="flex flex-row gap-4">
                <img
                    className='h-40 w-40 p-1 bg-gradient-to-r from-lightBlue via-lightGreen to-lightYellow rounded-full'
                    src={`${user?.image_file}`} // Replace with the actual image path for the user
                    alt="pfp"
                />
            </div>

            <div className="mt-10 flex justify-center items-center gap-2 flex-col">
                <p className='font-semibold text-lg'>{User.Name}</p>
                <div className='flex flex-row gap-2 mt-2'>
                    <FaLocationDot className='text-lightGreen text-iconSize' />
                    <p className='text-gray-600 text-center text-lg'>{User.Location}</p>
                </div>
                {/*<div className='flex flex-row gap-4 mt-4'>
                    <a
                        href='#'
                        className="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-black bg-[#F1EBEB]"
                    >
                        <MdEmail className='text-lightGreen' />
                        <span className='text-lightGreen'>Chattez avec moi</span>
                    </a>
                    <a
                        href='#'
                        className="px-4 py-2 rounded-md border-2 border-black bg-lightGreen text-white"
                    >
                        Contacter
                    </a>
                </div>*/}
            </div>
        </div>
    );
}

export default UserProfile;