"use client"
import { useState } from "react"
import "./reservation.css"

export default function ReservationPage() {

const [date,setDate] = useState("")
const [time,setTime] = useState("")
const [guests,setGuests] = useState("2")

return (

<div className="reservation-container">

<div className="reservation-card">

<h1 className="reservation-title">Reserve a Table</h1>
<p className="reservation-subtitle">
Book your table in advance and enjoy a seamless dining experience.
</p>

<form className="reservation-form">

<div className="form-row">

<div className="input-group">
<label>Full Name *</label>
<input type="text" placeholder="Enter your name" required/>
</div>

<div className="input-group">
<label>Phone *</label>
<input type="tel" placeholder="Enter phone number" required/>
</div>

</div>

<div className="form-row">

<div className="input-group">
<label>Date *</label>
<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
required
/>
</div>

<div className="input-group">
<label>Time *</label>
<input
type="time"
value={time}
onChange={(e)=>setTime(e.target.value)}
required
/>
</div>

</div>

<div className="form-row">

<div className="input-group">
<label>Guests *</label>

<select
value={guests}
onChange={(e)=>setGuests(e.target.value)}
>

<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>

</select>

</div>

<div className="input-group">
<label>Occasion</label>

<select>
<option>None</option>
<option>Birthday</option>
<option>Anniversary</option>
<option>Date Night</option>
<option>Business Meeting</option>
</select>

</div>

</div>

<div className="input-group">
<label>Special Request</label>
<textarea placeholder="Add any request (optional)"></textarea>
</div>

<button className="reserve-btn">
Reserve Table
</button>

</form>

</div>

</div>

)
}