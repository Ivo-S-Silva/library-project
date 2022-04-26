// Using object destructuring to extract exactly what we want from Mongoose
const { Schema, model } = require("mongoose");

const authorSchema = new Schema (
        {
          name: String,
          favouriteFood: String,
          country: String
        }
);

const Author = model("Author", authorSchema);
module.exports = Author;