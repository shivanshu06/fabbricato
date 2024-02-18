const express = require("express");
const router = express.Router();
const mongoose = require("mongodb");
const ProductMod = require("./model/dashproducts");

router.post("/saveproduct", (req, res) => {
  const { productName, price, discount, type, image1, image2 } = req.body;

  if (!productName || !price || !discount || !type) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newProduct = new ProductMod({
    productName,
    price,
    discount,
    type,
    image1,
    image2,
  });

  newProduct
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        data: result,
        message: "saved successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
      });
    });
});
router.get("/newarrivals", async (req, res) => {
  try {
    const products = await ProductMod.find({ type: "newarrivals" }).exec();
    res.status(200).json({
      data: newarrivals,
      message: "data fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching data." });
  }
});

router.get("/topselling", async (req, res) => {
  try {
    const products = await ProductMod.find({ type: "topselling" }).exec();
    res.status(200).json({
      data: products,
      message: "data fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
});

router.get('/:productId',async(req,res)=>{
  const productId=req.params.productId

  try{
    const product=await ProductMod.findById(productId).exec()
    if(!product){
      return re.status(404).json({
        message:'product not found'
      })
    }

    res.status(200).json({
      data:product,
      message:'product fetched successfully'
    })
  }
  catch(err){
    res.status(500).json({
      message:'something went wrong'
    })
  }
})

module.exports = router;
