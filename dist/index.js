"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express = require('express');
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("./src/middleware/passport"));
const express_session_1 = __importDefault(require("express-session"));
const authRouter_1 = __importDefault(require("./src/router/authRouter"));
const PORT = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(body_parser_1.default.json());
app.use(express.json());
const DB_URL = 'mongodb://localhost:27017/dbtest';
mongoose_1.default.connect(DB_URL).then(() => {
    console.log('DB connected');
}).catch(err => console.log(err.message));
app.use((0, express_session_1.default)({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/auth', authRouter_1.default);
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, function () {
    console.log('http://localhost:' + PORT);
});
//# sourceMappingURL=index.js.map