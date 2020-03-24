"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
const SecurityService_1 = require("../services/SecurityService");
class UserController {
    constructor(app) {
        this.app = app;
        this.userProvider = this.app.providers.user;
    }
    findAll(onLoad) {
        this.userProvider.select({}, onLoad);
    }
    findByEmail(email, onLoad, onError) {
        this.userProvider.findOne({ email: email }, (err, data) => {
            if (err) {
                onError(err.message, 500);
            }
            else {
                const result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    }
    create(data, onCreate, onError) {
        const emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        if (!emailPattern.test(data.email) || !data.password.length) {
            onError("Incorrect password or email", 400);
        }
        else {
            this.findByEmail(data.email, (result) => {
                if (!result) {
                    const user = new User_1.default();
                    user.name = data.name || data.email;
                    user.email = data.email;
                    user.password = SecurityService_1.default.generateHashPass(data.password);
                    this.userProvider.create(user, (err, newData) => {
                        if (err !== null) {
                            onError(err.message, 500);
                        }
                        else {
                            onCreate(newData);
                        }
                    });
                }
                else {
                    onError("User already exists", 400);
                }
            }, onError);
        }
    }
    removeById(id, onRemove) {
        this.userProvider.delete({ _id: id }, onRemove);
    }
    updateById(id, newData, onUpdate) {
        this.userProvider.update({ _id: id }, newData, onUpdate);
    }
}
exports.default = UserController;
