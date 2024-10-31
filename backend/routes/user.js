const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { userModel, chatModel } = require('../db');
const { signUpAuth, userAuthentication, authenticateToken } = require('../middileWares/userAuth');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const Router = express.Router;
const userRouter = Router();

// Signup Route
userRouter.post('/signup', signUpAuth, async (req, res) => {
    const { email, password, userName } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await userModel.create({
            email,
            password: hashedPassword,
            userName
        });
        const token = jwt.sign(
            {id: newUser._id},
            JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.status(201).json({
            message: "User successfully signed-up",
            userName,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Some error occurred while signing-up.",
            error: error.message
        });
    }
});

// Signin Route
userRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { id: user._id },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(201).json({
                message: "User successfully signed-in.",
                token,
                userName: user.userName
            });
        } else {
            res.status(404).json({ message: "Wrong credentials." });
        }
    } catch (error) {
        res.status(500).json({
            message: "Some error occurred while signing-in",
            error: error.message
        });
    }
});

// Route to Save Chats
userRouter.post('/chats', userAuthentication, async (req, res) => {
    const { prompt } = req.body;

    try {
        const newChat = new chatModel({
            userId: req.user.id,  //using userId from decoded jwt
            prompt
        });
        await newChat.save();
        res.status(201).json({ message: "Chat saved successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error saving chat",
            error: error.message
        });
    }
});

// Route to Fetch Chats for Authenticated User
userRouter.get('/chats', userAuthentication, async (req, res) => {
    try {
        const chats = await chatModel.find({ userId: req.user.id });
        res.status(200).json({ chats });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching chats",
            error: error.message
        });
    }
});

// Route to Fetch Recent Chats 
userRouter.get('/recent-chats', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer Token format

    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('recentChats');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ recentChats: user.recentChats });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch recent chats",
            error: error.message
        });
    }
});

// GET route to fetch user details
userRouter.get("/getUser", authenticateToken, async (req, res) => {
    try {
        console.log("Token validated. User ID:", req.user.id); // Log user ID from token

        const user = await userModel.findById(req.user.id).select("-password"); // Check if ID is valid
        if (!user) {
            console.error("User not found in database");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User found:", user); // Log user info if found
        res.json({
            userName: user.userName,
            email: user.email
        });
    } catch (error) {
        console.error("Error fetching user:", error); // Log detailed error for debugging
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
userRouter.put('/updatePassword', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Password is required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
        res.json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});


module.exports = {
    userRouter
};
