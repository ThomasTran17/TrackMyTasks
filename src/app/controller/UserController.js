const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");
class UserController {
    async index(req, res, next) {
        User.find({})
            .then((users) => {
                res.json(multipleMongooseToObject(users));
            })
            .catch(next);
    }
}
module.exports = new UserController();
