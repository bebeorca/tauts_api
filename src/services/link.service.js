const { Link } = require("../models/link.model");
const { User } = require('../models/user.model');

exports.getLinks = (user_id) => Link.findAll({ where: { user_id } });
exports.getLink = (id) => Link.findByPk(id);

exports.createLink = (data) => Link.create(data);
exports.updateLink = async (id, data) => {
  await Link.update(data, { where: { id } });
  return await Link.findByPk(id);
};

exports.deleteLink = (id) => Link.destroy({ where: {id} });