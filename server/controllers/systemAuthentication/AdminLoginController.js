import { getClientModel } from '../../models/ClientSchema';
const jwt = require('jsonwebtoken');
// Controller function
export const AdminLoginController = async (req, res) => {
    console.log('\n\nentering set session from controller');
    try {
        console.log('Stored client connection:', req.session.client);
        // Explicitly specify the type of getModel
        const { model: ClientModel, closeConnection } = getClientModel(req.session.client);
        // Access properties from getModel
        console.log(`session stored email: ${req.session.email}`);
        const data = await ClientModel.findOne({ email: req.session.email }).exec();
        console.log('Data from the "client" collection:', data);
        if (data) {
            const SecretKey = process.env.SECRET_KEY;
            const session = req.session;
            session.client = req.session.client;
            session.userID = data._id;
            session.authenticated = true;
            session.save((err) => {
                if (err) {
                    console.error('Error saving session:', err);
                    res.status(500).json({ message: 'Internal server error.' });
                }
                else {
                    console.log(`secret key: ${SecretKey}`);
                    const token = jwt.sign({ userID: data._id, defaultPin: data.defaultPin }, SecretKey, { expiresIn: '120m' });
                    console.log(`Generated token: ${token}`);
                    res.cookie('authToken', token, { maxAge: 30 * 60 * 1000, httpOnly: false, secure: true });
                    closeConnection(); // Close the connection when done
                    res.status(200).json({ message: 'Login Successful' });
                    return;
                }
            });
        }
        else {
            throw new Error('Invalid user data');
        }
    }
    catch (error) {
        console.error('Error handling setSession controller:', error);
        res.status(500).json({ message: 'Internal server error.' });
        return;
    }
};
