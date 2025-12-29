import { useEffect, useState } from "react";
import { createTask } from "../services/taskService";
import { getUsers } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

const TaskForm = ({ onCreated }) => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (user?.role === "admin") {
      loadUsers();
    }
  }, [user]);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      dueDate,
      priority,
    };

    // Only admin can assign
    if (user?.role === "admin") {
      payload.assignedTo = assignedTo;
    }

    await createTask(payload);

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setAssignedTo("");

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

        {/* ADMIN ONLY: Assign user */}
        {user?.role === "admin" && (
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          >
            <option value="">Assign to user</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        )}

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
