import { useState } from "react";
import { updateTask, deleteTask } from "../services/taskService";

const priorityStyles = {
  low: { background: "#e8f5e9", color: "#2e7d32" },
  medium: { background: "#fff3e0", color: "#ef6c00" },
  high: { background: "#fdecea", color: "#c62828" },
};

const statusStyles = {
  pending: { background: "#fff8e1", color: "#f57c00" },
  completed: { background: "#e8f5e9", color: "#2e7d32" },
};

const TaskItem = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate?.substring(0, 10));

  const handleSave = async () => {
    await updateTask(task._id, { title, description, dueDate });
    setIsEditing(false);
    onUpdate();
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(task._id);
    onUpdate();
  };

  const toggleStatus = async () => {
    await updateTask(task._id, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    onUpdate();
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${priorityStyles[task.priority].color}`,
      }}
    >
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleSave}>Save</button>{" "}
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ margin: 0 }}>{task.title}</h3>

            <span
              style={{
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                ...statusStyles[task.status],
              }}
            >
              {task.status}
            </span>
          </div>

          <p style={{ margin: "8px 0", color: "#555" }}>
            {task.description}
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                ...priorityStyles[task.priority],
              }}
            >
              {task.priority.toUpperCase()}
            </span>

            <span style={{ fontSize: "13px", color: "#666" }}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>

          <div
            style={{
              marginTop: "12px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button onClick={() => setIsEditing(true)}>Edit</button>

            <button onClick={toggleStatus}>
              Mark {task.status === "pending" ? "Completed" : "Pending"}
            </button>

            <button
              onClick={handleDelete}
              style={{ color: "#c62828" }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
