const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fname: {
    type: String,
    // required: true,
  },
  lname: {
    type: String,
    // required: true,
  },
  street: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    // required: true,
  },
  landmark: {
    type: String,
    // required:true
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  mobile:{
    type:Number,
    // required:true
  },
  is_default: {
    type: Boolean,
    default: false,
  },
});

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: [addressSchema], // Array of addresses
});

module.exports = mongoose.model("Users", usersSchema);
