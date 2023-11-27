// UpdatePin.js

import React, { useState } from 'react';
import UpdatePinFunction from './UpdatePinHandler';

const UpdatePin = ({ setShowUpdatePin, setShouldRedirect }) => {
    const [state, setState] = useState({
        name: '',
        newPin: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newPinData = {
                name: state.name,
                pin: state.newPin,
                permission: true,
                defaultPin: true,
            };
            const response = await UpdatePinFunction(newPinData);
            // Check the response and setShouldRedirect accordingly
            if (response.message === '200 OK') {
                setShouldRedirect(true);
            }
        } catch (error) {
            console.error('Pin update failed:', error);
        }
    };

    return (
        <form className='mx-auto gap-6 w-full object-contain p-10 flex flex-col items-center' onSubmit={handleSubmit}>
            <div className='form-group  w-5/6'>
                <label></label>
                <input
                    className='mx-auto w-full rounded-full shadow-inner border-opacity-.5 p-1 px-4'
                    type='text'
                    name='employee name'
                    placeholder='employee name'
                    value={state.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className='form-group w-5/6'>
                <label></label>
                <input
                    className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
                    type='password'
                    name='pin'
                    placeholder='Password'
                    value={state.newPin}
                    onChange={handleInputChange}
                />
            </div>

            <div className='button-container flex flex-col'>
                <button style={{ background: '#ffd485' }} className=' rounded p-1 px-4 text-gray-600 m-2' type='submit'>
                    Update Pin
                </button>
            </div>
        </form>
    );
};

export default UpdatePin;
