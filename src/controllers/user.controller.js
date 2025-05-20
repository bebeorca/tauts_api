const userservice = require("../services/user.service");

exports.getUserProfile = async (req, res) => {
  const id = req.user.id
  const user = await userservice.getUser(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res
    .status(200)
    .json({ status: 200, user });
};
