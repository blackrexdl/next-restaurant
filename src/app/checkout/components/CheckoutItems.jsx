"use client";
import { useCart } from "../../../context/CartContext";

export default function CheckoutItems() {
  const { cart } = useCart();

  return (
    <ul className="checkout-items">
      {cart.map((item, index) => (
        <li key={item.id ?? index}>
          <div className="item-info">
            <span className="item-name">
              {(item.name || item.title || "Item")} × {item.qty ?? 1}
            </span>

            <span className="item-price">
              ₹{(item.qty ?? 1) * item.price}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}