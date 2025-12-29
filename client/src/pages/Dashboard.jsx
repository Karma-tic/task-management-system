import { useState } from "react";
import Layout from "../components/Layout";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Layout>
      <div className="dashboard-container">
        <TaskForm onCreated={() => setRefresh(!refresh)} />
        <TaskList key={refresh} />
      </div>
    </Layout>
  );
};

export default Dashboard;
