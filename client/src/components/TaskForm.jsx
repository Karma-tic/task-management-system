import { useState } from "react";
import { createTask } from "../services/taskService";
import "../styles/dashboard.css";

const TaskForm = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTask({
      title,
      description,
      dueDate,
      priority,
      assignedTo: JSON.parse(localStorage.getItem("user"))._id,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");

    onCreated();
  };

  return (
    <div className="card">
      <h3 className="card-title">Create Task</h3>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
