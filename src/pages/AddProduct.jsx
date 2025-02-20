import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: "", count: "" },
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);

      const lastId = data.length > 0 ? Math.max(...data.map((p) => p.id)) : 0;
      setNewProduct((prev) => ({ ...prev, id: lastId + 1 }));
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const validateFields = () => {
    let errors = {};
    
    if (!newProduct.title.trim()) errors.title = "Title is required!";
    if (!newProduct.price.trim() || isNaN(newProduct.price) || newProduct.price <= 0) 
      errors.price = "Valid price is required!";
    if (!newProduct.category.trim()) errors.category = "Category is required!";
    if (!newProduct.image.trim()) errors.image = "Image URL is required!";
    if (!newProduct.description.trim()) errors.description = "Description is required!";
    if (!newProduct.rating.rate.trim() || isNaN(newProduct.rating.rate) || newProduct.rating.rate < 0 || newProduct.rating.rate > 5) 
      errors.rate = "Rating rate must be between 0 and 5!";
    if (!newProduct.rating.count.trim() || isNaN(newProduct.rating.count) || newProduct.rating.count < 0) 
      errors.count = "Valid rating count is required!";
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateFields()) return;

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="mb-4 text-center">Add New Product</h2>

      <div className="card p-4 shadow">
        <div className="row g-2">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Product Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
            {errors.title && <small className="text-danger">{errors.title}</small>}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            {errors.price && <small className="text-danger">{errors.price}</small>}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            {errors.category && <small className="text-danger">{errors.category}</small>}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            {errors.image && <small className="text-danger">{errors.image}</small>}
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              placeholder="Description"
              rows="3"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            ></textarea>
            {errors.description && <small className="text-danger">{errors.description}</small>}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Rating Rate (0-5)"
              value={newProduct.rating.rate}
              onChange={(e) => setNewProduct({ ...newProduct, rating: { ...newProduct.rating, rate: e.target.value } })}
            />
            {errors.rate && <small className="text-danger">{errors.rate}</small>}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Rating Count"
              value={newProduct.rating.count}
              onChange={(e) => setNewProduct({ ...newProduct, rating: { ...newProduct.rating, count: e.target.value } })}
            />
            {errors.count && <small className="text-danger">{errors.count}</small>}
          </div>
        </div>
        <button className="btn btn-success mt-3" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
