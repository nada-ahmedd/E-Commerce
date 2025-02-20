import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../utils/cartUtils"; 

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const filterProducts = (selectedCategory) => {
    setCategory(selectedCategory);
    setFilteredProducts(
      selectedCategory === "all"
        ? products
        : products?.filter((product) => product.category === selectedCategory)
    );
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center my-3">
        {["all", "men's clothing", "jewelery", "electronics", "women's clothing"].map((cat) => (
          <button
            key={cat}
            className={`btn mx-2 ${category === cat ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => filterProducts(cat)}
          >
            {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card custom-card">
                <img src={product.image} alt={product.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>

                  <div className="stars-container">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} color={index < Math.round(product.rating?.rate) ? "gold" : "gray"} className="me-1" />
                    ))}
                  </div>
                  <p className="text-muted">{product.rating?.count || 0} ratings</p>
                </div>

                <div className="d-flex justify-content-center p-3">
                  <button className="custom-btn" onClick={() => addToCart(product, cart, setCart)}>
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
