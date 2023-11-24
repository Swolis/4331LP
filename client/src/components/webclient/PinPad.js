import React, { useState, useEffect } from 'react';

function PinPad ({ mode, setMode }){

  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  const validatePin = (pin) => {
    // Replace this with your actual logic for validating the pin
    const validPin = ['1234'];
    const managerPin = ['5678']; 
    const isManagerPin = managerPin.includes(pin);
    return ((validPin.includes(pin) || managerPin.includes(pin)) ? (isManagerPin ? 2 : 1) : 0);
  };

  const handlePinSubmit = () => {
    const newMode = validatePin(enteredPin);

    if (newMode > 0) {
      setMode(newMode);
      setPinError('');
    } else {
      setPinError('PIN invalid');
    }
  };

  const handlePinPadClick = (digit) => {
    setEnteredPin(enteredPin + digit);
  };

  const deleteDigit = () => {
    setEnteredPin(enteredPin.slice(0, -1));
    console.log(enteredPin);
  }

  useEffect(() => {
    // Reset enteredPin and pinError when the mode changes
    setEnteredPin('');
    setPinError('');
  }, [mode]);

  return (
    <div className="flex flex-col">
      {mode === 0 && (
        <div className="pin-pad-container bg-slate-200 rounded shadow-md items-center">
          <h1 className='text-3xl'style={{margin: 'auto', width: '130px'}}>Enter PIN</h1>
          <div className="pin-display">{enteredPin.replace(/./g, '*')}</div>
          <div className="pin-pad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <button style={{background: '#ffd485'}} className=' rounded p-6 px-8 text-gray-600 m-2' key={digit} onClick={() => handlePinPadClick(digit)}>
                {digit}
              </button>
            ))}
            <button style={{background: '#ffd485'}} className=' rounded p-6 px-8 text-gray-600 m-2 icon' onClick={deleteDigit}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                </svg>
            </button>
            <button style={{background: '#ffd485'}} className=' rounded p-6 px-8 text-gray-600 m-2' key={0} onClick={() => handlePinPadClick(0)}>
                0
              </button>
            <button style={{background: '#ffd485'}} className=' rounded p-6 px-8 text-gray-600 m-2 icon' onClick={handlePinSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
          </div>
          {pinError && <p className="error-message">{pinError}</p>}
        </div>
      )}

    </div>
  );
};

export default PinPad;
