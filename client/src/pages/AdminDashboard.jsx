import { useEffect, useState } from "react";
import { getUsers, deleteUser, makeAdmin } from "../services/adminService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    loadUsers();
  };

  const handleMakeAdmin = async (id) => {
    await makeAdmin(id);
    loadUsers();
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h4>Users</h4>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={{ borderTop: "1px solid #ddd" }}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                {user.role !== "admin" && (
                  <button onClick={() => handleMakeAdmin(user._id)}>
                    Make Admin
                  </button>
                )}

                <button
                  onClick={() => handleDelete(user._id)}
                  style={{ marginLeft: "8px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
