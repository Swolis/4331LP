import axios from 'axios';

const loginUser = async (formData) => {
    try {
        const response = await axios.post('http://localhost:3001/Admin-Login', formData, {mode: 'cors'});
        return response.data;
    } catch ( error ) {
        throw new Error ('Login Failure');
    }
};

const handleLogin = async (formState) => {
    try {
        const loginData = await loginUser(formState);
    } catch (error){
        console.error(`Login Failed: ${error.message}`);
    }
};

export default handleLogin;