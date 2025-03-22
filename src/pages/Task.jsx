import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTask } from "../api/tasks";

const Task = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: task, error } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => fetchTask(id),
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Tasks</button>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
};

export default Task;