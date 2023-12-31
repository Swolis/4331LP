import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import UpdatePinFunction from './updatePinHandler';

const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;


const loginUser = async (formData) => {
	console.log('using login handler, login user function');
    try {
        const response = await axios.post(`${baseURL}/Admin-Login`, formData, { withCredentials: true, mode:'cors' });
	console.log(`resonse: ${response.data}`);
        return response.data;
    } catch (error) {
        throw new Error('Login Failure');
    }
};

const handleLogin = async (formState, setShowupdatePin, setShouldRedirect) => {
    try {
        const loginData = await loginUser(formState);
        if (loginData.message === 'Login Successful') {
            console.log('Login was successful');

            handleSuccessfulLogin(loginData, setShowupdatePin, setShouldRedirect);
        }
    } catch (error) {
        console.error(`Login Failed: ${error.message}`);
    }
};


async function handleSuccessfulLogin(loginData, setShowupdatePin, setShouldRedirect) {
    // Check for the authToken cookie
    const authTokenCookie = document.cookie.split(';').map(cookie => cookie.trim()).find(cookie => cookie.startsWith('authToken='));

    if (authTokenCookie) {
        const authToken = authTokenCookie.split('=')[1];

        const cookieObject = jwtDecode(authToken);
        console.log(`Received authToken: ${authToken}`);
        console.log(`cookieObject default pin: ${cookieObject.defaultPin}`);

        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

        if (cookieObject.defaultPin){
            setShowupdatePin(true);
        }else{
            window.location.href = '/clientDashboard';
        }

        // Set the authToken in the Axios headers for subsequent requests
        

        // Redirect to the clientDashboard page
        
    } else {
        // Handle the case where the cookie is not found
    }
}


export default handleLogin;
