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

  const [phoneError, setPhoneError] = useState("");
  const [selectedNotes, setSelectedNotes] = useState([]);

  return (
    <div className="reservation-box">

      <h2>Reserve a Table</h2>

      <div className="form-grid">

        <div className="input-group">
          <input type="text" required className="input-field" value={reserveName}
          onChange={(e)=>setReserveName(e.target.value.toUpperCase())} />
          <label>Full Name</label>
        </div>

        <div className="input-group">
          <input type="tel" required pattern="[0-9]{10}" className="input-field" value={reservePhone}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
            setReservePhone(val);

            if (val.length < 10) {
              setPhoneError("Enter valid 10-digit number");
            } else {
              setPhoneError("");
            }
          }} />
          <label>Phone</label>
        </div>
        {phoneError && <p className="input-error-text">{phoneError}</p>}

        <div className="input-group">
          <input type="date" min={new Date().toISOString().split("T")[0]} className="input-field"
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
            <option value="">Select Guests</option>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
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

        <div className="note-chips">
          {["Window seat", "Birthday setup", "Anniversary decor", "High chair", "Quiet corner"].map((note) => (
            <button
              key={note}
              type="button"
              className={`chip ${selectedNotes.includes(note) ? "active" : ""}`}
              onClick={() => {
                setSelectedNotes((prev) => {
                  if (prev.includes(note)) {
                    const updated = prev.filter(n => n !== note);
                    setReserveNote(updated.join(", "));
                    return updated;
                  } else {
                    const updated = [...prev, note];
                    setReserveNote(updated.join(", "));
                    return updated;
                  }
                });
              }}
            >
              {note}
            </button>
          ))}
        </div>

        <div className="input-group">
          <textarea
          className="input-field textarea"
          value={reserveNote}
          onChange={(e)=>setReserveNote(e.target.value)} />
          <label>Special Request</label>
        </div>

      </div>

      <button
        className="reserve-btn"
        onClick={() => {
          if (!reserveName || !reservePhone || !reserveDate || !reserveTime || !reserveGuests || phoneError) {
            alert("Please fill all required fields");
            return;
          }
          window.location.href = "/reservation";
        }}
      >
        Reserve Table →
      </button>

    </div>
  );
}