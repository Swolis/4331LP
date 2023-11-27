const jwt = require('jsonwebtoken');
// Controller function
export const AdminLogOutController = async (req, res) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                res.status(400).send('Unable to log out');
            }
            else {
                res.send('Logout successful');
            }
        });
    }
    else {
        res.end();
    }
};
