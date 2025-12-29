import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, deleteTask, updateTask } from "../services/taskService";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      fetchTask();
    }
  }, [authLoading, user]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const data = await getTaskById(id);
      setTask(data);
    } catch (err) {
      setError("Unable to load task. You may not have access.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(id);
    navigate("/dashboard");
  };

  const toggleStatus = async () => {
    await updateTask(id, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    fetchTask();
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <p style={{ padding: "20px" }}>Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={{ padding: "20px", color: "red" }}>
          <p>{error}</p>
          <button onClick={() => navigate("/dashboard")}>Back</button>
        </div>
      </Layout>
    );
  }

  if (!task) return null;

  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "30px auto" }}>
        <h2>{task.title}</h2>

        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>

        <p>
          <strong>Assigned To:</strong>{" "}
          {task.assignedTo?.name || "Unassigned"}
        </p>

        <div style={{ marginTop: "20px" }}>
          <button onClick={toggleStatus}>
            Mark {task.status === "pending" ? "Completed" : "Pending"}
          </button>

          <button
            onClick={handleDelete}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TaskDetails;
