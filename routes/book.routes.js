const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

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
        .populate("author")
        .then( (booksArr) => {
            res.render("books/books-list", {books: booksArr});
        })
        .catch( err => {
            console.log("error getting books from DB", err)
            next(err);
        });
});

router.get("/books/create", (req, res, next) => {
    Author.find()
        .then(authorsArray => {
            res.render("books/book-create", {authors: authorsArray});
        })
        .catch((err) => {
            console.log("Error getting authors from db", err);
            next(err);
        })
})

router.post("/books/create", (req, res, next) => {
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        description: req.body.description
    }

    Book.create(newBook)
        .then(newBook => {
            res.redirect("/books");
        })
        .catch(err => {
            console.log("Error creating new book", err);
            next(err);
        })
})

router.get("/books/:bookId", (req, res, next) => {
    const id = req.params.bookId;
    
    Book.findById(id)
        .populate("author")
        .then((bookDetails) => {
            res.render("books/book-details", {book: bookDetails});
        })
        .catch((err) => {
            console.log("Error getting books from db", err);
            next(err);
        })
});

router.get("/books/:bookId/edit", (req,res,next) => {
    const id = req.params.bookId;
    let bookToEdit;

    Book.findById(id)
        .populate("author")
        .then(bookFromDB => {
            bookToEdit = bookFromDB;
            return Author.find();
        })
        .then(authorsArray => {
            res.render("books/book-edit", {book: bookToEdit, authors: authorsArray})
        })
        .catch(err => {
            console.log("Error getting book from db", err);
            next(err);
        })
})

router.post("/books/:bookId/edit", (req, res, next) => {
    const id = req.params.bookId;

    const newDetails = {
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        description: req.body.description
    }

    Book.findByIdAndUpdate(id, newDetails)
    .then((bookFromDB) => {
        res.redirect(`/books/${bookFromDB._id}`)
    })
    .catch((err) => {
        console.log("Error updating book on db", err);
        next(err);
    })
        
})

router.post("/books/:bookId/delete", (req, res, next) => {
    const id = req.params.bookId;

    Book.findByIdAndDelete(id)
        .then((response) => res.redirect("/books"))
        .catch((err) => {
            console.log("Error updating book on db", err);
            next(err);
        })
})


module.exports = router;