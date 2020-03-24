"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SecurityService_1 = require("../services/SecurityService");
class AuthController {
    constructor(app) {
        this.app = app;
        this.userDataProvider = this.app.providers.user;
    }
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        this.userDataProvider.findOne({ email: email }, (err, user) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                if (!user || !SecurityService_1.default.validatePass(password, user.password)) {
                    res.send({ msg: 'Incorrect password', code: 400 });
                }
                else {
                    user.lastVisit = Date.now().toString();
                    this.userDataProvider.update({ id: user._id }, user, () => {
                        console.log('User updated');
                    });
                }
                req.session.userId = user._id;
                res.send({ msg: "Welcome back!" });
            }
        });
    }
    logout(req, res) {
        const session = req.session;
        if (!session) {
            res.sendStatus(400);
        }
        else {
            session.destroy(() => {
                res.send({ msg: "Logout completed" });
            });
        }
    }
    checkLoginSession(req, res, next) {
        const session = req.session;
        if (~['/logout', '/add'].indexOf(req.path)) {
            if (!session.userId) {
                next();
            }
            else {
                res.sendStatus(406);
            }
        }
        else {
            if (session.userId) {
                next();
            }
            else {
                res.sendStatus(401);
            }
        }
    }
}
exports.default = AuthController;
