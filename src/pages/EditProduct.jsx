import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: "", count: "" },
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const handleUpdate = async () => {
    if (!product.title || !product.price || !product.image || !product.description || !product.category || !product.rating.rate || !product.rating.count) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        alert("Product updated successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="mb-4 text-center">Edit Product</h2>
      <div className="card p-4 shadow">
        <div className="row g-2">
          {["title", "price", "category", "image"].map((field) => (
            <div key={field} className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder={field}
                value={product[field]}
                onChange={(e) => setProduct({ ...product, [field]: e.target.value })}
              />
            </div>
          ))}
          <div className="col-12">
            <textarea
              className="form-control"
              placeholder="Description"
              rows="3"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            ></textarea>
          </div>
          {["rate", "count"].map((field) => (
            <div key={field} className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder={`Rating ${field}`}
                value={product.rating[field]}
                onChange={(e) => setProduct({ ...product, rating: { ...product.rating, [field]: e.target.value } })}
              />
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-3" onClick={handleUpdate}>
          Update Product
        </button>
      </div>
    </div>
  );
}

export default EditProduct;
