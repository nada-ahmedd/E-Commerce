import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UsersDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const updateRole = async (id, newRole) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users Dashboard</h2>
        <Link to="/dashboard/products/add" className="btn btn-primary">
          + Add User
        </Link>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/dashboard/users/view/${user.id}`} className="btn btn-info btn-sm me-2">
                  View
                </Link>
                <Link to={`/dashboard/users/edit/${user.id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm me-2" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
                {user.role !== "admin" ? (
                  <button className="btn btn-success btn-sm me-2" onClick={() => updateRole(user.id, "admin")}>
                    Make Admin
                  </button>
                ) : (
                  <button className="btn btn-secondary btn-sm" onClick={() => updateRole(user.id, "user")}>
                    Remove Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersDashboard;
