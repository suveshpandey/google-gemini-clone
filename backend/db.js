const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
require('dotenv').config();
const dbURL = process.env.DB_CONNECTION_STRING;
mongoose.connect(dbURL,)
.then(()=>{
    console.log("Connected to the database.");
}).catch((error)=>{
    console.error("Database connection error: ", error);
});

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userName: {type: String }
})
const chatSchema = new Schema({
    userId: {type: ObjectId, ref: 'user', required: true},
    prompt: {type: String, required: true},
})

const userModel = mongoose.model('user', userSchema);
const chatModel = mongoose.model('chat', chatSchema);

module.exports = {
    userModel : userModel,
    chatModel : chatModel
}