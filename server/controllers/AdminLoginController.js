// routes/AdminLoginController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if(!user) {
            return res.status(401).json({ message: 'Authentication Failed.' });
        }
        
        const match = await bcrypt.compare(password, user.password);

        if(match){
            return res.status(200).json({ message: 'Authentication Successful.' });
        }else {
            return res.status(400).json({ message: 'Authentication Failed.' });
        }
    }catch (error) {
        console.error('Error durring login.', error);
        return res.status(500).json({ message: 'Login Failed' });
    }
};

module.exports = {
    login,
};


