import { Route, Routes } from "react-router-dom";
import TaskLists from "./pages/TaskLists";
import Task from "./pages/Task";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <div>
      <h1>Task Manager</h1>
      <Routes>
        <Route path="/" element={<TaskLists />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="/task/:id/edit" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;