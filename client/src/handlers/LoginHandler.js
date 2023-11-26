import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import PinUpdateCard from '../components/login/changeDefaultPin';

const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;


const TIMEOUT_DELAY = 1000; // Use a constant for the timeout

const loginUser = async (formData) => {
    console.log('Using login handler, login user function');
    try {
        const response = await axios.post(`${baseURL}/Admin-Login`, formData, { withCredentials: true, mode: 'cors' });
        console.log(`Response: ${response.data}`);
        return response.data;
    } catch (error) {
        throw new Error('Login Failure');
    }
};

const handleLogin = async (formState) => {
    try {
        const loginData = await loginUser(formState);
        if (loginData.message === 'Login Successful') {
            console.log('Login was successful');
            handleSuccessfulLogin(loginData);
        }
    } catch (error) {
        console.error(`Login Failed: ${error.message}`);
    }
};

async function handleSuccessfulLogin(loginData) {
    // Log all cookies
    console.log(`All Cookies: ${document.cookie}`);
  
    // Check and log the authToken cookie
    const authTokenCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("authToken="));
  
    if (authTokenCookie) {
      const authToken = authTokenCookie.split("=")[1]; // Extract the value of the authToken
      const cookieObject = jwtDecode(authToken);
  
      useEffect(() => {
        // Check if defaultPin is true and render PinUpdateCard accordingly
        if (cookieObject.defaultPin) {
          const { name, newPin } = PinUpdateCard();
          // Render the PinUpdateCard component based on the condition
          // You can also use this information to conditionally render other components or take actions
        }
      }, []); // Empty dependency array ensures that the useEffect runs only once when the component mounts
  
      if (cookieObject.defaultPin) {
        // Prompt user to update PIN
        try {
          const { name, newPin } = PinUpdateCard(); // Assuming PinUpdateCard() returns the new PIN
  
          if (newPin) {
            // Make an API call to update the PIN
            const response = await axios.post(`${baseURL}/Update-Pin`, {
              name,
              pin: newPin,
              permission: true,
              // Include any other necessary data in the request body
            });
  
            // Handle the response as needed
            console.log("PIN update response:", response.data);
  
            // If PIN is successfully updated, redirect to the dashboard
            window.location.href = "/clientDashboard";
          }
        } catch (error) {
          console.error("Error updating PIN:", error.message);
          // Handle the error as needed
        }
      } else {
        // Set the authToken in the Axios headers for subsequent requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${authTokenCookie.split("=")[1]}`;
  
        // Redirect to the dashboard if the PIN is not the default
        window.location.href = "/clientDashboard";
      }
    }
  }
  
  export default handleLogin;
