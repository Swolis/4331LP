// LoginHandler.js

import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import UpdatePin from './UpdatePin';

const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;

const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${baseURL}/Admin-Login`, formData, { withCredentials: true, mode: 'cors' });
        console.log(`response: ${response.data}`);
        return response.data;
    } catch (error) {
        throw new Error('Login Failure');
    }
};

const handleLogin = async (formState, setShowUpdatePin, setShouldRedirect) => {
    try {
        const loginData = await loginUser(formState);
        if (loginData.message === 'Login Successful') {
            console.log('Login was successful');
            const cookieObject = jwtDecode(loginData.credential);
            console.log(`Received authToken: ${loginData.credential}`);
            console.log(`cookieObject default pin: ${cookieObject.defaultPin}`);

            if (cookieObject.defaultPin) {
                setShowUpdatePin(true);
            } else {
                // Redirect to the clientDashboard page
                setShouldRedirect(true);
            }
        }
    } catch (error) {
        console.error(`Login Failed: ${error.message}`);
    }
};

export default handleLogin;
