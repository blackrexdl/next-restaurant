"use client"; // ⚡ Add this at the very top
import { useCart } from "../../../context/CartContext";
import "../CartSidebar/cartsidebar.css";

export default function CartSidebar({ isOpen, setIsOpen }) {
  const { cart, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <aside className="cart-sidebar">
      <button className="close-btn" onClick={() => setIsOpen(false)}>
        Close
      </button>
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}