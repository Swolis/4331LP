import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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

const handleLogin = async (formState, setShowupdatePin) => {
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


async function handleSuccessfulLogin(loginData, setShowupdatePin) {
    // Check for the authToken cookie
    const authTokenCookie = document.cookie.split(';').map(cookie => cookie.trim()).find(cookie => cookie.startsWith('authToken='));

    if (authTokenCookie) {
        const authToken = authTokenCookie.split('=')[1];

        const cookieObject = jwtDecode(authToken);
        console.log(`Received authToken: ${authToken}`);
        console.log(`cookieObject default pin: ${cookieObject.defaultPin}`);

        if (cookieObject.defaultPin){
            setShowupdatePin(true);

            try {
                // Perform the pin update using an HTTP request
                const response = await updatePinFunction(); // Replace with your actual pin update function

                // Once pin update is complete, set the state to trigger redirection
                if(response.message === "200 OK"){
                    setShouldRedirect(true);
                }
                
            } catch (error) {
                console.error('Pin update failed:', error);
            }
        }

        // Set the authToken in the Axios headers for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

        // Redirect to the clientDashboard page
        window.location.href = '/clientDashboard';
    } else {
        // Handle the case where the cookie is not found
    }
}


export default handleLogin;