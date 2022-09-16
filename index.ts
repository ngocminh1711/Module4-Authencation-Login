import * as path from "path";

const express = require('express');
import bodyParser from "body-parser";

import mongoose from "mongoose";
import passport from "./src/middleware/passport";
import session from "express-session";
import authRouter from "./src/router/authRouter";
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json());
app.use(express.json());

const DB_URL = 'mongodb://localhost:27017/dbtest'

mongoose.connect(DB_URL).then(()=> {
    console.log('DB connected')
}).catch(err => console.log(err.message))

app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter)
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, function() {
    console.log('http://localhost:'+ PORT)
})
