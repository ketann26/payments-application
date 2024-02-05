const mongoose = require("mongoose");

let MONGODB_CONNECT_URI;
if (process.env.NODE_ENV == "production") {
  MONGODB_CONNECT_URI = process.env.MONGODB_CONNECT_URI;
  console.log("in production mode");
} else {
  MONGODB_CONNECT_URI = require("./config");
  console.log("in dev mode");
}

mongoose.connect(MONGODB_CONNECT_URI);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Required"],
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: { type: String, required: [true, "Required"], minLength: 6 },
  firstName: {
    type: String,
    required: [true, "Required"],
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: [true, "Required"],
    trim: true,
    maxLength: 30,
  },
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Required"],
  },
  balance: { type: Number, required: [true, "Required"] },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
