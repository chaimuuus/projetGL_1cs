import React, { useState } from 'react';
import { Sidebar } from "../../../components/Sidebar"
import { Header } from '../../../components/Header';
import { FaCalendarAlt, FaClock, FaEllipsisH, FaPlus, FaCheckCircle, FaTrash, FaEdit } from "react-icons/fa";

const Artisandash = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('');
  const [tasks, setTasks] = useState([


    {
      title: "Remplacer un robinet défectueux",
      description: "Urgence demandée pour aujourd'hui.",
      date: "22 Fev 2025",
      time: "1:30 pm",
      status: "Haute priorité",
      timeLeft: "58 Min Left",
      priority: "high",
      isCompleted: false
    },
    {
      title: "Réparer une fuite d'eau",
      description: "Intervention requise rapidement",
      date: "22 Fev 2025",
      time: "3:00 pm",
      status: "Moyenne",
      timeLeft: "3h Left",
      priority: "medium",
      isCompleted: false
    }
  ]);


  const [user, setUser] = useState(null);
  
    // Function to fetch user profile
    const getUserProfile = async () => {
      try {
        const token = getTokenFromCookie();  // Get the token from cookies
        if (token) {
          try {
            const response = await getProfileArtisan({ 
              headers: { 
                authorization: `Bearer ${token}`
              } 
            });
            setUser(response.user);
            console.log(response);
          } catch (userLoginError) {
            // If user login fails, try artisan login
          }
        } else {
          console.error("No token found");  // Log error if no token is found
        }
      } catch (error) {
        console.error("Error fetching profile:", error);  // Handle the error
        throw error;
      }
    };
  
    useEffect(() => {
      getUserProfile();  // Call the function when the component mounts
    }, []);

  const updateProgressPercentage = () => {
    const completedTasks = tasks.filter(task => task.isCompleted);
    const totalTasks = tasks.length;
    const progressPercentage = (completedTasks.length / totalTasks) * 100;
    setProgressPercentage(progressPercentage);
  };

  const addOrUpdateTask = () => {
    const newTask = {
      title: newTaskTitle,
      description: newTaskDescription,
      date: newTaskDate,
      time: newTaskTime,
      status: newTaskStatus || "Haute priorité",
      timeLeft: "2h Left",
      priority: newTaskStatus === "Basse priorité" ? "low" : 
                newTaskStatus === "Moyenne" ? "medium" : "high",
      isCompleted: false
    };

    if (editingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = newTask;
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    updateProgressPercentage();
    setShowAddTaskForm(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDate('');
    setNewTaskTime('');
    setNewTaskStatus('');
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    updateProgressPercentage();
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
    updateProgressPercentage();
  };

  const startEditTask = (index) => {
    const taskToEdit = tasks[index];
    setNewTaskTitle(taskToEdit.title);
    setNewTaskDescription(taskToEdit.description);
    setNewTaskDate(taskToEdit.date);
    setNewTaskTime(taskToEdit.time);
    setNewTaskStatus(taskToEdit.status);
    setEditingTaskIndex(index);
    setShowAddTaskForm(true);
  };

  const TaskCard = ({ task, index, onDelete, onComplete, onEdit }) => (
    <div className="bg-white rounded-lg shadow-sm w-full">
      <div className={`text-white px-3 py-1 rounded-t-lg flex justify-between items-center ${task.isCompleted ? 'bg-lightGreen' : 'bg-red-500'}`}>
        <span className="text-sm font-medium">{task.timeLeft}</span>
        <div className="flex gap-2">
          {task.isCompleted ? (
            <FaCheckCircle className="text-white cursor-pointer" onClick={onComplete} />
          ) : (
            <FaCheckCircle className=" cursor-pointer text-gray-400" onClick={onComplete} />
          )}
          <FaEdit className="text-white cursor-pointer" onClick={onEdit} />
          <FaTrash className="text-white cursor-pointer" onClick={onDelete} />
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-medium text-gray-800 mb-2">{task.title}</h4>
        <p className="text-gray-600 text-sm">{task.description}</p>

        <div className="flex gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            task.priority === 'high'
              ? 'bg-red-100 text-red-600'
              : task.priority === 'medium'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-green-100 text-green-600'
          }`}>
            {task.status}
          </span>
        </div>

        <div className="bg-gray-50 -mx-4 -mb-4 p-3 rounded-b-lg flex gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt className="text-yellow-500" />
            <span className="text-sm">{task.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaClock className="text-yellow-500" />
            <span className="text-sm">{task.time}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header className="w-full h-16 shadow-md" />
      </div>

      <div className="flex flex-1 pt-16">
        <div className="fixed top-16 left-0 h-full z-40 transition-all duration-300 ease-in-out">
          <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
        </div>

        <div className="flex-1 transition-all duration-300 ease-in-out overflow-x-hidden min-h-screen bg-gray-50" style={{
          marginLeft: isSidebarExpanded ? '240px' : '80px'
        }}>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-lightBlue mb-2">Bonjour {user?.user_name} !</h1>
                <p className="text-gray-600">De quel artisan avez-vous besoin aujourd'hui ?</p>
              </div>
              <button className="px-4 py-2 w-40 bg-lightGreen flex items-center justify-center text-white rounded-md" onClick={() => setShowAddTaskForm(true)}>
                <span className='text-l font-bold mr-2'>Planifier un Travail</span>
                <FaCalendarAlt className="text-white text-2xl" />
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-center">Félicitations, votre compte a été créé !</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Travail à venir</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {tasks.map((task, index) => (
                  <TaskCard 
                    key={index} 
                    task={task} 
                    index={index}
                    onDelete={() => deleteTask(index)} 
                    onComplete={() => completeTask(index)}
                    onEdit={() => startEditTask(index)}
                  />
                ))}
                {showAddTaskForm ? (
                  <div className="bg-white rounded-lg shadow-sm w-full">
                    <div className="bg-lightGreen text-white px-3 py-1 rounded-t-lg flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {editingTaskIndex !== null ? 'Modifier Tâche' : 'Nouvelle Tâche'}
                      </span>
                      <FaEllipsisH className="text-sm" />
                    </div>
                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="Titre de la tâche"
                        className="mb-4 w-full border-b border-gray-300 focus:outline-none focus:border-green-500"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                      />
                      <textarea
                        placeholder="Description de la tâche"
                        className="mb-4 w-full border-b border-gray-300 focus:outline-none focus:border-green-500"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                      ></textarea>
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                          <input
                            type="date"
                            placeholder="Date"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-green-500"
                            value={newTaskDate}
                            onChange={(e) => setNewTaskDate(e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="time"
                            placeholder="Heure"
                            className="w-full border-b border-gray-300 focus:outline-none focus:border-green-500"
                            value={newTaskTime}
                            onChange={(e) => setNewTaskTime(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex-1 mb-4">
                        <select
                          className="w-full border-b border-gray-300 focus:outline-none focus:border-green-500"
                          value={newTaskStatus}
                          onChange={(e) => setNewTaskStatus(e.target.value)}
                        >
                          <option value="">Sélectionner Priorité</option>
                          <option value="Haute priorité">Haute priorité</option>
                          <option value="Moyenne">Moyenne</option>
                          <option value="Basse priorité">Basse priorité</option>
                        </select>
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="px-4 py-2 bg-lightGreen text-white rounded-md"
                          onClick={addOrUpdateTask}
                        >
                          {editingTaskIndex !== null ? 'Modifier' : 'Ajouter'}
                        </button>
                      </div>
                    </div>
                  </div>
                ): (
                  <div
                    className="bg-white rounded-lg shadow-sm w-full flex items-center justify-center cursor-pointer"
                    onClick={() => setShowAddTaskForm(true)}
                  >
                    <FaPlus className="text-lightGreen text-4xl" />
                  </div>
                )}
              
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-6">
               
                <h3 className="text-lg font-medium mb-4">Objectif atteint</h3>
                <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full">
                    <circle cx="64" cy="64" r="50" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                    <circle cx="64" cy="64" r="50" stroke="#FBB03B" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={2 * Math.PI * 50} strokeDashoffset={2 * Math.PI * 50 * (1 - progressPercentage / 100)} className="transition-all duration-500" />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-semibold fill-current">{progressPercentage.toFixed(0)}%</text>
                </svg>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artisandash;