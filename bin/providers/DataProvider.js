"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const nedb = require("nedb");
class DataProvider {
    constructor(dbStoreName = 'data') {
        this.dbStore = new nedb({
            filename: DataProvider.ROOT_DB_STORE + dbStoreName + '.db'
        });
        this.dbStore.loadDatabase((err => {
            this.onLoadStore(err);
        }));
    }
}
exports.default = DataProvider;
DataProvider.ROOT_DB_STORE = path.normalize(__dirname + '/../../db/');
