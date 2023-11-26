import React, { useState, useEffect } from "react";

const PinUpdateCard = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [newPin, setNewPin] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (name && newPin.length === 4) {
        onSubmit(name, newPin);
      } else {
        console.error("Please enter your name and a new 4-digit PIN.");
      }
    };
  
    return (
      <div>
        <h2>Update your PIN</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Your Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
  
          <br />
          <label>
            New PIN:
            <input
              type="password"
              name="newPin"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Update Pin</button>
        </form>
      </div>
    );
  };
  
  export default PinUpdateCard;
