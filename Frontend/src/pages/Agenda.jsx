import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Planification from "./planification";
import { FaCirclePlus } from "react-icons/fa6";


const Agenda = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Réparation de fuite d'eau dans les tuyaux",
      tasks: {
        aFaire: 4,
        enCours: 2,
        terminee: 3,
      },
    },
    {
      id: 2,
      name: "Installation d'un chauffe-eau électrique",
      tasks: {
        aFaire: 5,
        enCours: 1,
        terminee: 2,
      },
    },
    {
      id: 3,
      name: "Installation de nouveaux équipements sanitaires",
      tasks: {
        aFaire: 2,
        enCours: 3,
        terminee: 1,
      },
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleAddProject = () => {
    const newProjectName = prompt("Entrez le nom du projet:");
    if (newProjectName) {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        tasks: {
          aFaire: 0,
          enCours: 0,
          terminee: 0,
        },
      };
      setProjects((prevProjects) => [...prevProjects, newProject]);
    }
  };

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const selectedProject = projects.find((project) => project.id === selectedProjectId);

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ fontFamily: "'Exo 2', sans-serif",}} >
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header className="w-full h-16 shadow-md" />
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out">
          <Sidebar isExpanded={false} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Projects */}
          <div className="ml-20 left-2 fixed top-16 h-full w-64 p-2 bg-white flex flex-col gap-2 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl text-[#1C1D22] font-bold">Projects</h1>
              <button
                onClick={handleAddProject}
                className="bg-slate-400 rounded-full hover:bg-gray-300"
              >
                <FaCirclePlus className="h-5 w-5 text-custom_grey" />
              </button>
            </div>

            <div className="space-y-6 pl-2">
              {/* Projects Section */}
              <div>
                <h2 className="text-sm font-bold text-[#1C1D22] mb-2">Projects</h2>
                <ul className="space-y-2">
                  <li
                    className={`text-gray-500 text-sm cursor-pointer hover:text-black ${
                      selectedProjectId === null ? "text-black font-medium" : ""
                    }`}
                    onClick={() => setSelectedProjectId(null)}
                  >
                    Tous les projets ({projects.length})
                  </li>
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className={`text-sm cursor-pointer hover:text-black p-3 rounded-lg ${
                        selectedProjectId === project.id ? "bg-gray-100 text-black font-medium" : "text-gray-500"
                      }`}
                      onClick={() => handleProjectClick(project.id)}
                    >
                      {project.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tasks Section */}
              <div>
                <h2 className="text-sm font-bold text-[#1C1D22] mb-2">Tâches</h2>
                {selectedProject ? (
                  <ul className="space-y-2">
                    <li className="text-gray-500 text-sm pl-2 cursor-pointer hover:text-black">
                      À faire ({selectedProject.tasks.aFaire})
                    </li>
                    <li className="text-gray-500 text-sm pl-2 cursor-pointer hover:text-black">
                      En cours ({selectedProject.tasks.enCours})
                    </li>
                    <li className="text-gray-500 text-sm pl-2 cursor-pointer hover:text-black">
                      Terminée ({selectedProject.tasks.terminee})
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    {["aFaire", "enCours", "terminee"].map((taskCategory) => (
                      <li
                        key={taskCategory}
                        className="text-gray-500 text-sm p-2 cursor-pointer hover:text-black"
                      >
                        {taskCategory === "aFaire"
                          ? "À faire"
                          : taskCategory === "enCours"
                          ? "En cours"
                          : "Terminée"}{" "}
                        (
                        {projects.reduce(
                          (total, project) => total + project.tasks[taskCategory],
                          0
                        )}
                        )
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 ml-96 mt-16 h-[calc(100vh-4rem)] overflow-auto">
            <Planification/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
