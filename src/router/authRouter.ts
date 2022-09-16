import express from 'express';

const router = express.Router();

import passport from "passport";

import multer from "multer";

const upload = multer();



router.get('/login/google', passport.authenticate('google',{scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google'), (req, res)=>{
    res.send('You are authenticated')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login',upload.none(), (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local',(err,user)=>{
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(req.body);
            return res.end('Wrong email or password');
        }
        req.login(user, ()=>{
            res.send('You are authenticated')
        })
        }) (req, res, next)
    })
export default router;