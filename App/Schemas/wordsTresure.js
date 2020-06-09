const mongoose = require('mongoose');
const wordsTreasure = mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    defination: {
        type: String,
        required: true
    },    
    citation: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('WordsTreasure', wordsTreasure);
