"use client";

export default function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="app-loader">
      <div className="loader-glass">

        <div className="donut-loader"></div>

        <p className="loader-text">Loading your experience...</p>

      </div>
    </div>
  );
}