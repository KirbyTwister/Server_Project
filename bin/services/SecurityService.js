"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crypto = require("crypto");
class SecurityService {
    static generateHashPass(password) {
        const secretWord = 'typescript';
        return Crypto.createHmac('sha1', secretWord).update(password).digest('hex');
    }
    static validatePass(password, hash) {
        return SecurityService.generateHashPass(password) === hash;
    }
}
exports.default = SecurityService;
