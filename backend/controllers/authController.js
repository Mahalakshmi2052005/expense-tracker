const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({
      message: "User Registered Successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (password !== user.password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login Successful"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};