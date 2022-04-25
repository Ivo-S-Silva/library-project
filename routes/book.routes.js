const Book = require("../models/Book.model");

const router = require("express").Router();

// TASK
// 
// when user visits GET localhost:3000/books
// 
// - send query to DB to get list of books
// - if query is successful:
//   --> console.log the list of books + res.send("great news!")
// 
// 


router.get("/books", (req, res, next) => {

    Book.find()
        .then( (booksArr) => {
            res.render("books/books-list", {books: booksArr});
        })
        .catch( err => {
            console.log("error getting books from DB", err)
            next(err);
        });
});

router.get("/books/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    
    Book.findById(id)
        .then((bookDetails) => {
            res.render("books/book-details", {book: bookDetails});
        })
        .catch((err) => {
            console.log("Error getting books from db", err);
            next(err);
        })
});

module.exports = router;