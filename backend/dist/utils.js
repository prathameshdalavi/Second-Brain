"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = randomString;
function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * charactersLength)];
    }
    return result;
}
