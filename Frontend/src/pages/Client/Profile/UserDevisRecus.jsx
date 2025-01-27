import { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { UserrqDevisList } from "../../../api/devis";
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

function UserDevisRecus() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showLinks, setShowLinks] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
    const [devisList, setDevisList] = useState([]);

    // Function to fetch user devis list
    const UserDevisListrq = async () => {
        try {
            const token = getTokenFromCookie();  // Get the token from cookies
            if (token) {
                const response = await UserrqDevisList({
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setDevisList(response);  // Set the fetched devis list
            } else {
                console.error("No token found");  // Log error if no token is found
            }
        } catch (error) {
            console.error("Error fetching devis:", error);  // Handle the error
        }
    };

    useEffect(() => {
        UserDevisListrq();  // Call the function when the component mounts
    }, []);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const toggleLinks = (index) => {
        setShowLinks(showLinks === index ? null : index);
    };

    // Transform the fetched data into the structure expected by the table
    const transformedQuotes = devisList.map((devis) => ({
        fullName: devis.full_name, // Use full_name instead of artisan_id
        imageFile: devis.image_file, // Use image_file for the profile picture
        serviceName: devis.service_demande,
        desc: devis.description,
        date: devis.date_souhaite,
        budjet: `${devis.budget_prevu} DZD`,
        illustration: devis.illustrations,
        urgency: devis.urgence ? "Urgent" : "Normal", // Convert boolean to "Urgent" or "Normal"
    }));

    return (
        <div style={{ backgroundColor: 'rgba(249, 249, 249, 1)' }}
            className='bg-slate-300 flex-1 mt-0 h-full p-6'>
           
            <div className="rounded-2xl border-2 border-slate-500">
                <table className="text-textBlack rounded-2xl w-full">
                    <thead>
                        <tr>
                            {["Artisan", "Service", "Description", "Délai souhaité", "Budget prévus", "Illustration"].map((header, index) => (
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
                        {transformedQuotes.map((quote, index) => (
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
                                    <img 
                                        src={quote.imageFile} // Use image_file for the profile picture
                                        alt="Artisan Avatar"  
                                        className="rounded-full object-cover w-14 h-14 shadow-md border-2 border-white" 
                                    />
                                    <div className="flex flex-col justify-center">
                                        <span>{quote.fullName}</span> {/* Display full_name */}
                                        <div className='flex gap-2 items-center'>
                                            <GoAlertFill className='text-lightGreen'/>
                                            <span>{quote.urgency}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{quote.serviceName}</td>
                                <td>
                                    <span className="font-semibold">Description</span>
                                    <button 
                                        onClick={() => toggleExpand(index)}
                                        className={`ml-2 text-2xl cursor-pointer transition-transform duration-300 ${expandedIndex === index ? 'rotate-90' : ''}`}
                                    >
                                        <IoIosArrowDown />
                                    </button>
                                    {expandedIndex === index && (
                                        <p className="text-sm text-gray-700 mt-2">{quote.desc}</p>
                                    )}
                                </td>
                                <td>{quote.date}</td>
                                <td>{quote.budjet}</td>
                                <td className="flex gap-2 p-2 justify-center items-center relative">
                                    <button 
                                        onClick={() => setSelectedImage(quote.illustration)}
                                        className="text-black shadow-md p-3 hover:bg-lightGreen hover:text-white rounded-md"
                                    >
                                        illustration
                                    </button>
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

export default UserDevisRecus;