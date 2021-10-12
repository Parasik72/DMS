const {User, Role} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult} = require('express-validator');

class Controller {
    // /api/auth/registration 'POST'
    async registration(req,res){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return res.status(400).json({message: errors.errors[0].msg});
            const {firstname, lastname, email, studentIDSeries, faculty, group, password} = req.body;
            const checkEmail = await User.findOne({email});
            if(checkEmail)
                return res.status(400).json({message: 'Email is already in use.'});
            const checkStudentIDSeries = await User.findOne({studentIDSeries});
            if(checkStudentIDSeries)
                return res.status(400).json({message: 'Student ID series is already in use.'});
            const hashPassword = await bcrypt.hash(password, 8);
            const role = await Role.findOne({value: 'USER'});
            const user = await User.create({
                firstname,
                lastname,
                email,
                studentIDSeries,
                faculty,
                group,
                password: hashPassword,
                roles: [role.value]
            });
            const token = jwt.sign({
                userId: user._id
            },
            config.get('jwtSecretKey'),
            {
                expiresIn: '1h'
            });
            return res.json({user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                studentIDSeries: user.studentIDSeries,
                faculty: user.faculty,
                group: user.group,
                roles: user.roles
            }, token});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Registration error.'});
        }
    }

    // /api/auth/login 'POST'
    async login(req,res){
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user)
                return res.status(400).json({message: 'Incorrect data.'})
            const hashPassword = await bcrypt.compare(password, user.password);
            if(!hashPassword)
                return res.status(400).json({message: 'Incorrect data.'})
            const token = jwt.sign({
                userId: user._id
            },
            config.get('jwtSecretKey'),
            {
                expiresIn: '1h'
            });
            return res.json({user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                studentIDSeries: user.studentIDSeries,
                faculty: user.faculty,
                group: user.group,
                roles: user.roles
            }, token});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Login error.'});
        }
    }

    // /api/auth/ 'GET'
    async auth(req,res){
        try {
            const user = await User.findById(req.user.userId);
            if(!user)
                return res.status(401).json({message: 'No authorization.'});
            const token = jwt.sign({
                userId: user._id
            },
            config.get('jwtSecretKey'),
            {
                expiresIn: '1h'
            });
            return res.json({user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                studentIDSeries: user.studentIDSeries,
                faculty: user.faculty,
                group: user.group,
                roles: user.roles
            }, token});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Auth error.'});
        }
    }
}

module.exports = new Controller();