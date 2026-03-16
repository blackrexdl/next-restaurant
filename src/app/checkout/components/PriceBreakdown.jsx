import "./checkout.css";
export default function PriceBreakdown({ subtotal, deliveryFee, tax, discount, total }) {

  return (
    <div className="price-breakdown">

      <div className="price-row">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="price-row">
        <span>Delivery Fee</span>
        <span>₹{deliveryFee}</span>
      </div>

      <div className="price-row">
        <span>Tax (5%)</span>
        <span>₹{tax}</span>
      </div>

      {discount > 0 && (
        <div className="price-row">
          <span>Promo Discount</span>
          <span>-₹{discount}</span>
        </div>
      )}

      <div className="price-total">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

    </div>
  );
}