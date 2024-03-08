require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const collectionsRoute = require("./api/routes/collections");
const checkout = require("./api/routes/paymentcontroller");
const contactus = require("./api/routes/contactus");
const userSignup = require("./api/routes/user");
const addressRoute = require("./api/routes/addresses");
const dashproducts = require("./api/routes/dashproducts");
const superadmin=require('./api/routes/superadmin')
const bodyParsher = require("body-parser");
const path = require("path");

mongoose.connect(
  "mongodb+srv://shivanshugaur6:qwertyuiop123@luxtee.laqr8tu.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("error", (err) => {
  console.log("not connected");
});

mongoose.connection.on("connected", (connected) => {
  console.log("connected successfully");
});

app.use(express.json({ limit: '50mb' }));

app.use(
  cors({
    origin: ["http://localhost:3000","https://fabbricato.in"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

const _dirname = path.dirname(__filename);

const clientBuildPath = path.join(_dirname, "../client/build");
app.use("/client", express.static(clientBuildPath));


const adminBuildPath = path.join(_dirname, "../Admin/build");
app.use("/admin", express.static(adminBuildPath));

app.use(bodyParsher.urlencoded({ extended: false }));
app.use(bodyParsher.json());

app.use("/collections", collectionsRoute);
app.use("/contactus", contactus);
app.use("/checkout", checkout);
app.use("/user", userSignup);
app.use("/addresses", addressRoute);
app.use("/products", dashproducts);
app.use('/superadmin',superadmin)

app.get("/getkey", (req, res) => {
  const razorpayApiKey = process.env.RAZORPAY_API_KEY;

  console.log("RAZORPAY_API_KEY:", razorpayApiKey);

  res.status(200).json({ key: razorpayApiKey });
});

app.use((req, res, next) => {
  res.status(404).json({
    error: "url not found",
  });
});

module.exports = app;
