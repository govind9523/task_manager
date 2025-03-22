import { useState } from "react";

const TaskForm = ({ onSubmit, initialValue }) => {
  const [task, setTask] = useState({
    title: initialValue.title || "",
    description: initialValue.description || "",
    status: initialValue.status || "Pending",
    dueDate: initialValue.dueDate || ""
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: "", description: "", status: "Pending", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;