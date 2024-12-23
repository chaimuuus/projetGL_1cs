import { MdEmail } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { TbClockHour10Filled } from "react-icons/tb";
import Rating from'./rating'

function Portfolio() {

    const projects = [
        {
            pName: 'Installation',
            pDescription: 'Installation salle de bain complète',
            pDuree: '7 jours',
            pImage: '/jardinier.png',
            pRate: '3',
            pPrice: '5000000.00 DA'
        },
        {
            pName: 'Réparation',
            pDescription: 'Réparation d’une fuite sous évier',
            pDuree: '7 jours',
            pImage: '/jardinier.png',
            pRate: '4',
            pPrice: '7000000.00 DA'
        },
        {
            pName: 'Service Spe',
            pDescription: 'Réseau d’évacuation conforme.',
            pDuree: '7 jours',
            pImage: '/jardinier.png',
            pRate: '4',
            pPrice: '6000000.00 DA'
        }
    ];

    return (
        <div 
            style={{ backgroundColor: 'rgba(249, 249, 249, 1)' }}
            className='bg-slate-300 gap-10 h-full flex-1 mt-0 p-6 flex flex-row flex-wrap'
        >
            {projects.map((project, index) => (
                <a 
                    href="#" 
                    key={index}
                    style={{backgroundColor:'rgba(220, 226, 206, 1)'}}
                    className='flex flex-col p-6 gap-y-4 text-lightGreen rounded-3xl 
                        shadow-slate-500 shadow-2xl w-[380px]' >
                    <img 
                        className='w-full h-[200px] object-cover rounded-xl pb-5' 
                        src={project.pImage} 
                        alt={project.pName} 
                    />
                    <div className="flex flex-row gap-2 ">
                        <span className="font-semibold mr-20">{project.pName}</span>
                        <Rating rating={project.pRate} />
                        <MdEmail className="text-iconSize" />
                    </div>
                    <p >{project.pDescription}</p>
                    <div className="flex flex-row gap-2 rounded-xl text-white bg-lightGreen p-4">
                        <FaMoneyCheckDollar className="text-iconSize" />
                        <span className="mr-6">{project.pPrice}</span>
                        <TbClockHour10Filled className="text-iconSize" />
                        <span>{project.pDuree}</span>
                    </div>
                </a>
            ))}
        </div>
    );
}

export default Portfolio;
