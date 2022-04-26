// Using object destructuring to extract exactly what we want from Mongoose
const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const bookSchema = new Schema (
        {
            title: String,
            description: String,
            author: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Author"
            },
            rating: Number
          }
);

const Book = model("Book", bookSchema);
module.exports = Book;