const priorityColors = {
  low: "#4caf50",
  medium: "#ff9800",
  high: "#f44336",
};

const TaskItem = ({ task }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        borderLeft: `6px solid ${priorityColors[task.priority]}`,
      }}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      <p>
        <strong>Due:</strong>{" "}
        {new Date(task.dueDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TaskItem;
