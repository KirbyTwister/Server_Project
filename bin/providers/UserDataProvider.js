"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataProvider_1 = require("./DataProvider");
class UserDataProvider extends DataProvider_1.default {
    constructor() {
        super("User");
    }
    select(where, onSelect) {
        this.dbStore.find(where, onSelect);
    }
    create(data, onCreate) {
        this.dbStore.insert(data, onCreate);
    }
    update(where, newData, onUpdate) {
        this.dbStore.update(where, { $set: newData });
    }
    delete(where, onDelete) {
        this.dbStore.remove(where, { multi: true }, onDelete);
    }
    findOne(where, onSelect) {
        this.dbStore.findOne(where, onSelect);
    }
    onLoadStore(err) {
        if (err) {
            console.error(err);
        }
    }
}
exports.default = UserDataProvider;
