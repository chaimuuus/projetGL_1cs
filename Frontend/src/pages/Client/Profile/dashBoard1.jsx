import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Sidebar } from "../../../components/Sidebar";
import { Header } from '../../../components/Header';
import { IoSearch } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { getTokenFromCookie, getProfileArtisan } from '../../../api/getProfile';

// Card Component
function Card({ title, ArtisanName, image, profile, id, onClick }) {
    return (
        <div
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
            onClick={() => onClick(id)} // Trigger the onClick handler with the artisan's ID
        >
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
    const navigate = useNavigate(); // Initialize the navigate function
    const [selectedLink, setSelectedLink] = useState(null); // Track the selected métier
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [artisans, setArtisans] = useState([]); // State to store fetched artisans
    const [metiers, setMetiers] = useState([]); // State to store métier data
    const [loading, setLoading] = useState(false); // State to track loading status
    const [searchQuery, setSearchQuery] = useState(""); // State to track search query
    const [user, setUser] = useState(null); // State to store user data

    // Sidebar width constants
    const SIDEBAR_EXPANDED_WIDTH = 240;
    const SIDEBAR_COLLAPSED_WIDTH = 80;

    // Function to fetch user profile
    const getUserProfile = async () => {
        try {
            const token = getTokenFromCookie(); // Get the token from cookies
            if (token) {
                const response = await getProfileArtisan({
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.user);
            } else {
                console.error("No token found");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        getUserProfile(); // Call the function when the component mounts
    }, []);

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

            // Transform the API response to include métier data and artisan ID
            const transformedArtisans = response.data.artisans.map((artisan) => {
                const metierData = metiers.find((m) => m.id === artisan.metier); // Find métier data
                return {
                    id: artisan.id, // Include the artisan's ID
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
        if (selectedLink === link) {
            setSelectedLink(null);
            await fetchArtisans(null); // Clear artisans when no métier is selected
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

            // Transform the API response to include métier data and artisan ID
            const transformedArtisans = response.data.artisans.map((artisan) => {
                const metierData = metiers.find((m) => m.id === artisan.metier); // Find métier data
                return {
                    id: artisan.id, // Include the artisan's ID
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

    // Handle card click to navigate to the artisan's profile
    const handleCardClick = (artisanId) => {
        navigate(`/artisans/${artisanId}`); // Navigate to the artisan's profile page
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
                                    Bonjour {user?.user_name}!
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
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    className="w-full h-10 pl-10 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="hidden md:block h-10 border-l-2 border-gray-300"></div>

                            {/* Navigation Links */}
                            <div className="flex flex-wrap gap-2 md:gap-4 text-black items-center">
                                {['cuisiniste', 'electricite generale', 'peinture', 'couture et retouche', 'Plomberie', 'Jardinage'].map((link) => (
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
                                        <Card
                                            key={index}
                                            id={artisan.id} // Pass the artisan's ID
                                            title={artisan.title}
                                            ArtisanName={artisan.ArtisanName}
                                            image={artisan.image}
                                            profile={artisan.profile}
                                            onClick={handleCardClick} // Pass the click handler
                                        />
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