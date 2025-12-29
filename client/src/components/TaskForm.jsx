import { useState } from "react";
import { createTask } from "../services/taskService";

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
    <form onSubmit={handleSubmit}>
      <h3>Create Task</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      <br />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <br />

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
