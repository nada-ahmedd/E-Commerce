import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ControlPanel() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="d-flex">
      <aside className="bg-dark text-white p-5 vh-100" style={{ width: "350px" }}>
        <h2>Control Panel</h2>
        <ul className="list-unstyled">
          <li className="mb-5">
            <Link to="/dashboard/users" className="text-white text-decoration-none">Users Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/products" className="text-white text-decoration-none">Products Dashboard</Link>
          </li>
        </ul>
      </aside>

      <div className="container p-4">
        <h2>Dashboard Overview</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow p-3 mb-4">
              <h5>Users</h5>
              <p>Total Users: {users.length}</p>
              {users.length > 0 && <p>Last Registered: {users[users.length - 1].username}</p>}
              <Link to="/dashboard/users" className="btn btn-primary">View Users</Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-3 mb-4">
              <h5>Products</h5>
              <p>Total Products: {products.length}</p>
              {products.length > 0 && <p>Last Added: {products[products.length - 1].title}</p>}
              <Link to="/dashboard/products" className="btn btn-primary">View Products</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
