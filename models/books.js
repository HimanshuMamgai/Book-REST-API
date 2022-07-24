const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    publisher: String,
    publicationDate: String
});

module.exports = mongoose.model("Book", bookSchema);