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
      status="Pending"
    />
    <TaskCard
      title="Task 2"
        dueDate="Friday"
        priority="Medium"
        assignedTo="Sergio"
        status="Done"
    />
    <TaskCard 
        title="Task 3"
        dueDate="Next Sunday"
        priority="Low"
        assignedTo="Marijose"
        status="Pending"
      />
    <TaskCard 
        title="Task 4"
        dueDate="Next Week"
        priority="High"
        assignedTo="Andrey"
        status="Done"
      />
    <TaskCard 
        title="Task 5"
        dueDate="Sunday"
        priority="High"
        assignedTo="Carlos"
        status="Pending"
      />
  </>
);


}

export default App;
