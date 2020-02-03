const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: String,
    author: String,
    pages: Number,
    price: Number,
});

// model always includes schema.!
mongoose.model('Book', bookSchema);


