"use client";

import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {

  const { cart } = useCart();

  const total = cart.reduce((sum, item) => {
    const qty = item.qty ?? 1;
    const price = Number(item.price) || 0;
    return sum + price * qty;
  }, 0);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={item.id ?? index}>
                {item.name} × {item.qty ?? 1} — ₹
                {(item.qty ?? 1) * item.price}
              </li>
            ))}
          </ul>

          <h2>Total: ₹{total}</h2>

          <button
            style={{
              padding: "10px 20px",
              background: "#ff4d4d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              marginTop: "20px"
            }}
          >
            Place Order
          </button>
        </>
      )}
    </main>
  );
}