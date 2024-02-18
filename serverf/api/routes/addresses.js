const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')


const User = require("./model/user");


router.post("/add-address/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const addressData = req.body;

    user.addresses.push(addressData);

    await user.save();

    res.status(201).json({
      message: "Address added successfully",
      address: addressData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding address",
    });
  }
})

router.get('/get-address/:userId',async(req,res)=>{
  const userId=req.params.userId

  try{
    const user=await User.findById(userId)
    if(!user){
      return res.status(400).json({
        message:'user not found'
      })
    }
    const address=user.addresses
    res.status(200).json({
      message:'address fetched',
      data:address
      
    })
  }
  catch(err){
    res.status(500).json({
      message:'something went wrong'
    })
  }
})
;

router.delete("/delete-address/:userId/:addressId", async (req, res) => {
  const userId = req.params.userId;
  const addressIdToDelete = req.params.addressId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Find the address to delete by converting addressIdToDelete to an ObjectID
    const addressIdToDeleteObjectID = new mongoose.Types.ObjectId(addressIdToDelete);

    // Check if the address exists in the user's addresses
    const addressIndexToDelete = user.addresses.findIndex((address) =>
      address._id.equals(addressIdToDeleteObjectID)
    );

    if (addressIndexToDelete === -1) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // Remove the address from the user's addresses
    user.addresses.splice(addressIndexToDelete, 1);

    // Save the user to update the changes
    await user.save();

    res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting address",
    });
  }})

module.exports = router;
