import { useState } from "react";
import { updateTask, deleteTask } from "../services/taskService";

const priorityColors = {
  low: "#4caf50",
  medium: "#ff9800",
  high: "#f44336",
};

const TaskItem = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate?.substring(0, 10));

  const handleUpdate = async () => {
    await updateTask(task._id, {
      title,
      description,
      dueDate,
    });
    setIsEditing(false);
    onUpdate();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

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
        border: "1px solid #ddd",
        borderLeft: `6px solid ${priorityColors[task.priority]}`,
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "6px",
        background: "#fff",
      }}
    >
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <br />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: task.status === "completed" ? "green" : "orange",
              }}
            >
              {task.status}
            </span>
          </p>

          <p>
            <strong>Due:</strong>{" "}
            {new Date(task.dueDate).toLocaleDateString()}
          </p>

          <div style={{ marginTop: "8px" }}>
            <button onClick={() => setIsEditing(true)}>Edit</button>{" "}
            <button onClick={toggleStatus}>
              Mark {task.status === "pending" ? "Completed" : "Pending"}
            </button>{" "}
            <button onClick={handleDelete} style={{ color: "red" }}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
