// LoginForm.js
import React, { useState } from 'react';
import '../../styles/tailwind.css';
import { jwtDecode } from 'jwt-decode';
import { handleLogin } from '../../handlers/LoginHandler';
import GoogleSignIn from './GoogleSignIn';
import PinUpdateCard from './changeDefaultPin';
import updatePin from './updatePinHandler';

const LoginForm = () => {
  const [state, setState] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    address: '',
    username: '',
    password: '',
  });

  const [showPinUpdate, setShowPinUpdate] = useState(false); // New state for PIN check


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCallbackResponse = (response) => {
    try {

      const userObject = jwtDecode(response.credential);
      console.log('Decoded user object:', JSON.stringify(userObject, null, 2));
      const GoogleLoginData = {
        email: userObject.email,
        isVerified: userObject.email_verified,
      };

      console.log(`Google login data: ${JSON.stringify(GoogleLoginData)}`);

      // Ensure proper error handling in LoginWithGoogle function
      handleLogin(GoogleLoginData);
    } catch (error) {
      console.log('error decoding token');
      console.error('Error decoding JWT or processing Google login:', error.message);
    }
  };

  const handlePinUpdate = async (name, newPin) => {
    try {
      // Call the updatePin function with the provided data
      await updatePin(name, newPin);

      // After PIN update, redirect to the dashboard
      window.location.href = '/clientDashboard';
    } catch (error) {
      console.error(`Error updating PIN: ${error.message}`);
      // Handle the error as needed
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(state, (loginData) => handleSuccessfulLogin(loginData, setShowPinUpdate));
  };

  return (
    <form className='mx-auto gap-6 w-full object-contain p-10 flex flex-col items-center' onSubmit={handleSubmit}>
      <div className='form-group  w-5/6'>
        <label></label>
        <input
          className='mx-auto w-full rounded-full shadow-inner border-opacity-.5 p-1 px-4'
          type='text'
          name='username'
          placeholder='Username'
          value={state.username}
          onChange={handleInputChange}
        />
      </div>
      <div className='form-group w-5/6'>
        <label></label>
        <input
          className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
          type='password'
          name='password'
          placeholder='Password'
          value={state.password}
          onChange={handleInputChange}
        />
      </div>
      <div className='button-container flex flex-col'>
        <button style={{ background: '#ffd485' }} className=' rounded p-1 px-4 text-gray-600 m-2' type='submit'>
          Login
        </button>
        <GoogleSignIn onCallbackResponse={handleCallbackResponse} />

        

      </div>
      {showPinUpdate && <PinUpdateCard onSubmit={handlePinUpdate} />}

    </form>
  );
};

export default LoginForm;
