import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductsDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-product" className="btn btn-primary">Add Product</Link>
      </div>

      <h2 className="mb-4 text-center">Products Dashboard</h2>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} className="img-thumbnail" width="70" />
              </td>
              <td className="align-middle">{product.title}</td>
              <td className="align-middle">${product.price}</td>
              <td className="align-middle">
                <Link to={`/view-product/${product.id}`} className="btn btn-info btn-sm mx-1">View</Link>
                <Link to={`/edit-product/${product.id}`} className="btn btn-warning btn-sm mx-1">Edit</Link>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsDashboard;
