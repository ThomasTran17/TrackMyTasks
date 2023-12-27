const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    fullname: { type: String },
    googleUserID: { type: String, },
    accessToken: { type: String, },

}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);