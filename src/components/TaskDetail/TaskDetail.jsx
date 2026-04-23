import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  async function getTaskDetail(taskId) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
       const data = await response.json();
      return data.task;
    } catch (error) {
      console.error("Error fetching task:", error);
      return null;
    }
   }

  useEffect(() => {
    async function fetchTask() {
      setLoading(true);
      setError(null);

      const taskData = await getTaskDetail(id);

      if (taskData) {
        setTask(taskData);
      } else {
        setError("Task not found or failed to load.");
      }

      setLoading(false);
    }

    fetchTask();
  }, [id]);

  if (loading) {
    return <p>Loading task details...</p>;
  }

  if (error) {
    return (
      <>
        <h2>{error}</h2>
        <button onClick={() => navigate("/")}>{"<-Back"}</button>
      </>
    );
  }

  return (
    <>
      <h2>Task Title: {task.title}</h2>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate || "No due date"}</p>
      <p>Completed: {task.completed ? "Yes" : "No"}</p>
      <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
      <button onClick={() => navigate("/")}>{"<-Back"}</button>
    </>
  );
}

export default TaskDetail;