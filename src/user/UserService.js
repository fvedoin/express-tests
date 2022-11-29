const User = require("./User");

exports.create = (user) => {
    return User.create(user);
}