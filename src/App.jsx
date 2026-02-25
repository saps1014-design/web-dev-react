import { useState } from "react";
import './App.css'
import TaskCard from './components/TaskCard/TaskCard'

const name = "Andrey";

function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      dueDate: "Tomorrow",
      priority: "High",
      assignedTo: "Andrey",
      status: "Pending",
    },

    {
      id: 2,
      title: "Task 2",
      dueDate: "Tomorrow",
      priority: "High",
      assignedTo: "Andrey",
      status: "Pending",
    },
  
    {
      id: 3,
      title: "Task 3",
      dueDate: "Tomorrow",
      priority: "High",
      assignedTo: "Andrey",
      status: "Pending",
    },
   ]); 
  
  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title: "New Task",
      dueDate: "Soon",
      priority: "Low",
      assignedTo: name,
      status: "Pending",
    };

     setTasks([...tasks, newTask]);
     };
  
     const removeLastTask = () => {
    setTasks(tasks.slice(0, -1));
  };
  return (
    <>
      <h1>Hello {name} below are your tasks:</h1>

      <h2>Total Tasks: {tasks.length}</h2>

      <button onClick={addTask}>Add New Task</button>
      <button onClick={removeLastTask}>Remove Last Task</button>

      {tasks.map((task) => (
        <div key={task.id}>
          <TaskCard {...task} />

          <button onClick={() => console.log(task.id)}>
            Show ID
          </button>
        </div>
      ))}
    </>
  );
}

export default App;


