const { Router } = require('express');
const { check } = require('express-validator');

const { login, register } = require('../controllers/auth');
const fieldValidator = require('../middlewares/field-validator');


const router = Router();

router.post('/login', [
  check('email', 'Email is required.').normalizeEmail().isEmail(),
  check('password', 'Password is required.').not().isEmpty(),
  check('password', 'The password must have at least 6 digits').isLength({min: 6}),
  fieldValidator
], login);

router.post('/register', register);


module.exports = router;