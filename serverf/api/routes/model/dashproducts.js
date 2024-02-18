const mongoose = require("mongoose");

const dashproductsSchema = new mongoose.Schema({
  productName: {
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
  type: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: false, // You can change this to false if images are optional
  },
  image2: {
    type: String,
    required: false, // You can change this to false if images are optional
  },
});

module.exports = mongoose.model("Dashproducts", dashproductsSchema);
