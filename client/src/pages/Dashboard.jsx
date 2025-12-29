import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name}</p>

      <button onClick={logout}>Logout</button>

      <hr />

      <TaskForm onCreated={() => setRefresh(!refresh)} />
      <TaskList key={refresh} />
    </div>
  );
};

export default Dashboard;
