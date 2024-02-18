const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("./model/superadmin");

router.post("/create", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
        message: "error hashing the password",
      });
    } else {
      const admin = new Admin({
        username: req.body.username,
        password: hash,
      });

      admin
        .save()
        .then((result) => {
          res.status(200).json({
            newadmin: result,
            message: "admin created",
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


router.post('/login', (req, res, next) => {
    Admin.find({ username: req.body.username })
        .exec()
        .then(admin => {
            if (admin.length < 1) {
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        message: 'Password does not match'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            username: admin[0].username
                        },
                        'this is a dummy', 
                        {
                            expiresIn: '48h'
                        }
                    );
                    res.status(200).json({
                        username: admin[0].username,
                        token: token,
                        message: 'User logged in successfully'
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;
