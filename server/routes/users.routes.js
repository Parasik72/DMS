const Router = require("express");
const {users: Controller} = require('../controllers');
const {check} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware.js');
const roleMiddleware = require('../middleware/role.middleware.js');


const router = Router();

// /api/users/ 'GET'
router.get('/', [
    authMiddleware,
    roleMiddleware('ADMIN')
] ,Controller.getUsers);

module.exports = router;