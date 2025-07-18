// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, minlength: 6, required: true },
        role: { type: String, default: "user" }
    },
    { collection: "users" } // "User" collection
);

const User = mongoose.model('User', userSchema);

module.exports = User;

