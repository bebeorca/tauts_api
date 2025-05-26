const { User } = require("../models/user.model");

exports.register = async (data) => {
  return await User.create(data);
};

exports.getUser = (user_id) => User.findByPk(user_id);
exports.getUserName = (name) => User.findOne({ where: { name } });

exports.updateUser = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.update(data);
    await user.reload();

    return user;
  } catch (error) {
    throw error;
  }
};

exports.getAllUser = async () => {
  return await User.findAll({
    attributes: ["id", "name", "email"],
  });
};

exports.deletUser = async (id) => {
    return await User.destroy({ where: { id }})
}