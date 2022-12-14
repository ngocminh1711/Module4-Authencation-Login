"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: String,
    password: String,
    google: {
        id: {
            type: String
        },
    }
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map