const Router = require("express");
const {auth: Controller} = require('../controllers');
const {check} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = Router();

// /api/auth 'POST'
router.post('/registration',[
    check('firstname', 'Firstname must be at least two characters long and include only letters of the Latin alphabet.').matches(/^[A-Z]+[a-zA-z]+$/).isLength({min:2, max:15}),
    check('lastname', 'Lastname must be at least two characters long and include only letters of the Latin alphabet.').matches(/^[A-Z]+[a-zA-z]+$/).isLength({min:2, max:15}),
    check('email', 'Email must be include letters of the Latin alphabet, numbers and dots.').isEmail(),
    check('studentIDSeries', 'Student ID series must be eight characters long and include only numbers of the Latin alphabet.').matches(/^[0-9]+$/).isLength({min:8,max:8}),
    check('faculty', 'Faculty must be at least three characters long and include letters or numbers.').matches(/^[a-zA-z0-9]+$/).isLength({min:3,max:20}),
    check('group', 'Group must be at least three characters long and include letters, numbers or special characters.').isLength({min:3,max:20}),
    check('password', 'Password must be at least eight characters long and include letters, numbers or special characters.').isLength({min: 8, max: 25})
], Controller.registration);
router.post('/login', Controller.login);

// /api/auth 'GET'
router.get('/', authMiddleware, Controller.auth);

module.exports = router;