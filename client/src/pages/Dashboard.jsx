import { useState } from "react";
import Layout from "../components/Layout";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/dashboard.css";
import { useAuth } from "../context/AuthContext";

// (we will create this next)
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth(); // 👈 get logged-in user
  const [refresh, setRefresh] = useState(false);

  return (
    <Layout>
      <div className="dashboard-container">

        {/* 👑 ADMIN SECTION */}
        {user?.role === "admin" && (
          <div className="card" style={{ marginBottom: "30px" }}>
            <h3 className="card-title">Admin Panel</h3>
            <AdminDashboard />
          </div>
        )}

        {/* 👤 TASK CREATION */}
        <TaskForm onCreated={() => setRefresh(!refresh)} />

        {/* 📋 TASK LIST */}
        <TaskList key={refresh} />

      </div>
    </Layout>
  );
};

export default Dashboard;
