// PinUpdateCard.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import updatePin from "../../api/updatePin"; // Import the updatePin function

const PinUpdateCard = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [newPin, setNewPin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && newPin.length === 4) {
      try {
        // Call the onSubmit function (passed from the parent) with the data
        await onSubmit(name, newPin);
      } catch (error) {
        console.error(`Error updating PIN: ${error.message}`);
        // Handle the error as needed
      }
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

PinUpdateCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PinUpdateCard;
