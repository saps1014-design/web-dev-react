import TaskContext from "../../context/TaskContext";
import { useState, useEffect } from "react";

function TaskContextProvider({ children }) {
  //  const [tasks, updateTasks] = useState(() => {
  //     const savedTasks = localStorage.getItem("tasks");
  //     return savedTasks ? JSON.parse(savedTasks) : [];
  //   });

  const [tasks, updateTasks] = useState([]);
  const [loading, updateLoading] = useState(true);
  const [error, updateError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        updateTasks(data.tasks);
      } catch (err) {
        updateError("Failed to load tasks: " + err.message);
      } finally {
        updateLoading(false);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  function addTask(formData) {
    if (formData.title.trim() === "") {
      return;
    }

    const newTask = {
      title: formData.title,
      priority: formData.priority,
      dueDate: formData.dueDate,
    };

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) throw Error("Unable to add a new task");
        return response.json();
      })
      .then((data) => updateTasks([...tasks, data.task]))
      .catch((err) => {
        updateError("Failed to add task error: " + err.message);
      });
  }

  async function deleteTask(taskId) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting task:", error);
      updateError("Failed to delete task: " + error.message);
      return null;
    }
  }

  async function onDeleteTask(id, title) {
    const confirmed = window.confirm(`Delete task: "${title}"?`);

    if (!confirmed) {
      return;
    }

    const deletedData = await deleteTask(id);

    if (deletedData) {
      updateTasks(tasks.filter((t) => t.id !== id));
    }
  }

  const value = {
    tasks,
    loading,
    error,
    addTask,
    onDeleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskContextProvider;