import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteTask, fetchTasks } from "../api/tasks";
import AddTask from "../components/AddTask";

const TaskLists = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, data: tasks, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <AddTask />
      {tasks.map((task) => (
        <div key={task.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <h3 onClick={() => navigate(`/task/${task.id}`)} style={{ cursor: "pointer" }}>
            {task.title}
          </h3>
          <p>Status: {task.status}</p>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <button onClick={() => navigate(`/task/${task.id}/edit`)}>Edit</button>
          <button onClick={() => deleteTaskMutation.mutate(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskLists;