const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, "Your email address is required"], 
    unique: true,
    lowercase: true,
    trim: true
  },
  username: { 
    type: String, 
    required: [true, "Your username is required"],
    trim: true
  },
  password: { 
    type: String, 
    required: [true, "Your password is required"] 
  },
  name: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: new Date() 
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

module.exports = mongoose.model("User", userSchema);