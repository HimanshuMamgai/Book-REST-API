const { application } = require('express');
const express = require('express');
const router = express.Router();

const Book = require("../models/books");

router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch(err) {
        res.status(500).json({err: err.message});
    }
});

router.post("/", async (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        publisher: req.body.publisher,
        publicationDate: req.body.publicationDate
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch(err) {
       res.status(500).json({err: err.message});
    }
});

router.get("/:id", async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        res.status(201).json({
            name: book.name,
            author: book.author,
            publisher: book.publisher,
            publicationDate: book.publicationDate
        });
    } catch(err) {
        res.status(500).json({err: err.message});
    }
});

router.patch("/:id", async (req, res) => {  
    const book = await Book.findById(req.params.id);
    if(req.body.name !== null) {
        book.name = req.body.name;
    }
    if(req.body.author !==null) {
        book.author = req.body.author;
    }
    if(req.body.publisher !== null) {
        book.publisher = req.body.publisher;
    }
    if(req.body.publicationDate !== null) {
        book.publicationDate = req.body.publicationDate
    }    
    try {
        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch(err) {
        res.status(500).json({err: err.message});
    }
});

router.delete("/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    try{
        await book.remove();
        res.status(200).json('Book is deleted successfully!');
    } catch(err) {
        res.status(500).json({err: err.message});
    }
});

module.exports = router;