"use client";
import Link from "next/link";
import Navbar from "./components/Navbar/Navbar";
import "./not-found/not-found.css"
export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="not-found-container">
        <div className="astronaut-scene">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
          <div className="shooting-stars"></div>

          <div className="not-found-card">
            <div className="astronaut">
              <div className="helmet">
                <div className="reflection"></div>
                <div className="visor-glare"></div>
              </div>
              <div className="body">
                <div className="backpack"></div>
              </div>
              <div className="arms">
                <div className="arm left"></div>
                <div className="arm right"></div>
              </div>
              <div className="legs">
                <div className="leg left"></div>
                <div className="leg right"></div>
              </div>
            </div>

            <div className="content">
              <div className="error-number shatter">404</div>
              <h1 className="not-found-title">Lost in Space</h1>
              <p className="not-found-subtitle">
                This page could not be found.
              </p>
              <div className="not-found-actions">
                <Link href="/" className="home-btn">
                  ← Back to Home
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
