const mongoose = require("mongoose");

const collectionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  proId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true, 
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    // required: true,
  },
  image3: {
    type: String,
    // required: true,
  },
  image4: {
    type: String,
    // required: true,
  },
  topSelling: {
    type: Boolean,
    default: false,
  },
  newArrival: {
    type: Boolean,
    default: false,
  },

});

module.exports = mongoose.model("Collections", collectionsSchema);
