import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskItem from "./TaskItem";
import "../styles/dashboard.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchTasks = async () => {
    const data = await getTasks(page);
    setTasks(data.tasks);
    setPages(data.pagination.pages);
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  return (
    <div className="card">
      <h3 className="section-title">Your Tasks</h3>

      {tasks.length === 0 && <p>No tasks created yet.</p>}

      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={fetchTasks} />
      ))}

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
    </div>
  );
};

export default TaskList;
