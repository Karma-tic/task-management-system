import { useState } from "react";
import Layout from "../components/Layout";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <Layout>
      <TaskForm onCreated={() => setRefresh(!refresh)} />
      <TaskList key={refresh} />
    </Layout>
  );
};

export default Dashboard;
