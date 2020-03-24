"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
try {
    new app_1.default({
        port: 8080,
        applicationName: 'TS Server'
    }).run();
}
catch (e) {
    console.error(e.message);
}
;
