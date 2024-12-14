import { useState } from 'react';
import {Sidebar} from './Sidebar';
import {Header} from './header';

export default function ArtisanProfile() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const SIDEBAR_EXPANDED_WIDTH = 240;
    const SIDEBAR_COLLAPSED_WIDTH = 80;
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
                <div 
                  className="flex-1 transition-all duration-300 ease-in-out overflow-x-hidden min-h-screen"
                  style={{
                    marginLeft: isSidebarExpanded? `${SIDEBAR_EXPANDED_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`
                  }}>
                    <div className="mb-4 lg:mb-10">
                        <span >Apercu</span>
                        <span >Compte</span>
                    </div>
                  </div>
            </div>
        </div>
    );
}
