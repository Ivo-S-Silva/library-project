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


router.get("/authors", (req, res, next) => {

    Author.find()
        .then((authorsArr) => {
            // removing the unknown author from the list of authors display
            unknownAuthorPosition = authorsArr.indexOf("6268092ebe628b0b641b22fb");
            authorsArr.splice(unknownAuthorPosition, 1);

            res.render("authors/authors-list", {authors: authorsArr});
        })
        .catch( err => {
            console.log("error getting authors from DB", err)
            next(err);
        });
});

router.get("/authors/create", (req, res, next) => {
    res.render("authors/author-create");
})

router.post("/authors/create", (req, res, next) => {
    const newAuthor = {
        name: req.body.name,
        favouriteFood: req.body.favouriteFood,
        country: req.body.country
    }

    Author.create(newAuthor)
        .then(newAuthor => {
            res.redirect("/authors");
        })
        .catch(err => {
            console.log("Error creating new author", err);
            next(err);
        })
})

router.get("/authors/:authorId", (req, res, next) => {
    const id = req.params.authorId;
    let authorName;
    
    Author.findById(id)
        .then((authorDetails) => {
            authorName = authorDetails;
            return Book.find({author: id});
        })
        .then(booksArray => {
            res.render("authors/author-details", {books: booksArray, author: authorName});
        })
        .catch((err) => {
            console.log("Error getting author info from db", err);
            next(err);
        })
});

router.get("/authors/:authorId/edit", (req,res,next) => {
    const id = req.params.authorId;

    Author.findById(id)
        .then(authorFromDB => {
            res.render("authors/author-edit", authorFromDB)
        })
        .catch(err => {
            console.log("Error getting author from db", err);
            next(err);
        })
})

router.post("/authors/:authorId/edit", (req, res, next) => {
    const id = req.params.authorId;

    const newDetails = {
        name: req.body.name,
        favouriteFood: req.body.favouriteFood,
        country: req.body.country,
    }

    Author.findByIdAndUpdate(id, newDetails)
    .then((authorFromDB) => {
        res.redirect("authors")
    })
    .catch((err) => {
        console.log("Error updating author on db", err);
        next(err);
    })
        
})

router.post("/authors/:id/delete", (req, res, next) => {
    const id = req.params.id;
    const unknownAuthor = "6268092ebe628b0b641b22fb";

    Author.findByIdAndDelete(id)
        .then((response) => {
            return Book.updateMany({author: id}, {author: unknownAuthor});
        })
        .then(() => {
            res.redirect("/authors")
        })
        .catch((err) => {
            console.log("Error updating author on db", err);
            next(err);
        })

})


module.exports = router;