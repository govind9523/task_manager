import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTask, updateTask } from "../api/tasks";
import TaskForm from "../components/TaskForm";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, data: task, error } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => fetchTask(id),
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      navigate("/");
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm onSubmit={updateTaskMutation.mutate} initialValue={task} />
    </div>
  );
};

export default EditTask;