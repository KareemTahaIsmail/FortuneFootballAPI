const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {type: String, required: true},
    password: {type: String, required: true},
    balance: {type: Number, required: true, default: 200},
    teamName: {type: String, required: true},
    squad: {type: Array, required: true},
    transferPile: {type: Array, required: true},
})

module.exports = mongoose.model('User', userSchema);