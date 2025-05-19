import { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import TaskFormModal from "./TaskFormModal";
// Need to add this for React 18 compatibility with react-beautiful-dnd
import { useLayoutEffect } from 'react';
window.addEventListener('error', e => {
  if (e.message === 'ResizeObserver loop limit exceeded') {
    e.stopImmediatePropagation();
  }
});

const columns = ["todo", "inprogress", "done"];
const columnTitles = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await fetchTasks();
        setTasks(res.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTasks();
  }, []);

  const onDragEnd = async (result) => {
    const { draggableId, destination, source } = result;
    
    // Return if no destination or if dropped in the same place
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Find the task that was dragged
    const taskToUpdate = tasks.find((task) => task._id === draggableId);
    
    if (!taskToUpdate) return;
    
    // Create updated task with new status
    const updatedTask = {
      ...taskToUpdate,
      status: destination.droppableId
    };
    
    try {
      // Update task in database
      await updateTask(draggableId, updatedTask);
      
      // Update tasks in state
      setTasks(tasks.map((task) => 
        task._id === draggableId ? updatedTask : task
      ));
    } catch (error) {
      console.error("Failed to update task status:", error);
      // Optionally, add error handling UI here
    }
  };

  const handleSubmit = async (formData) => {
    if (editingTask) {
      const updated = { ...editingTask, ...formData };
      await updateTask(editingTask._id, updated);
      setTasks(tasks.map((t) => (t._id === editingTask._id ? updated : t)));
    } else {
      const res = await createTask(formData);
      setTasks([...tasks, res.data]);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-4 py-2 mb-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Task
      </button>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />

      {loading ? (
        <div className="text-center py-10">Loading tasks...</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columns.map((col) => (
              <Column
                key={col}
                status={col}
                title={columnTitles[col]}
                tasks={tasks.filter((t) => t.status === col)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}