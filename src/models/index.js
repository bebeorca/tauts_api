const sequelize = require('../config/db');
const defineUser = require('./user.model');
const defineLink = require('./link.model');

const User = defineUser(sequelize);
const Link = defineLink(sequelize);

// define associations
User.hasMany(Link, { foreignKey: 'userId', as: 'links' });
Link.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,  // <-- this is your Sequelize instance
  User,
  Link
};