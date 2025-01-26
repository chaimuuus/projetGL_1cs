import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Rating from './rating'
import { getProfileArtisan, getTokenFromCookie } from "../../../api/getProfile";
import { getArtisanSpecialites } from "../../../api/Specialite";
import { useState, useEffect } from "react";

function Generale() {
     const Artisan = {
            Name: "Rachid Boukhelfa",
            Job: "Plombier",
            wilaya: "Béjaia",
            telephone: "+1 (123) 456-7890",
            ville: "Amizour",
            Rating: 4,
            specialite: ["Instalation", "Réparation", "Entretien", "Conseils et diagnostics", "Entretien", "Entretien", "Entretien", "Entretien", "Entretien", "Entretien"]
        }
        const [specialites, setSpecialites] = useState([]);
        const [artisan, setArtisan] = useState(null);
        const [metier, setMetier] = useState('');
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
                          setArtisan(response.user)
                        
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
            // Function to fetch user profile
                    const getSpecialites = async () => {
                      try {
                        const token = getTokenFromCookie();  // Get the token from cookies
                        if (token) {
                          try{
                          const response = await getArtisanSpecialites({ 
                            headers: { 
                              authorization: `Bearer ${token}`
                            } 
                          });
                          setSpecialites(response)
                        
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
                      getUserProfile();
                      getSpecialites();  // Call the function when the component mounts
                    }, []); 
        
    
  return (
        <div style={{backgroundColor:'rgba(249, 249, 249, 1)'}}
                    className='bg-slate-300 flex-1 mt-0  p-6'>
                        <div className="flex flex-row gap-4">
                            <img 
                                className='h-40 w-40 p-1 bg-gradient-to-r from-lightBlue via-lightGreen to-lightYellow rounded-full'
                                src={artisan?.image_file} 
                                alt="Artisan-pfp" 
                            />
                            <div className='flex flex-col ml-10'>
                                <p className='font-semibold text-lg'>Verifié</p>
                            </div>
                            <div className='flex flex-col mt-19 ml-60 flex-1'>
                                <p className='font-semibold text-lg'>Spécialité</p>
                                <div className='flex flex-wrap gap-4 pt-4'>
                                {specialites && specialites.map((item) => (
                                    <div key={item.specialite_id}>
                                        <span className='bg-gray-300 p-1 rounded-md'>{item.name}</span>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <p className='font-semibold text-lg'>{artisan?.user_name}</p>
                            <p className='text-gray-600 text-lg'>{artisan?.metier}</p>
                            <div className='flex flex-row gap-2 mt-2'>
                                <FaLocationDot className='text-lightGreen text-iconSize'/>
                                <p className='text-gray-600 text-center text-lg'>{artisan?.localisation}</p>
                            </div>
                            <div className='flex flex-row gap-4 mt-4'>
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
                                    Demander un devis
                                </a>
                            </div>
                        </div>
        </div>
    
  )
}

export default Generale