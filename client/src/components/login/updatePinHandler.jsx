// updatePinHandler.js

import axios from 'axios';

const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;

const updatePin = async (name, newPin) => {
  try {
    const response = await axios.post(`${baseURL}/Update-Pin`, {
      name,
      pin: newPin,
      permission: true,
      // Include any other necessary data in the request body
    });

    return response.data;
  } catch (error) {
    throw new Error('Error updating PIN');
  }
};

export default updatePin;
