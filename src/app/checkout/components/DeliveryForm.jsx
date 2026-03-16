"use client";

export default function DeliveryForm() {

  return (
    <div className="delivery-form">

      <h2>Delivery Information</h2>

      <div className="form-grid">

        <div className="input-group">
          <input type="text" className="input-field" placeholder=" " />
          <label>Full Name</label>
        </div>

        <div className="input-group">
          <input type="tel" className="input-field" placeholder=" " />
          <label>Phone Number</label>
        </div>

        <div className="input-group">
          <textarea className="input-field textarea" placeholder=" " />
          <label>Delivery Address</label>
        </div>

        <div className="input-group">
          <input type="text" className="input-field" placeholder=" " />
          <label>City</label>
        </div>

        <div className="input-group">
          <input type="text" className="input-field" placeholder=" " />
          <label>Pincode</label>
        </div>

      </div>

    </div>
  );
}