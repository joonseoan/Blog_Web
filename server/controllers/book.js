const mongoose = require('mongoose');
const Book = mongoose.model('Book');

exports.fetchBooks = (req, res) => {
    Book.find({})
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            res.status(422).send(err);
        });
}

exports.createBook = (req, res) => {
    const book = new Book(req.body);
    book.save()
        .then(book => {
            res.json(book);
        })
        .catch(err => {
            res.status(422).send(err);
        });
}

exports.editBook = (req, res) => {
    const { id } = req.params;
    Book.findById(id)
        .then(book => {
            //req.body : not necessary to be all fields
            book.set(req.body);
            book.save();
            // book : updated data
            res.json(book);
            // [ IMPORTANT, NO Then function required ]
            // .then(newBook => {
            //   console.log('newBook: ', newBook)
            //   res.json(newBook);
            // })
            // .catch(err => {
            //   throw new Error('Failed to update the book');
            // })
        })
        .catch(err => {
            res.status(422).send(err);
        })     
}

exports.deleteBook = (req, res) => {
    const { id } = req.params;
    Book.deleteOne({ _id: id })
        .then(bookDeleted => {
            res.json(bookDeleted);
        })
        .catch(err => {
            res.status(422).send(err);
        });
}