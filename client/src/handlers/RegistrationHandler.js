import axios from 'axios';

const registerUser = async (formData) => {
    try {
        const response = await axios.post('http://localhost:3001/Admin-Registration', formData, {mode: 'cors'});
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with an error status:', error.response.status);
            console.error('Server response data:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
        throw new Error('Registration failed!');
    }
};


const handleRegistration = async (formState) => {
    try {
      console.log('form state:', formState); // Log the form state to check if it's defined
      const registrationData = await registerUser(formState);
      console.log(`Registration Successful: ${registrationData}`);
    } catch (error) {
      console.error(`Registration failed: ${error.message}`);
    }
  };

export default handleRegistration;