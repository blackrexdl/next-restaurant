"use client";

export default function OrderNotes({ note, setNote }) {

  return (
    <div className="order-notes">

      <h2>Order Notes</h2>

      <div className="note-options">

        <button
          type="button"
          onClick={() => {
            const text = "No onions please";
            setNote((prev) => {
              if (!prev) return text;
              if (prev.includes(text)) return prev;
              return `${prev}, ${text}`;
            });
          }}
          className="note-chip"
        >
          No onions please
        </button>

        <button
          type="button"
          onClick={() => {
            const text = "Extra spicy";
            setNote((prev) => {
              if (!prev) return text;
              if (prev.includes(text)) return prev;
              return `${prev}, ${text}`;
            });
          }}
          className="note-chip"
        >
          Extra spicy
        </button>

        <button
          type="button"
          onClick={() => {
            const text = "Ring the doorbell";
            setNote((prev) => {
              if (!prev) return text;
              if (prev.includes(text)) return prev;
              return `${prev}, ${text}`;
            });
          }}
          className="note-chip"
        >
          Ring the doorbell
        </button>

        <button
          type="button"
          onClick={() => {
            const text = "Call before delivery";
            setNote((prev) => {
              if (!prev) return text;
              if (prev.includes(text)) return prev;
              return `${prev}, ${text}`;
            });
          }}
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