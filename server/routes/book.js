const express = require('express');
const router = express.Router();

const { 
    fetchBooks, createBook,
    editBook, deleteBook
} = require('../controllers/book');

// mongoose
router.post('', createBook);

router.get('', fetchBooks);

router.patch('/:id', editBook);

router.delete('/:id', deleteBook);

module.exports = router;
