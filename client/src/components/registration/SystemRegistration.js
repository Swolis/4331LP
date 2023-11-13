import React, { Component } from 'react';
import RegisterForm from './SystemRegistrationForm'; // Import RegisterForm component

// styles
import '../../styles/tailwind.css';

class SystemRegistration extends Component {
  render() {
    const cardStyle = {
    background: 'linear-gradient(to bottom right, #a2d2ff, #ffe1f5)',
    };
    const titleStyle = {
      fontFamily: 'Montserrat, sans-serif',
      marginTop: '0',
      marginBottom: '1rem',
      fontSize: '2rem',
      fontWeight: 'bold',
    };

    return (
      <div className='flex justify-center items-center h-screen' style={cardStyle}>
        <div id='form-card' className="form-card flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 to-white bg-opacity-20 py-10 w-4/5 max-w-md drop-shadow-2xl rounded-xl">
          <h2 style={titleStyle}>Register</h2>
          <RegisterForm />{/* Render the RegisterForm component here */}
        </div>
      </div>
    );
  }
}

export default SystemRegistration;
