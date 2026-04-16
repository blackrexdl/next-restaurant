"use client";

export default function DeliveryForm() {

  return (
    <div className="delivery-form">

      <h2>Delivery Information</h2>

      <div className="form-grid">

        <div className="input-group">
          <input id="fullName" type="text" name="fullName" className="input-field" placeholder=" " required autoComplete="name" />
          <label htmlFor="fullName" className="floating-label">Full Name</label>
        </div>

        <div className="input-group">
          <input id="phone" type="tel" name="phone" className="input-field" placeholder=" " required autoComplete="tel" />
          <label htmlFor="phone" className="floating-label">Phone Number</label>
        </div>

        <div className="input-group">
          <textarea id="address" name="address" className="input-field textarea" placeholder=" " rows={3} required autoComplete="street-address" />
          <label htmlFor="address" className="floating-label">Delivery Address</label>
        </div>

        <div className="input-group">
          <input id="city" type="text" name="city" className="input-field" placeholder=" " required autoComplete="address-level2" />
          <label htmlFor="city" className="floating-label">City</label>
        </div>

        <div className="input-group">
          <input id="pincode" type="text" name="pincode" className="input-field" placeholder=" " required pattern="[0-9]{6}" autoComplete="postal-code" />
          <label htmlFor="pincode" className="floating-label">Pincode</label>
        </div>

      </div>

    </div>
  );
}