// GoogleSignIn.js
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { handleLogin } from '../../handlers/LoginHandler';

const GoogleSignIn = ({ onCallbackResponse }) => {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: onCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, [onCallbackResponse]);

  return <div id='signInDiv' className='p-1 px-2'></div>;
};

export default GoogleSignIn;
