const UserModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const Register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const { username, password } = req.body;
  try {
    const user = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const Login = async (req, res) => {
  const secret = process.env.SECRET;
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  const isMatchedPassword = bcrypt.compareSync(password, user.password);
  if (isMatchedPassword) {
    //can login
    jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
      if (err) throw err;
      //save data in cookie
      res.cookie("token", token).json({
        id: user._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
};

const Logout = (req, res) => {
  res.cookie("token", "").json("ok");
};

module.exports = {
  Register,
  Login,
  Logout,
};
