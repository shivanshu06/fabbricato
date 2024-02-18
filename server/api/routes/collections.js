const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Collections = require("./model/collections");
const collections = require("./model/collections");

router.post("/addproduct", async (req, res, next) => {
  try {
    const productData = req.body;

    const price = productData.price;
    const discount = productData.discount;

    const discountedPrice = calculateDiscount(price, discount);

    productData.discountedPrice = discountedPrice;

    const uniqueTicketId = generateUniqueTicketId("FABR", 8);
    productData.proId = uniqueTicketId;

    const product = new Collections(productData);

    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getallproducts", async (req, res, next) => {
  try {
    const product = await Collections.find();
    const totalproduct = await Collections.countDocuments();
    const response = successResponse("Tickets retrieved successfully", {
      product,
      totalproduct,
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const errorResponseData = errorResponse(
      "Error retrieving tickets",
      error.message
    );
    res.status(500).json(errorResponseData);
  }
});

router.post("/filteredProducts", async (req, res, next) => {
  try {
    const { category, productType } = req.body;

    const filter = {};
    if (category) {
      filter.category = { $regex: new RegExp(category, "i") };
    }
    if (productType) {
      filter.productType = { $regex: new RegExp(productType, "i") };
    }

    const filteredProducts = await Collections.find(filter);

    // const totalFilteredProducts = await filteredProducts.countDocuments();

    const response = successResponse(
      "Filtered products retrieved successfully",
      {
        filteredProducts,
        // totalFilteredProducts,
      }
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const errorResponseData = errorResponse(
      "Error retrieving filtered products",
      error.message
    );
    res.status(500).json(errorResponseData);
  }
});

router.delete("/deleteproduct/:id", async (req, res, next) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Collections.findByIdAndDelete(productId);

    if (!deletedProduct) {
      const notFoundResponse = errorResponse(
        "Product not found",
        "Product with the given ID not found"
      );
      return res.status(404).json(notFoundResponse);
    }

    const successResponseData = successResponse(
      "Product deleted successfully",
      deletedProduct
    );
    res.status(200).json(successResponseData);
  } catch (error) {
    console.error(error);
    const errorResponseData = errorResponse(
      "Error deleting product",
      error.message
    );
    res.status(500).json(errorResponseData);
  }
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Collections.findById(req.params.id)
    .then((result) => {
      const collectionWithDiscount = {
        ...result._doc,
        priceAfterDiscount: calculateDiscount(result.price, result.discount),
      };

      res.status(200).json({
        collections: collectionWithDiscount,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

function calculateDiscount(price, discount) {
  const priceAfterDiscount = price - price * (discount / 100);
  return priceAfterDiscount;
}

function generateUniqueTicketId(prefix, digits) {
  const randomNumber = generateRandomNumber(digits);

  return `${prefix}${randomNumber}`;
}

function generateRandomNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const successResponse = (message, data) => {
  return {
    success: true,
    message: message,
    data: data,
  };
};

const errorResponse = (message, error) => {
  return {
    success: false,
    message: message,
    error: error,
  };
};

module.exports = router;
