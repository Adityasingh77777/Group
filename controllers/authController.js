const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({
      error: "invalid input",
    });

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({
        error: "Emailid already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    return res.status(200).json({
      message: "user registered successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: "registration failed" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      error: "invalid input",
    });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        error: "user not registered",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({
        error: "invalid password",
      });

    const payload={
      id:user._id,
      name:user.name,
      email:user.email
    }

    const token=jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES_IN || '1h',
    })

    return res.status(200).json({
      message: "LoggedIn Successfully",
      token
    });
  } catch (err) {
    return res.status(500).json({
      message: "login failed",
    });
  }
};
