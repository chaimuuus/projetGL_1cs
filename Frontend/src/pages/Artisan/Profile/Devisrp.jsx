import { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { ArtisanrpDevisList } from "../../../api/devis";
import { getTokenFromCookie } from '../../../api/getProfile';

function ImageModal({ imageUrl, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-3 rounded-lg shadow-lg relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-red-500 text-2xl font-bold"
                >
                    &times;
                </button>
                <img 
                    src={imageUrl} 
                    alt="Modal Content" 
                    className="rounded-lg w-80 h-80 object-cover"
                />
            </div>
        </div>
    );
}

function Devisrp() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showLinks, setShowLinks] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
    const [devisList, setDevisList] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    // Function to fetch devis list
    const ArtisanDevisListrp = async () => {
        try {
            const token = getTokenFromCookie(); // Get the token from cookies
            if (token) {
                const response = await ArtisanrpDevisList({
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                console.log("API Response:", response); // Debugging: Log the response

                // Ensure the response data is an array
                if (Array.isArray(response)) {
                    setDevisList(response); // Set the devis list data
                } else {
                    console.error("API response is not an array:", response);
                    setError("Invalid data format received from the API.");
                }
            } else {
                console.error("No token found");
                setError("Authentication token not found.");
            }
        } catch (error) {
            console.error("Error fetching devis:", error);
            setError("Failed to fetch devis data. Please try again later.");
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    useEffect(() => {
        ArtisanDevisListrp(); // Call the function when the component mounts
    }, []);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const toggleLinks = (index) => {
        setShowLinks(showLinks === index ? null : index);
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>; // Show loading state
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>; // Show error state
    }

    return (
        <div style={{ backgroundColor: 'rgba(249, 249, 249, 1)' }}
            className='bg-slate-300 flex-1 mt-0 h-full p-6'>
            
            <div className="rounded-2xl border-2 border-slate-500">
                <table className="text-textBlack rounded-2xl w-full">
                    <thead>
                        <tr>
                            {["Client", "Service", "Détails de la prestation", "Durée estimée des travaux", "Montant total du devis", "Conditions ou remarques"].map((header, index) => (
                                <th 
                                    key={index} 
                                    className="px-6 py-5 text-left font-semibold tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody style={{ backgroundColor: 'rgba(107, 142, 35, 0.25)' }}>
                        {devisList.map((devis, index) => (
                            <tr 
                                key={index}
                                onMouseEnter={() => setIsHovered(index)}
                                onMouseLeave={() => setIsHovered(null)}
                                style={{ 
                                    backgroundColor: isHovered === index 
                                        ? 'rgba(107, 142, 35, 0.35)' 
                                        : 'transparent' 
                                }} 
                                className="rounded-2xl text-center border-t-2 border-slate-500 transition-all duration-300"
                            > 
                                <td className="items-center flex flex-row gap-2 text-center p-2">
                                    <div className="flex flex-col justify-center">
                                        <span>User {devis.id_user}</span>
                                        <div className='flex gap-2 items-center'>
                                            <GoAlertFill className='text-lightGreen'/>
                                            <span>{devis.urgence ? "Urgent" : "Normal"}</span>
                                        </div>
                                    </div>
                                </td>

                                <td>{devis.service_details}</td>

                                <td>
                                    <span className="font-semibold">Détails</span>
                                    <button 
                                        onClick={() => toggleExpand(index)}
                                        className={`ml-2 text-2xl cursor-pointer transition-transform duration-300 ${expandedIndex === index ? 'rotate-90' : ''}`}
                                    >
                                        <IoIosArrowDown />
                                    </button>
                                    {expandedIndex === index && (
                                        <p className="text-sm text-gray-700 mt-2">{devis.service_details}</p>
                                    )}
                                </td>

                                <td>{devis.delai_estime} jours</td>
                                <td>{devis.prix} DZD</td>

                                <td className="flex gap-2 p-2 justify-center items-center relative">
                                    <span className="font-semibold">Remarques</span>
                                    <button 
                                        onClick={() => toggleExpand(index)}
                                        className={`ml-2 text-2xl cursor-pointer transition-transform duration-300 ${expandedIndex === index ? 'rotate-90' : ''}`}
                                    >
                                        <IoIosArrowDown />
                                    </button>
                                    {expandedIndex === index && (
                                        <p className="text-sm text-gray-700 mt-2">{devis.remarques}</p>
                                    )}

                                
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedImage && (
                    <ImageModal 
                        imageUrl={selectedImage} 
                        onClose={() => setSelectedImage(null)} 
                    />
                )}
            </div>
        </div>
    );
}

export default Devisrp;