import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CartPage = ({ cart, addToCart, removeFromCart }) => {
  const getTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="row">
          {cart.map((product) => (
           <div className="col-md-4 mb-4" key={product.id}>
  <div className="card cart-card">
    <img src={product.image} alt={product.title} className="card-img-top" />
    <div className="card-body">
      <h5 className="card-title">{product.title}</h5>
      <p className="card-text">${product.price}</p>

      <div className="d-flex">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} color={index < product.rating.rate ? "gold" : "gray"} />
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-danger btn-quantity" onClick={() => removeFromCart(product.id)}>
          -
        </button>
        <span className="fw-bold">{product.quantity}</span>
        <button className="btn btn-success btn-quantity" onClick={() => addToCart(product)}>
          +
        </button>
      </div>

      <p className="total-price mt-2">Total: ${product.price * product.quantity}</p>
    </div>
  </div>
</div>
          ))}
        </div>
      )}
      <h3>Total Cart: ${getTotal().toFixed(2)}</h3>
      <Link to="/" className="btn btn-primary">Continue Shopping</Link>
    </div>
  );
};

CartPage.propTypes = {
  cart: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartPage;
