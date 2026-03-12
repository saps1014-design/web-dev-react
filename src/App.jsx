import { useState, useEffect } from 'react';
import './App.css'
import './components/TaskCard/TaskCard.css'
import TaskCard from './components/TaskCard/TaskCard';


const name = "Sergio";


function App() {


  //run on rendering
  //useEffect(() => {console.log("use effect running")});

  //run once
  //useEffect(() => {console.log("Run once")}, []);



  const [tasks, updateTasks] =  useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [formData, updateFormData] = useState({
    title: "",
    priority: "High",
    dueDate: "",
  });

  const [lastModified, setLastModified] = useState(() => {
    return localStorage.getItem("lastModified") || "Not updated yet";
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    const time = new Date().toLocaleTimeString();
    setLastModified(time);
    localStorage.setItem("lastModified", time);
  }, [tasks]);

   useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function addTask() {
  
    if (formData.title.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: formData.title,
      priority: formData.priority,
      dueDate: formData.dueDate,
    }

    updateTasks([...tasks, newTask]);

    updateFormData({
      title: "",
      priority: "High",
      dueDate: "",
    });
  }

  function onDeleteTask(id) {
    updateTasks(tasks.filter(t => t.id !== id));
  }

  function clearAllTasks() {
    updateTasks([]);
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className={`app-container ${theme}`}>
      <h1>Hello {name} below are your tasks:</h1>
      <h2>Last updated: {lastModified}</h2>

      <button type="button" onClick={toggleTheme}>
        Current theme: {theme} | Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <form onSubmit={(e) => {
          e.preventDefault();
          addTask();
      }}>
        <div>
          <label>Task name:</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={(e) => updateFormData({
              ...formData,
              [e.target.name]: e.target.value,
            })}
        />
        { formData.title.trim() === "" && <p className="validation">Title required</p>}
      </div>

      <div>
        <label>Priority:</label>
        <select
          name='priority'
          value={formData.priority}
          onChange={(e) => updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
          })}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div>
        <label>Due date:</label>
        <input
          type='text'
          name='dueDate'
          value={formData.dueDate}
          onChange={(e) => updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
          })}
        />
      </div>

      <button type="submit">Add</button>
      <button type="button" onClick={clearAllTasks}>
        Clear All Tasks
      </button>
    </form>
    
    {tasks.map(task => (
      <TaskCard
        key={task.id}
        {...task}
        onDeleteTask={() => onDeleteTask(task.id)}
      />
    ))}
  </div>
);


}

export default App;
