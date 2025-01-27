import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const initialTasks = {
  aFaire: [
    { id: "1", title: "Préparer le site d'installation", progress: "7/10", date: "24 Aout 2025" },
    { id: "2", title: "Entretien de chaudière", progress: "4/10", date: "25 Aout 2025" },
    { id: "3", title: "Remplacement de tuyaux", progress: "3/10", date: "26 Aout 2025" },
    { id: "4", title: "Remplacer le tuyau endommagé", progress: "2/14", date: "27 Aout 2025" },
  ],
  enCours: [
    { id: "5", title: "Serrer les raccords du tuyau", progress: "3/10", date: "12 Nov 2025" },
    { id: "6", title: "Informer le client", progress: "7/10", date: "13 Nov 2025" },
    { id: "7", title: "Mesurer le tuyau", progress: "4/10", date: "14 Nov 2025" },
    { id: "8", title: "Entretien de chaudière", progress: "2/23", date: "15 Nov 2025" },
  ],
  terminee: [
    { id: "9", title: "Mesurer le tuyau", progress: "10/10", date: "6 Jan 2025" },
    { id: "10", title: "Rouvir la vanne d'eau", progress: "10/10", date: "7 Jan 2025" },
    { id: "11", title: "Installation d'un lavabo", progress: "10/10", date: "8 Jan 2025" },
  ],
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (event) => {
    setActiveTask(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const sourceListKey = findListKeyByTaskId(active.id);
    const targetListKey = over.id;

    if (sourceListKey && targetListKey && sourceListKey !== targetListKey) {
      const draggedTask = tasks[sourceListKey].find((task) => task.id === active.id);

      setTasks((prevTasks) => {
        const updatedSourceList = prevTasks[sourceListKey].filter((task) => task.id !== active.id);
        const updatedTargetList = [...prevTasks[targetListKey], draggedTask];

        return {
          ...prevTasks,
          [sourceListKey]: updatedSourceList,
          [targetListKey]: updatedTargetList,
        };
      });
    }

    setActiveTask(null);
  };

  const findListKeyByTaskId = (id) => {
    for (const key in tasks) {
      if (tasks[key].some((task) => task.id === id)) {
        return key;
      }
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-r from-[#FFD700] to-[#FFEE90] p-9">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4">
          {Object.keys(tasks).map((key) => (
            <TaskColumn key={key} id={key} tasks={tasks[key]} />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <TaskCard task={findTaskById(tasks, activeTask)} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const TaskColumn = ({ id, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  const columnHeaders = {
    aFaire: "À faire",
    enCours: "En cours",
    terminee: "Terminée",
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-white w-1/3 p-3 rounded-md border-2 border-dashed border-custom_grey min-h-[calc(100vh-8.5rem)] flex flex-col gap-3"
    >
      <h2 className="text-base font-semibold text-gray-700 border-b pb-1 capitalize">
        {columnHeaders[id]}
      </h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskCard = ({ task, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: task.id });

  const style = {
    transform: isDragging ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)` : undefined,
    transition: isDragging ? "none" : transition || "all 0.2s ease",
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-2 rounded-md cursor-grab border border-custom_grey hover:shadow-md transition-all"
    >
      <h3 className="font-medium text-sm text-gray-800">{task.title}</h3>
      <p className="text-xs text-gray-600">Progression: {task.progress}</p>
      <div className="relative w-full h-1.5 bg-gray-200 rounded-full my-1">
        <div
          className="absolute top-0 left-0 h-1.5 bg-orange-500 rounded-full"
          style={{
            width: `${(parseInt(task.progress.split("/")[0]) / parseInt(task.progress.split("/")[1])) * 100}%`,
          }}
        ></div>
      </div>
      <p className="text-[10px] text-gray-500">{task.date}</p>
    </div>
  );
};

const findTaskById = (tasksObj, id) => {
  for (const key in tasksObj) {
    const task = tasksObj[key].find((t) => t.id === id);
    if (task) return task;
  }
  return null;
};

export default TaskBoard;
