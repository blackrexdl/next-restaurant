"use client"
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import './reservation.css';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    request: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.date && formData.time) {
      alert('Reservation request sent! Will confirm soon.');
    } else {
      alert('Please fill all required fields.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="reservation-hero">
        <div className="container">
          <Link href="/" className="back-button">
            ← Back to Home
          </Link>
          <div className="reservation-content">
            <div className="illustration">
              <div className="table-scene">
                <div className="tablecloth"></div>
                <div className="plate"></div>
                <div className="chair"></div>
                <div className="candles"></div>
              </div>
              <div className="calendar-badge">
                Book Your Table
              </div>
            </div>
            <div className="form-section">
              <h1 className="form-title">Reserve Your Table</h1>
              <p className="form-subtitle">Perfect dining experience awaits</p>
              <form onSubmit={handleSubmit} className="glass-form">
                <div className="input-row">
                  <div className="glass-input">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                    <label>Full Name</label>
                  </div>
                  <div className="glass-input">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                    <label>Phone Number</label>
                  </div>
                </div>
                <div className="input-row">
                  <div className="glass-input">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                    <label>Date</label>
                  </div>
                  <div className="glass-input">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                    <label>Time</label>
                  </div>
                </div>
                <div className="input-row">
                  <div className="glass-input">
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests</option>
                    </select>
                    <label>Number of Guests</label>
                  </div>
                  <div className="glass-input">
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select Occasion</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="date-night">Date Night</option>
                      <option value="business">Business</option>
                    </select>
                    <label>Occasion (Optional)</label>
                  </div>
                </div>
                <div className="glass-input full">
                  <textarea
                    name="request"
                    value={formData.request}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Special requests..."
                    rows="4"
                  ></textarea>
                  <label>Special Requests</label>
                </div>
                <button type="submit" className="submit-btn">
                  Reserve Table Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
