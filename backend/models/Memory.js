// const { text } = require('express'); // Esta linha pode ser removida se 'text' não for usado em outro lugar do código
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const memorySchema = new schema({
    title: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
    },
    comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Memory', memorySchema);
