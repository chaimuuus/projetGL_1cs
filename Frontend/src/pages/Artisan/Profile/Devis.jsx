import { useState } from 'react';
import {Sidebar} from '../../../components/Sidebar';
import {Header} from '../../../components/Header';
import { Outlet, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default function Devis() {
    const location = useLocation();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const SIDEBAR_EXPANDED_WIDTH = 240;
    const SIDEBAR_COLLAPSED_WIDTH = 80;

    const activeTab = (() => {
        if (location.pathname.endsWith("devisrp")) return "Devisrp";
        if (location.pathname.endsWith("corbeille")) return "Corbeille";
        return "DevisRecus";
    })();

    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header className="w-full h-16 shadow-md" />
            </div>

            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <div className="fixed top-16 left-0 h-full z-40 transition-all duration-300 ease-in-out">
                    <Sidebar 
                        isExpanded={isSidebarExpanded} 
                        setIsExpanded={setIsSidebarExpanded}
                    />
                </div>

                {/* Main Content */}
                <div 
                    className="flex-1 transition-all duration-300 ease-in-out flex flex-col"
                    style={{
                        marginLeft: isSidebarExpanded ? `${SIDEBAR_EXPANDED_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`
                    }}
                >
                    {/* Header Section */}
                    <div className="px-6 pt-4">
                        <div className='flex flex-col items-start mt-10 pl-6 mb-10'>
                            <span className="text-xl text-textBlack">Aperçu</span>
                            <span className='text-3xl'>Mes devis</span>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-4 pl-6 text-textBlack">
                            <Link
                                to=""
                                className={`pb-2 ${activeTab === "DevisRecus" ? "border-b-blue-600 border-b-2" : ""}`}
                            >
                                Devis recus
                            </Link>
                            <Link
                                to="devisrp"
                                className={`pb-2 ${activeTab === "Devisrp" ? "border-b-blue-600 border-b-2" : ""}`}
                            >
                                Devis de réponses envoyés
                            </Link>
                            
                        </div>
                    </div>

                    <div className="flex-1">
                        <Outlet />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

