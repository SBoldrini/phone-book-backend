const { Router } = require('express');
const { check } = require('express-validator');

const { newContact, 
        getContacts, 
        getContact, 
        updateContact, 
        deleteContact } = require('../controllers/contacts');
const fieldValidator = require('../middlewares/field-validator');

const router = Router();

router.post('/', [
  check('firstName', 'First name is required.').not().isEmpty(),
  check('lastName', 'Last name is required.').not().isEmpty(),
  check('phone', 'Phone is required.').not().isEmpty(),
  check('phone', 'Must be a valid phone number like (ej. 098123456 o 29563276).')
    .matches(/^(0?)([2-9]{1})([1-9]{1})([-.]?)([0-9]{3})([-.]?)([0-9]{3})$/),
  fieldValidator
], newContact);

router.get('/', getContacts);

router.get('/:id', getContact);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);



module.exports = router;