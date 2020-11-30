const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    position: {type: String, required: true},
    rating: {type: Number, required: true},
    level: {type: String, required: true},
    sellPrice: {type: Number, required: true},
    image: {type: String, required: true}
})

module.exports = mongoose.model('Player', playerSchema);