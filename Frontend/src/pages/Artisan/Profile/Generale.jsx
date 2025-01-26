import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Rating from './rating'

function Generale() {
     const Artisan = {
            Name: "Rachid Boukhelfa",
            Job: "Plombier",
            wilaya: "Béjaia",
            telephone: "+1 (123) 456-7890",
            ville: "Amizour",
            Rating: 4,
            specialite: ["Instalation", "Réparation", "Entretien", "Conseils et diagnostics", "Entretien", "Entretien", "Entretien", "Entretien", "Entretien", "Entretien"]
        }
    
  return (
        <div style={{backgroundColor:'rgba(249, 249, 249, 1)'}}
                    className='bg-slate-300 flex-1 mt-0  p-6'>
                        <div className="flex flex-row gap-4">
                            <img 
                                className='h-40 w-40 p-1 bg-gradient-to-r from-lightBlue via-lightGreen to-lightYellow rounded-full'
                                src="/jardinier.png" 
                                alt="Artisan-pfp" 
                            />
                            <div className='flex flex-col ml-10'>
                                <p className='font-semibold text-lg'>Verifié</p>
                                <p className='text-gray-600 mt-4'>Evaluations</p>
                                <Rating rating={Artisan.Rating} />
                            </div>
                            <div className='flex flex-col mt-19 ml-60 flex-1'>
                                <p className='font-semibold text-lg'>Spécialité</p>
                                <div className='flex flex-wrap gap-4 pt-4'>
                                    {Artisan.specialite.map((item, index) => (
                                        <div key={index}>
                                            <span className='bg-gray-300 p-1 rounded-md'>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <p className='font-semibold text-lg'>{Artisan.Name}</p>
                            <p className='text-gray-600 text-lg'>{Artisan.Job}</p>
                            <div className='flex flex-row gap-2 mt-2'>
                                <FaLocationDot className='text-lightGreen text-iconSize'/>
                                <p className='text-gray-600 text-center text-lg'>{Artisan.wilaya}, {Artisan.ville}</p>
                            </div>
                            <div className='flex flex-row gap-4 mt-4'>
                                <a
                                href='#' 
                                    className="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-black bg-[#F1EBEB]"
                                >
                                    <MdEmail className='text-lightGreen' />
                                    <span className='text-lightGreen'>Chattez avec moi</span>
                                </a>
                                <a 
                                href='#' 
                                    className="px-4 py-2 rounded-md border-2 border-black bg-lightGreen text-white"
                                >
                                    Demander un devis
                                </a>
                            </div>
                        </div>
        </div>
    
  )
}

export default Generale