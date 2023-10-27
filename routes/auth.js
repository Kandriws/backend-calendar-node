/* 
    Ruta: /api/auth
    Description: Login
*/
const { Router } = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth'); 3
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { jwtValidateMiddleware } = require('../middlewares/jwt-validator');
const router = Router();

router.post('/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .withMessage('Password must be alphanumeric'),
        fieldsValidator
    ],
    createUser);

router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .withMessage('Password must be alphanumeric'),
        fieldsValidator
    ],
    loginUser);

router.get('/renew',
    [
        jwtValidateMiddleware
    ],
    renewToken);

module.exports = router;