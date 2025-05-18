const userservice = require("../services/user.service");
const bcrypt = require("bcrypt");

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
