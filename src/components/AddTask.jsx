import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";
import TaskForm from "./TaskForm";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleAddTask = (task) => {
    createTaskMutation.mutate({
      id: uuidv4(),
      ...task
    });
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <TaskForm onSubmit={handleAddTask} initialValue={{}} />
    </div>
  );
};

export default AddTask;