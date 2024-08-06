const JWT = require('jsonwebtoken');
require('dotenv').config();


const verifyJWT = (req, res, next) => {
    
    const auth = req.headers.authorization;
    console.log(auth);
    if (!auth) {
        return res.status(401).json({ message: 'No authorization header provided' });
      }
    const token = auth.split(' ')[1];
    console.log(token);

    if (!token) return res.status(400).json({ message: 'please log In' })


    JWT.verify(token, process.env.JWT_KEY, (error, decode) => {
        if (error) return res.status(400).json({ message: 'Invalid Token' });

        next();
    });

};

module.exports = verifyJWT;