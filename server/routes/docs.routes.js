const Router = require("express");
const {docs: Controller} = require('../controllers');
const {check} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware.js');
const roleMiddleware = require('../middleware/role.middleware.js');

const router = Router();

// /api/docs 'POST'
router.post('/', [
    authMiddleware,
    roleMiddleware('ADMIN'),
    check('type', 'Type field is required.').isLength({min:2, max: 20}),
    check('title', 'Title field is required.').isLength({min:2, max: 20}),
    check('owner', 'Owner field is required.').isLength({min:2, max: 30}),
], Controller.upload);

// /api/docs 'GET'
router.get('/', authMiddleware, Controller.get);
router.get('/get', [
    authMiddleware,
    roleMiddleware('ADMIN')
], Controller.getById);
router.get('/download', authMiddleware, Controller.download);

// /api/docs 'PUT'
router.put('/', [
    authMiddleware,
    roleMiddleware('ADMIN'),
    check('type', 'Type field is required.').isLength({min:2, max: 20}),
    check('title', 'Title field is required.').isLength({min:2, max: 20}),
    check('owner', 'Owner field is required.').isLength({min:2, max: 30}),
    check('fileId', 'File id field is required.').isLength({min:2, max: 30})
], Controller.edit);

// /api/docs/ 'DELETE'
router.delete('/', [
    authMiddleware,
    roleMiddleware('ADMIN'),
    check('fileId', 'File id field is required.').isLength({min:2, max: 30})
], Controller.delete);

module.exports = router;