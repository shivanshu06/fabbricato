const express = require("express");
const router = express.Router();
const mongoose = require("mongodb");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
        message: "error hashing the password",
      });
    } else {
      const user = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,
        phone:req.body.phone,
        password: hash,
      });

      user
        .save()
        .then((result) => {
          res.status(200).json({
            new_user: result,
            message: "user created successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
            message: "something went wrong",
          });
        });
    }
  });
});

router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'user not found'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    message:'password does not match'
                })
            }
            if(result){
               const token=jwt.sign({
                firstname:user[0].firstname,
                lastname:user[0].lastname,
                email:user[0].email,
                phone:user[0].phone
               },'this is dummy text',{
                expiresIn:'48h'
               });
               res.status(200).json({
                firstname:user[0].firstname,
                lastname:user[0].lastname,
                email:user[0].email,
                phone:user[0].phone,
                token:token,
                addresses: user[0].addresses,
                id:user[0]._id,
                message:'user login successful'
               })
            }
        })
    })

    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})

module.exports = router;
