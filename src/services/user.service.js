const { User } = require('../models/user.model');

exports.register = async (data) =>{
    return await User.create(data);
} 

exports.getUser = (user_id) => User.findByPk(user_id);

exports.updateUser = async (id, data) => {
    const user = await User.findByPk(id);
    if(!user) return null;
    await user.update(data);
    return user;
}