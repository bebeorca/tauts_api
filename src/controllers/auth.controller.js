require("dotenv").config();
const { User } = require("../models/user.model");
const userservice = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' })
  }
};


exports.register = async (req, res) => {
  try {
    const hashedPw = await bcrypt.hash(req.body.password, 10);
    const data = { ...req.body, password: hashedPw };
    const nuser = await userservice.register(data);
    res.status(201).json(nuser);
  } catch (error) {
      console.error(error); 
    res.status(400).json({ error: "Failed to register" });
  }
};

