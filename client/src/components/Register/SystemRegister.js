// client/src/compoonents/SystemRegister/Register.js

import React, { Component } from 'react';
import RegisterForm from './SystemRegisterForm'; // Import RegisterForm component

// styles
import '../../styles/SystemRegister.css';

class SystemRegister extends Component 
{
    render (){
        return (
<div className='flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-pink-500'>
    <div id='form-card' className="form-card w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 to-white bg-opacity-20 py-10 w-4/5 max-w-md drop-shadow-2xl rounded-xl">
        <h2 className='mt-0 mb-4 text-3xl font-serif'>Register</h2>
        <RegisterForm />{/* Render the RegisterForm component here */}
    </div>
</div>


        );
    }
}

export default SystemRegister;