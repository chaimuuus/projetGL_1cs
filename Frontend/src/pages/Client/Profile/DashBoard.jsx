import { useState, useEffect } from 'react';
import { Sidebar } from "../../../components/Sidebar";
import { Header } from '../../../components/Header';
import { IoSearch } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from 'axios';

function Card({ title, ArtisanName, image, profile }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <img
                src={image}
                alt={title}
                className="h-40 w-full object-cover rounded-t-lg mb-4"
            />
            <img src={profile} className="h-10 w-10 rounded-full my-3 mr-2" alt="Profile" />
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{ArtisanName}</p>
        </div>
    );
}

export default function DashBoard() {
    const [selectedLink, setSelectedLink] = useState(null); // Track the selected métier
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [artisans, setArtisans] = useState([]); // State to store fetched artisans
    const [metiers, setMetiers] = useState([]); // State to store métier data
    const [loading, setLoading] = useState(false); // State to track loading status
    const [searchQuery, setSearchQuery] = useState(""); // State to track search query

    // Sidebar width constants
    const SIDEBAR_EXPANDED_WIDTH = 240;
    const SIDEBAR_COLLAPSED_WIDTH = 80;

    // Fetch métier data on component mount
    useEffect(() => {
        const fetchMetiers = async () => {
            try {
                const response = await axios.get(
                    "https://dzartisan-api.onrender.com/artisan/getMetiers"
                );
                setMetiers(response.data); // Store métier data
            } catch (error) {
                console.error("Error fetching métiers:", error);
            }
        };

        fetchMetiers();
    }, []);

    // Fetch artisans based on métier (or all artisans if metier is null)
    const fetchArtisans = async (metier) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://dzartisan-api.onrender.com/artisans/search_metier`,
                { params: { metier: metier || null } } // Pass métier as null if no filter is selected
            );
            console.log("API Response:", response.data);

            // Transform the API response to include métier data
            const transformedArtisans = response.data.artisans.map((artisan) => {
                const metierData = metiers.find((m) => m.id === artisan.metier); // Find métier data
                console.log("Artisan:", artisan);
                console.log("Métier Data:", metierData);

                return {
                    title: metierData ? metierData.name : "Unknown Métier", // Use métier name as the title
                    ArtisanName: artisan.name, // Use 'name' as the ArtisanName
                    image: metierData ? metierData.image_file : "default_image_url", // Use métier image
                    profile: artisan.image_file, // Use artisan's profile image
                };
            });

            setArtisans(transformedArtisans); // Update artisans state with transformed data
        } catch (error) {
            console.error("Error fetching artisans:", error);
            setArtisans([]); // Default to an empty array
        } finally {
            setLoading(false);
        }
    };

    // Fetch all artisans when métier data is available
    useEffect(() => {
        if (metiers.length > 0) {
            fetchArtisans(null); // Fetch all artisans when no métier is selected
        }
    }, [metiers]);

    // Handle métier selection
    const handleLinkClick = async (link) => {
        // If the same métier is clicked again, deselect it
        if (selectedLink === link) {
            setSelectedLink(null);
            setArtisans([]); // Clear artisans when no métier is selected
        } else {
            setSelectedLink(link); // Set the selected métier
            await fetchArtisans(link); // Fetch artisans for the selected métier
        }
    };

    // Clear filters and fetch all artisans
    const clearFilters = () => {
        setSelectedLink(null); // Clear the selected métier
        fetchArtisans(null); // Fetch all artisans when filters are cleared
    };

    // Fetch search results based on keywords
    const fetchSearchResults = async (keywords) => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://dzartisan-api.onrender.com/artisans/search_keywords",
                { params: { keywords } } // Pass keywords as a query parameter
            );
            console.log("Search Results:", response.data);

            // Transform the API response to include métier data
            const transformedArtisans = response.data.artisans.map((artisan) => {
                const metierData = metiers.find((m) => m.id === artisan.metier); // Find métier data
                console.log("Artisan:", artisan);
                console.log("Métier Data:", metierData);

                return {
                    title: metierData ? metierData.name : "Unknown Métier", // Use métier name as the title
                    ArtisanName: artisan.name, // Use 'name' as the ArtisanName
                    image: metierData ? metierData.image_file : "default_image_url", // Use métier image
                    profile: artisan.image_file, // Use artisan's profile image
                };
            });

            setArtisans(transformedArtisans); // Update artisans state with search results
        } catch (error) {
            console.error("Error fetching search results:", error);
            setArtisans([]); // Default to an empty array
        } finally {
            setLoading(false);
        }
    };

    // Handle search input changes
    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query); // Update search query state
        if (query.trim() === "") {
            fetchArtisans(null); // Fetch all artisans if the search query is empty
        } else {
            fetchSearchResults(query); // Fetch search results based on the query
        }
    };

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

                           
                        </div>

                        {/* Search Bar and Filters */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                            <div className="relative w-full md:w-72">
                                <IoSearch className="text-iconYellow absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery} // Bind search query state
                                    onChange={handleSearchInputChange} // Handle input changes
                                    className="w-full h-10 pl-10 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="hidden md:block h-10 border-l-2 border-gray-300"></div>

                            {/* Navigation Links */}
                            <div className="flex flex-wrap gap-2 md:gap-4 text-black items-center">
                                {['Plombier', 'Électricien', 'peinture', 'Couturière', 'Jardinier', 'Cuisinier'].map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        onClick={() => handleLinkClick(link)}
                                        className={`${
                                            selectedLink === link
                                                ? 'px-2 py-2 bg-lightGreen text-white border border-lightGreen rounded-full'
                                                : 'text-gray-600 px-2 py-2'
                                        }`}
                                    >
                                        {link}
                                    </a>
                                ))}

                                {/* Clear Filters Button */}
                                {selectedLink && (
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
                            {loading ? (
                                <p>Loading...</p> // Show loading indicator
                            ) : (
                                <div className={`grid gap-4 md:gap-6 ${
                                    isSidebarExpanded
                                        ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                                        : 'py-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                }`}>
                                    {artisans.map((artisan, index) => (
                                        <a href="#" key={index} className="bg-white rounded-lg shadow-md p-4 my-5 transition-transform transform hover:scale-105 hover:shadow-xl">
                                            <img src={artisan.image} alt={artisan.title} className="w-full h-40 object-cover rounded-t-lg" />
                                            <div className="p-4 flex">
                                                <img src={artisan.profile} className="h-10 w-10 rounded-full my-3 mr-2" alt="Profile" />
                                                <div className="block">
                                                    <h2 className="text-xl font-bold text-lightGreen">{artisan.title}</h2>
                                                    <p className="text-gray-600 mt-2 text-sm md:text-base">{artisan.ArtisanName}</p>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}