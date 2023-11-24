import React from "react";
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  const clientId = '906739733407-6pfn3vepbkfbtu8ri1ccrv4ucj8eibvj.apps.googleusercontent.com';

  const responseGoogle = (response) => {
    if (response && response.error === 'popup_closed_by_user') {
      // Handle the case where the user closed the popup
      console.log('Google login popup closed by user');
    } else if (response && response.profileObj) {
      // Handle the successful login
      console.log('Google login success:', response);
    } else {
      // Handle other cases (e.g., login failure)
      console.log('Google login failure:', response);
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
