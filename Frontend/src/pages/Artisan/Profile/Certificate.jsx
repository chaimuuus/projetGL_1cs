import { LiaUniversitySolid } from "react-icons/lia";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from 'react';

function Certificate() {
    // Track expanded state for each card using their indices
    const [expandedCards, setExpandedCards] = useState({});
    
    const Certificates = [
        {
            CName: 'Installation',
            CDescription: 'Installation salle de bain complète Installation salle de bain complèteInstallation salle de bain complèteInstallation salle de bain complèteInstallation salle de bain complète',
            CImage: '/jardinier.png',
        },
        {
            CName: 'Installation',
            CDescription: 'Installation salle de bain complète',
            CImage: '/jardinier.png',
        },
        {
            CName: 'Installation',
            CDescription: 'Installation salle de bain complète',
            CImage: '/jardinier.png',
        }
    ];

    return (
        <div 
            style={{ backgroundColor: 'rgba(249, 249, 249, 1)' }}
            className='bg-slate-300 gap-10 h-full flex-1 mt-0 p-6 flex flex-row flex-wrap'
        >
            {Certificates.map((certificate, index) => (
                <a 
                    href="#" 
                    key={index}
                    style={{backgroundColor:'rgba(220, 226, 206, 1)'}}
                    className='flex flex-col p-6 gap-y-4 text-white rounded-3xl shadow-slate-500 shadow-2xl w-[380px]'
                >
                    <img 
                        className='w-full h-[200px] object-cover rounded-xl pb-5' 
                        src={certificate.CImage} 
                        alt={certificate.CName} 
                    />
                    <div className='bg-lightGreen felx flex-col flex-wrap p-6 rounded-xl shadow-lg shadow-slate-500'>
                        <div className="flex felx-row">
                            <LiaUniversitySolid className="text-iconSize"/>
                            <h2 className="font-semibold text-xl">{certificate.CName}</h2>
                        </div>
                        <div className={`flex flex-row ${!expandedCards[index] ? 'overflow-hidden h-10' : 'mb-5'}`}>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setExpandedCards(prev => ({
                                        ...prev,
                                        [index]: !prev[index]
                                    }));
                                }}
                                className='bg-none'
                            >
                                <IoIosArrowForward 
                                    className={`text-white text-iconSize mr-2 transition-transform duration-300 rounded-full ${
                                        expandedCards[index] ? 'rotate-90' : ''
                                    }`} 
                                />
                            </button>
                            <p>{certificate.CDescription}</p>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}

export default Certificate;