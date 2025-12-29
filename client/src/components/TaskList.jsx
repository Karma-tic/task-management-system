import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskItem from "./TaskItem";

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
    <div>
      <h3 style={{ marginBottom: "16px" }}>Your Tasks</h3>


      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={fetchTasks} />
      ))}

      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
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
