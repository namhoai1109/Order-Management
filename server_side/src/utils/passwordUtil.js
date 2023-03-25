const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

exports.comparePassword = async (password, storedPassword) => {
    const result = await bcrypt.compare(password, storedPassword);
    return result;
}