import React, { useState } from 'react';
import { useMode } from './ModeContext';

const PinPad = () => {
  const { toggleMode } = useMode();

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
      toggleMode(newMode);
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
  }

  return (
    <div className="flex justify-center items-center">
        <div className="pin-pad-container bg-gradient-to-br from-slate-200 to-white bg-opacity-20 mt-20 rounded-xl drop-shadow-2xl items-center">
          <h1 className='text-3xl text-center py-4'>Enter PIN</h1>
          <div className="pin-display text-center">{enteredPin.replace(/./g, '*')}</div>
          <div className="pin-pad grid grid-cols-3 grid-rows-4 gap-1 p-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <button className=' rounded p-2 bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                  text-2xl h-20 m-2 rounded-lg shadow 
                                  hover:shadow-lg outline-none 
                                  focus:outline-none 
                                  ease-linear transition-all duration-150' key={digit} onClick={() => handlePinPadClick(digit)}>
                {digit}
              </button>
            ))}
            <button className='bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                              text-2xl text-center m-2 rounded-lg shadow 
                              hover:shadow-lg outline-none 
                              focus:outline-none 
                              ease-linear transition-all duration-150' onClick={deleteDigit}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                </svg>
            </button>
            <button className=' bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold font-uppercase 
                                text-2xl px-8 m-2 rounded-lg shadow 
                                hover:shadow-lg outline-none 
                                focus:outline-none 
                                ease-linear transition-all duration-150' key={0} onClick={() => handlePinPadClick(0)}>
                0
              </button>
            <button className=' bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                text-2xl pl-1 m-2 rounded-lg shadow 
                                hover:shadow-lg outline-none 
                                focus:outline-none 
                                ease-linear transition-all duration-150' onClick={handlePinSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
          </div>
          {pinError && <p className="error-message">{pinError}</p>}
        </div>
    </div>
  );
};

export default PinPad;
