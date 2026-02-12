import './App.css'
import TaskCard from './components/TaskCard/TaskCard'

const name = "Andrey";



function App() {
  return (
  <>
    <h1>Hello {name} below are your tasks:</h1>
    <TaskCard 
      title="Task 1" 
      dueDate="Tomorrow" 
      priority="High" 
      assignedTo="Andrey"
    />
  </>
);


}

export default App;
