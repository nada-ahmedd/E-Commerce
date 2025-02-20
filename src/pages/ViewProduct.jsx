import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="container p-4">
      <h2 className="mb-4 text-center">Product Details</h2>
      <div className="card p-3 shadow">
        <div className="row">
          <div className="col-md-4">
            <img src={product.image} alt={product.title} className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            <h3>{product.title}</h3>
            <p className="text-muted">{product.category}</p>
            <p>{product.description}</p>
            <h4 className="text-primary">${product.price}</h4>
            <p>
              <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
