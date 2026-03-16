"use client";
import { useState } from "react";

export default function PaymentMethod(){

const [paymentMethod,setPaymentMethod]=useState("cod");

return (

<div className="payment-method">

<h2>Payment Method</h2>

<div className="payment-options">

<label className="payment-option">
<input
type="radio"
checked={paymentMethod==="cod"}
onChange={()=>setPaymentMethod("cod")}
/>
<span>Cash on Delivery</span>
</label>

<label className="payment-option">
<input
type="radio"
checked={paymentMethod==="upi"}
onChange={()=>setPaymentMethod("upi")}
/>
<span>UPI</span>
</label>

<label className="payment-option">
<input
type="radio"
checked={paymentMethod==="card"}
onChange={()=>setPaymentMethod("card")}
/>
<span>Credit / Debit Card</span>
</label>

</div>

</div>

);

}