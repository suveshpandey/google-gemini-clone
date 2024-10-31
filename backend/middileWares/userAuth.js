const jwt = require('jsonwebtoken');
const { userModel } = require('../db');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

async function signUpAuth(req, res, next) {
    const email = req.body.email;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {      
        return next();
    } else {
        return res.status(401).json({ message: "User with this email is already present." });
    }
}

function userAuthentication(req, res, next) {
    // Change this to look for the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, jwt must be provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request object.
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
// Middleware to verify the token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log('token: ', token)
    if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};
module.exports = {
    signUpAuth: signUpAuth,
    userAuthentication: userAuthentication,
    authenticateToken : authenticateToken
};
