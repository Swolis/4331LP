import axios from 'axios';

const loginUser = async (formData) => {
    try {
        const response = await axios.post('http://localhost:3001/Admin-Login', formData, { withCredentials: true });
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

            // Wait for a short delay to ensure the cookie is set
            setTimeout(() => {
                // Log all cookies
                console.log(`All Cookies: ${document.cookie}`);

                // Check and log the authToken cookie
                const authTokenCookie = document.cookie.split(';').map(cookie => cookie.trim()).find(cookie => cookie.startsWith('authToken='));

                console.log(`authTokenCookie: ${authTokenCookie}`);

                if (authTokenCookie) {
                    const authToken = authTokenCookie.split('=')[1];
                    console.log(`Received authToken: ${authToken}`);

                    // Set the authToken in the Axios headers for subsequent requests
                    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

                    // Redirect to the clientDashboard page
                    window.location.href = '/clientDashboard';
                } else {
                    console.error('Login Failed: AuthToken cookie not found');
                }
            }, 1000); // Adjust the delay as needed
        }
    } catch (error) {
        console.error(`Login Failed: ${error.message}`);
    }
};

export default handleLogin;
