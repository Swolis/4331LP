// client/src/compoonents/SystemLogin/Login.js

import React, { Component } from 'react';
import LoginForm from './SystemLoginForm'; // Import LoginForm component

// styles
import '../../styles/SystemLogin.css';

class SystemLogin extends Component 
{
    render (){
        return (
<div className='flex justify-center items-center h-screen bg-gradient-to-br from-white to-green-200'>
    <div id='form-card' className="form-card w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 to-white bg-opacity-20 py-10 w-4/5 max-w-md drop-shadow-2xl rounded-xl">
        <h2 className='mt-0 mb-4 text-2xl font-semibold'>Login</h2>
        <LoginForm />{/* Render the LoginForm component here */}
    </div>
</div>


        );
    }
}

export default SystemLogin;