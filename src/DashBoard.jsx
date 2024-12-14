import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './header';
import { IoSearch } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Card({ title, ArtisanName, image, profile }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <img
                src={image}
                alt={title}
                className="h-40 w-full object-cover rounded-t-lg mb-4"
            />
            <img src={profile} className="h-5 w-5 rounded-md"/>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{ArtisanName}</p>
        </div>
    );
}
export default function DashBoard() {
    const [selectedLinks, setSelectedLinks] = useState(new Set());
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    
    // Sidebar width constants
    const SIDEBAR_EXPANDED_WIDTH = 240;
    const SIDEBAR_COLLAPSED_WIDTH = 80;

    const handleLinkClick = (link) => {
        setSelectedLinks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(link)) {
                newSet.delete(link);
            } else {
                newSet.add(link);
            }
            return newSet;
        });
    };

    const clearFilters = () => {
        setSelectedLinks(new Set());
    };

    const cards = [
        {
            title: "Plomberie",
            ArtisanName: "Rachid Boukhelfa",
            image: "/public/jardinier.png",
            profile:"/public/jardinier.png",
        },
        {
            title: "Électricité générale",
            ArtisanName: "Sofiane Tabet",
            image: "/public/jardinier.png",
            profile:"/public/jardinier.png",
        },
        {
            title: "Peinture",
            ArtisanName: "Ahmed Ziani",
            image: "/public/jardinier.png",
            profile:"/public/jardinier.png",
        },
        {
            title: "Couture et Retouch",
            ArtisanName: "Fatima Zahra Belkacem",
            image: "/public/jardinier.png",
            profile:"/public/jardinier.png",
        },
        {
            title: "Jardinage",
            ArtisanName: "Sabrina Benali",
            image: "/public/jardinier.png",
            profile:"/public/jardinier.png",
        },
        {
            title: "Cuisiniste",
            ArtisanName: "Nadia Messoudi",
            image: "/public/jardinier.png",
            profile:"/public/jardinier.png",
        },
    ];

    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header className="w-full h-16 shadow-md" />
            </div>

            <div className="flex flex-1 pt-16">
                {/* Sidebar with state management */}
                <div className="fixed top-16 left-0 h-full z-40 transition-all duration-300 ease-in-out">
                    <Sidebar 
                        isExpanded={isSidebarExpanded} 
                        setIsExpanded={setIsSidebarExpanded}
                    />
                </div>

                {/* Main Content - with dynamic margin based on sidebar state */}
                <div 
                    className={`flex-1 transition-all duration-300 ease-in-out overflow-x-hidden min-h-screen`}
                    style={{
                        marginLeft: isSidebarExpanded ? `${SIDEBAR_EXPANDED_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`
                    }}
                >
                    <div className="p-6">
                        {/* Page Header */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-lightGreen mb-4 lg:mb-10">
                                    Bonjour Chaima !
                                </h1>
                                <p className="text-gray-600 mb-2">
                                    De quel artisan avez-vous besoin aujourd'hui ?
                                </p>
                            </div>

                            <button className="px-4 py-2 w-40 bg-lightGreen flex items-center justify-center text-white rounded-md">
                                <span className='text-l font-bold mr-2'>
                                    Planifier un Travail
                                </span>
                                <FaCalendarAlt className="text-white text-2xl" />
                            </button>
                        </div>

                        {/* Search Bar and Filters */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                            <div className="relative w-full md:w-72">
                                <IoSearch className="text-iconYellow absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full h-10 pl-10 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="hidden md:block h-10 border-l-2 border-gray-300"></div>

                            {/* Navigation Links */}
                            <div className="flex flex-wrap gap-2 md:gap-4 text-black items-center">
                                {['Plombier', 'Électricien', 'Peintre', 'Couturière'].map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        onClick={() => handleLinkClick(link)}
                                        className={`${
                                            selectedLinks.has(link) 
                                                ? 'px-2 py-2 bg-lightGreen text-white border border-lightGreen rounded-full' 
                                                : 'text-gray-600 px-2 py-2'
                                        }`}
                                    >
                                        {link}
                                    </a>
                                ))}
                                
                                {/* Clear Filters Button */}
                                {selectedLinks.size > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-lightGreen"
                                    >
                                        <IoClose className="text-xl" />
                                        <span>Clear Filters</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        <hr className="my-4 mx-0 border-gray-300" />

                        {/* Services Grid - with dynamic grid columns based on sidebar state */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-lightGreen mb-6">
                                Services Populaires
                            </h1>
                            <div className={`grid gap-4 md:gap-6 ${
                                isSidebarExpanded 
                                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                                    : 'py-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                            }`}>
                                
                                {cards.map((card, index) => (
                                    <a href="#" key={index} className="bg-white rounded-lg shadow-md p-4 my-5 transition-transform transform hover:scale-105 hover:shadow-xl">
                                        <img src={card.image} alt={card.title} className="w-full h-40 object-cover rounded-t-lg" />
                                        <div className="p-4 flex">
                                            <img src={card.profile} className="h-10 w-10 rounded-full my-3 mr-2" />
                                            <div className="block">
                                                <h2 className="text-xl font-bold text-lightGreen">{card.title}</h2>
                                                <p className="text-gray-600 mt-2 text-sm md:text-base">{card.ArtisanName}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}