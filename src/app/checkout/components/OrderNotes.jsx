"use client";

export default function OrderNotes({ note, setNote }) {

  return (
    <div className="order-notes">

      <h2>Order Notes</h2>

      <div className="note-options">

        <button
          type="button"
          onClick={() => setNote("No onions please")}
          className="note-chip"
        >
          No onions please
        </button>

        <button
          type="button"
          onClick={() => setNote("Extra spicy")}
          className="note-chip"
        >
          Extra spicy
        </button>

        <button
          type="button"
          onClick={() => setNote("Ring the doorbell")}
          className="note-chip"
        >
          Ring the doorbell
        </button>

        <button
          type="button"
          onClick={() => setNote("Call before delivery")}
          className="note-chip"
        >
          Call before delivery
        </button>

      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add instructions for the restaurant"
        className="notes-input"
      />

    </div>
  );
}