import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";

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
    const initialQuotes = [
        {
            pfp: "jardinier.png",
            fullName: "Alice",
            urgency: "Urgent",
            serviceName: "Installation",
            desc: "Nous avons besoin d'un devis pour votre jardinage.",
            date: "2022-01-25",
            budjet: "3500 DZD",
            illustration: "jardinier.png",
        },{
            pfp: "jardinier.png",
            fullName: "Alice",
            urgency: "Urgent",
            serviceName: "Installation",
            desc: "Nous avons besoin d'un devis pour votre jardinage.",
            date: "2022-01-25",
            budjet: "350000 DZD",
            illustration: "jardinier.png",
        },
        {
            pfp: "jardinier.png",
            fullName: "Bob",
            urgency: "Normal",
            serviceName: "Plomberie",
            desc: "Besoin d'un devis pour une réparation de plomberie.",
            date: "2022-02-15",
            budjet: "15000 DZD",
            illustration: "plomberie.png",
        }
    ];

    const [quotes, setQuotes] = useState(initialQuotes);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showLinks, setShowLinks] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
 

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const toggleLinks = (index) => {
        setShowLinks(showLinks === index ? null : index);
    };

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
                        {quotes.map((quote, index) => (
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
                                        src={quote.pfp} 
                                        alt="Client Avatar"  
                                        className="rounded-full object-cover w-14 h-14 shadow-md border-2 border-white" 
                                    />
                                    <div className="flex flex-col justify-center">
                                        <span>{quote.fullName}</span>
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
                                        img.pdf
                                    </button>
                                    <button 
                                        onClick={() => toggleLinks(index)}
                                        className='flex items-center justify-center rounded-full text-iconSize text-black w-10 h-10 bg-white border border-gray-200 hover:bg-gray-200 transition-all duration-300'>
                                        <BsThreeDots />
                                    </button>
                                    {showLinks === index && (
                                        <div className="absolute right-0 top-12 w-48 bg-white shadow-lg border border-gray-300 rounded-lg z-50 p-4">
                                            <div className="flex justify-end mb-2">
                                                <button 
                                                    onClick={() => setShowLinks(null)}
                                                    className="text-red-500 text-lg"
                                                >
                                                    <IoClose />
                                                </button>
                                            </div>
                                            <ul>
                                                {["Envoyer un devis", "Contacter client"].map((link, i) => (
                                                    <li 
                                                        key={i} 
                                                        className="p-2 hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md"
                                                    >
                                                        {link}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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

export default UserDevisRecus;