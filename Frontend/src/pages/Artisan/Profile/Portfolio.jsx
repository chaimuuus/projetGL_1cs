import { MdEmail } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { TbClockHour10Filled } from "react-icons/tb";
import { getProjects, getTokenFromCookie } from "../../../api/getProfile";
import { useState, useEffect } from "react";
function Portfolio() {


    const [projects, setProjects] = useState([]);

    const GetProjects = async () => {
        try {
            const token = getTokenFromCookie();  // Get the token from cookies
                if (token) {
                    try{
                        const response = await getProjects({ 
                            headers: { 
                                authorization: `Bearer ${token}`
                        } 
                        });
                        setProjects(response);
                        console.log('Projects:  ',projects)
                        }catch (userLoginError) {
                                
                        }  
                        } else {
                                console.error("No token found");  // Log error if no token is found
                            }
                            } catch (error) {
                                console.error("Error fetching certificates:", error);  // Handle the error (e.g., show a notification)
                                throw error;  // You can further handle the error as needed
                              }
                            };
                          
                            
    useEffect(() => {
        GetProjects();  // Call the function when the component mounts
    }, []); 

    return (
        <div 
            style={{ backgroundColor: 'rgba(249, 249, 249, 1)' }}
            className='bg-slate-300 gap-10 h-full flex-1 mt-0 p-6 flex flex-row flex-wrap'
        >
            {projects.map((project, index) => (
                <a 
                    href="#" 
                    key={project.project_id}
                    style={{backgroundColor:'rgba(220, 226, 206, 1)'}}
                    className='flex flex-col p-6 gap-y-4 text-lightGreen rounded-3xl 
                        shadow-slate-500 shadow-2xl w-[380px]' >
                    <img 
                        className='w-full h-[200px] object-cover rounded-xl pb-5' 
                        src={project.image_file} 
                        alt={project.title} 
                    />
                    <div className="flex flex-row gap-2 ">
                        <span className="font-semibold mr-20">{project.title}</span>
                        <MdEmail className="text-iconSize" />
                    </div>
                    <p >{project.description}</p>
                    <div className="flex flex-row gap-2 rounded-xl text-white bg-lightGreen p-4">
                        <FaMoneyCheckDollar className="text-iconSize" />
                        <span className="mr-6">{project.price}</span>
                    </div>
                </a>
            ))}
        </div>
    );
}

export default Portfolio;
