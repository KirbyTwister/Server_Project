"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthContoller_1 = require("../controllers/AuthContoller");
const UserController_1 = require("../controllers/UserController");
const app_1 = require("../app");
const UserRoute = {
    createRoute(router) {
        const app = app_1.default.getInstance();
        const AuthCtrl = new AuthContoller_1.default(app);
        const UserCtrl = new UserController_1.default(app);
        return router()
            .use(AuthCtrl.checkLoginSession)
            .get('/', (req, res) => {
            UserCtrl.findAll((err, data) => {
                res.send({ users: data });
            });
        })
            .post('/add', (req, res) => {
            if (!req.body) {
                res.send({ msg: "Empty body request", code: 400 });
            }
            else {
                UserCtrl.create(req.body, (newData) => {
                    res.send({ userCreated: newData });
                }, (msg, code) => {
                    res.send({ message: msg, code: code });
                });
            }
        })
            .post('/login', (req, res) => {
            if (!req.body) {
                res.send({ msg: "Empty body request", code: 400 });
            }
            else {
                AuthCtrl.login(req, res);
            }
        })
            .get('/logout', AuthCtrl.logout);
    }
};
exports.default = UserRoute;
