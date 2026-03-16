"use client";
import { useState } from "react";
import Link from "next/link";

export default function ReservationForm() {

  const [reserveName,setReserveName]=useState("");
  const [reservePhone,setReservePhone]=useState("");
  const [reserveDate,setReserveDate]=useState("");
  const [reserveTime,setReserveTime]=useState("");
  const [reserveGuests,setReserveGuests]=useState("2");
  const [reserveOccasion,setReserveOccasion]=useState("");
  const [reserveNote,setReserveNote]=useState("");

  return (
    <div className="reservation-box">

      <h2>Reserve a Table</h2>

      <div className="form-grid">

        <div className="input-group">
          <input className="input-field" value={reserveName}
          onChange={(e)=>setReserveName(e.target.value)} />
          <label>Full Name</label>
        </div>

        <div className="input-group">
          <input className="input-field" value={reservePhone}
          onChange={(e)=>setReservePhone(e.target.value)} />
          <label>Phone</label>
        </div>

        <div className="input-group">
          <input type="date" className="input-field"
          value={reserveDate}
          onChange={(e)=>setReserveDate(e.target.value)} />
          <label>Date</label>
        </div>

        <div className="input-group">
          <input type="time" className="input-field"
          value={reserveTime}
          onChange={(e)=>setReserveTime(e.target.value)} />
          <label>Time</label>
        </div>

        <div className="input-group">
          <select className="input-field"
          value={reserveGuests}
          onChange={(e)=>setReserveGuests(e.target.value)}>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
          </select>
          <label>Guests</label>
        </div>

        <div className="input-group">
          <select className="input-field"
          value={reserveOccasion}
          onChange={(e)=>setReserveOccasion(e.target.value)}>
            <option value="">Occasion</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Date</option>
          </select>
          <label>Occasion</label>
        </div>

        <div className="input-group">
          <textarea
          className="input-field textarea"
          value={reserveNote}
          onChange={(e)=>setReserveNote(e.target.value)} />
          <label>Special Request</label>
        </div>

      </div>

      <Link href="/reservation">
        <button className="reserve-btn">
          Reserve Table →
        </button>
      </Link>

    </div>
  );
}