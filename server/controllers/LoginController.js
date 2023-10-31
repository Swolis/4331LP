// routes/LoginController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');


router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    // authenticate user
    try {
        // find user by user name
        const user = await User.findOne({ username });

        if (!user) {
            res.status(401).json({ message: 'Authentication Failed.' })
            return;
        }
        
        // compare enterd passwored with stored hashed password
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.status(200).json({ message: 'Authentication Successfull.' });
        }else{
            res.status(400).json({ messafe: 'Authentication Failed.' });
        }
    }catch (error){
        console.error('Error durring login: ', error);
        res.status(500).json({ messafe: 'Login Failed.' });

    }
});