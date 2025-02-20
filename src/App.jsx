import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";  
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CartPage from "./pages/CartPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ControlPanel from "./pages/ControlPanel";
import UsersDashboard from "./pages/UsersDashboard";
import ProductsDashboard from "./pages/ProductsDashboard";
import EditUser from "./pages/EditUser";
import AddUser from "./pages/AddUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";  
import ViewProduct from "./pages/ViewProduct";
import { addToCart, removeFromCart } from "./utils/cartUtils"

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/control" element={<ControlPanel />} />
          <Route path="/dashboard/users" element={<UsersDashboard />} />
          <Route path="/dashboard/products" element={<ProductsDashboard />} />
          <Route path="/profile/:id" element={<Profile />} /> 
          <Route path="/dashboard/users/view/:id" element={<Profile />} />
          <Route path="/dashboard/users/edit/:id" element={<EditUser />} />
          <Route path="/dashboard/products/add" element={<AddUser />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />  
          <Route path="/view-product/:id" element={<ViewProduct />} />  

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home addToCart={(product) => addToCart(product, cart, setCart)} />} />
          <Route path="/shop" element={<Shop addToCart={(product) => addToCart(product, cart, setCart)} />} />
          <Route path="/cart" element={<CartPage cart={cart} addToCart={(product) => addToCart(product, cart, setCart)} removeFromCart={(id) => removeFromCart(id, cart, setCart)} />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
