import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import { addToCart } from "../utils/cartUtils"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 5)))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  return (
    <div>
      <HeroSection />

      <div className="container mt-5">
        <h2 className="mb-4">Featured Products</h2>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card custom-card">
                <img src={product.image} alt={product.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>

                  <div className="d-flex">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} style={{ color: index < Math.round(product.rating.rate) ? "gold" : "gray" }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted">{product.rating.count} ratings</p>
                </div>

                <div className="add-to-cart w-100 text-center p-3">
                  <button className="btn custom-btn" onClick={() => addToCart(product, cart, setCart)}>
                    Add to Cart <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
