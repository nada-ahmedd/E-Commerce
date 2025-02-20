import Swal from "sweetalert2";
import axios from "axios";

export const addToCart = async (product, cart, setCart) => {
  const user = JSON.parse(localStorage.getItem("user")); 
if (!user) {
  Swal.fire({
    title: "Unauthorized",
    text: "You need to log in to add items to the cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Go to Login",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/signin"; 
    }
  });
  return;
}

    const productInCart = cart.find((item) => item.id === product.id);
  if (productInCart) {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);

    try {
      await axios.patch(`http://localhost:5000/cart/${product.id}`, { quantity: productInCart.quantity + 1 });
      Swal.fire({
        title: "Quantity Updated!",
        text: `"${product.title}" quantity increased.`,
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  } else {
    Swal.fire({
      title: "Add to Cart?",
      text: `Do you want to add "${product.title}" to your cart?`,
      iconHtml: '<i class="fas fa-shopping-cart"></i>',
      showCancelButton: true,
      confirmButtonText: "Yes, add it! ",
      cancelButtonText: "Cancel ",
      reverseButtons: true,
      timerProgressBar: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post("http://localhost:5000/cart", { ...product, quantity: 1,userId: user.id, });
          setCart([...cart, response.data]);
          Swal.fire({
            title: "Added! ",
            text: `"${product.title}" has been added to your cart.`,
            icon: "success",
            timer: 2000,
          });
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      }
    });
  }
};

export const removeFromCart = async (id, cart, setCart) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const productInCart = cart.find((item) => item.id === id);
  if (!productInCart) return;

  if (productInCart.quantity > 1) {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);

    try {
      await axios.patch(`http://localhost:5000/cart/${id}`, { quantity: productInCart.quantity - 1 });
      Swal.fire({
        title: "Quantity Updated!",
        text: `"${productInCart.title}" quantity decreased.`,
        icon: "info",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  } else {
    Swal.fire({
      title: "Remove Item?",
      text: `Do you want to remove "${productInCart.title}" from your cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        try {
          await axios.delete(`http://localhost:5000/cart/${id}`);
          Swal.fire({
            title: "Removed!",
            text: `"${productInCart.title}" has been removed from your cart.`,
            icon: "success",
            timer: 2000,
          });
        } catch (error) {
          console.error("Error deleting cart item:", error);
        }
      }
    });
  }
};
