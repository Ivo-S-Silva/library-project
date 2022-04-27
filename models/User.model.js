const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email is required"],
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
    type: String,
    required: [true, "Password required"]
  }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
