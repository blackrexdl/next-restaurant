"use client";

export default function DeliveryForm() {

  return (
    <div className="delivery-form">

      <h2>Delivery Information</h2>

      <div className="form-grid">

        <div className="input-group">
          <input className="input-field"/>
          <label>Full Name</label>
        </div>

        <div className="input-group">
          <input className="input-field"/>
          <label>Phone</label>
        </div>

        <div className="input-group">
          <textarea className="input-field textarea"/>
          <label>Address</label>
        </div>

        <div className="input-group">
          <input className="input-field"/>
          <label>City</label>
        </div>

        <div className="input-group">
          <input className="input-field"/>
          <label>Pincode</label>
        </div>

      </div>

    </div>
  );
}