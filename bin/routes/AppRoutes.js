"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoutes_1 = require("./UserRoutes");
class AppRoutes {
    constructor() {
        this.routeList = [
            { path: '/user', router: UserRoutes_1.default }
        ];
    }
    mount(expApp) {
        this.routeList.forEach((item) => {
            expApp.use(item.path, item.router.createRoute(express_1.Router));
        });
    }
}
exports.default = AppRoutes;
