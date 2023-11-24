import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import employeeLoginFrom from './employeeLoginFrom';
import '../../styles/tailwind.css';


class employeeLoginPage extends Component
{
    render () {
        const cardStyle = 
        {
            background: 'bg-yellow-500',
        };
        const Montserrat = 
        {
            fontFamily: 'Montserrat, sans-serif',
            marginTop: '0',
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: 'bold',
        };
        return(
            <div className="bg-slate-800 min-h-screen flex flex-col items-center">
                <Link to={'/'} className="items-center m-8">
                    <img
                    src='/LogoEnhancedSmall.png'
                    alt='Business Crafter Logo'
                    className='h-24'
                    />
                </Link>
            <div id='form-card' style={cardStyle} className="form-card flex flex-col justify-center items-center bg-slate-200 bg-opacity-10 py-10 w-4/5 max-w-md drop-shadow-2xl rounded-xl">
              <h2 style={Montserrat}>Login</h2>
              <employeeLoginFrom/>{/* Render the RegisterForm component here */}
            </div>
          </div>
        );
    }
}

export default employeeLoginPage;