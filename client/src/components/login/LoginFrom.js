import React, { useState, useEffect } from 'react';
import '../../styles/tailwind.css';
import handleLogin, { LoginWithGoogle } from '../../handlers/LoginHandler';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [state, setState] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    address: '',
    username: '',
    password: '',
  });

  const handleCallbackResponse = (response) => {
    try {
      console.log(`Encoded JWT ID token in callback: ${response.credential}`);
      console.log('next line');
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

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []); // empty dependency array to mimic componentDidMount

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(state);
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
        <div id='signInDiv' className='p-1 px-2'>
          {/* future sigIn button */}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
