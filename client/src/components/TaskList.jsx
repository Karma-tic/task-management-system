import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskItem from "./TaskItem";
import "../styles/dashboard.css";

const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sortByPriority, setSortByPriority] = useState(false);

  const fetchTasks = async () => {
    const data = await getTasks(page);

    let taskList = data.tasks || [];

    if (sortByPriority) {
      taskList = [...taskList].sort(
        (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    }

    setTasks(taskList);
    setPages(data.pagination.pages || 1);
  };

  useEffect(() => {
    fetchTasks();
  }, [page, sortByPriority]);

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h3 className="section-title">Your Tasks</h3>

        <button
          onClick={() => setSortByPriority((prev) => !prev)}
          style={{
            padding: "6px 12px",
            fontSize: "13px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            background: sortByPriority ? "#4f46e5" : "#f5f5f5",
            color: sortByPriority ? "#fff" : "#333",
            cursor: "pointer",
          }}
        >
          {sortByPriority ? "Sorted by Priority" : "Sort by Priority"}
        </button>
      </div>

      {tasks.length === 0 && <p>No tasks created yet.</p>}

      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={fetchTasks} />
      ))}

      {tasks.length > 0 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            Page {page} of {pages}
          </span>

          <button disabled={page === pages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
