"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const session = require("express-session");
const express = require("express");
class App {
    constructor(config) {
        this.config = config;
        this.config = config;
        this.expApp = express();
        App.app = this;
    }
    static getInstance() {
        return App.app;
    }
    run() {
        this.expApp.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'kirbytwister',
            cookie: { maxAge: 3600000 }
        }));
        this.expApp.use(bodyParser.urlencoded({ extended: false }));
        this.expApp.use((req, res, next) => {
            res.contentType('application/json');
            next();
        });
        this;
    }
    get providers() {
        return this.dataProviders;
    }
}
exports.default = App;
