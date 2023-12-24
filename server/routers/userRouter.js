const UserModel = require("../models/userModel");
const router = require("express").Router();
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { BAD_REQUEST } = require("../constants/httpSatus");

router.post("/register", async (req, res) => {
  const { fName, lName, email, password, address } = req.body;
  const admin = email === "sahilchopade233@gmail.com" ? true : false;
  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.json({ msg: "This Email is Not Valid!!", status: false });
  }
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(BAD_REQUEST).send("User already exists,Please Login!!");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    firstName: fName,
    lastName: lName,
    email: email.toLowerCase(),
    isAdmin: admin,
    password: hashedPassword,
    address: address,
  });
  res.send(generateTokenResponse(newUser));
});

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
      return;
    }
    // res.send("UserName or Password is Invalid!!");
    res.status(BAD_REQUEST).send("UserName or Password is Invalid!!");
  })
);

const generateTokenResponse = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return {
    id: user.id,
    email: user.email,
    name: user.firstName,
    isAdmin: user.isAdmin,
    address: user.address,
    token,
  };
};

module.exports = router;
