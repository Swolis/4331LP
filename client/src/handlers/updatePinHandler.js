// UpdatePinHandler.js

import axios from 'axios';

const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;

const UpdatePinFunction = async (newPinData) => {
    try {
        console.log('data being sent: ', newPinData);
        const response = await axios.post(`${baseURL}/Employee-Route/Create-Employee`, newPinData, {
            withCredentials: true,
            mode: 'cors',
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update pin');
    }
};

export default UpdatePinFunction;
