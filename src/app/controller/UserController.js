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

    async loginPage(req, res, next) {
        User.find({})
            .then((users) => {
                res.render("index", { users: multipleMongooseToObject(users) });
            })
            .catch(next);
    }

    async login(req, res, next) {
        res.render("index", {
            title: "Login page",
            name: "Huy va Thuan",
        });
    }
}
module.exports = new UserController();
