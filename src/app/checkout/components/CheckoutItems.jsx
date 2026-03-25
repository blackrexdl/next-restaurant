"use client";

export default function CheckoutItems({ cart }) {
  return (
    <ul className="checkout-items">
      {cart.map((item, index) => (
        // add "removing" class dynamically for animation when deleting item
        <li key={item.id ?? index} style={{ "--i": index }}>
          <div className="item-info">
            <span className="item-name">
              {(item.name || item.title || item.productName || "Item")} × 
              <span className="qty-value">{item.qty ?? 1}</span>
            </span>
            <span className="item-price">
              ₹<span className="price-value">{(item.qty ?? 1) * item.price}</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}