const express = require('express')

const router = express.Router();

const employeesController = require('../controllers/employees.controllers')
const verifyToken = require('../middleware/auth.middleware').verifyToken

const verifyRole = require('../middleware/auth.middleware').verifyRole


router.post('/', employeesController.create);
router.get('/', employeesController.finAll)
router.get('/username/:username', employeesController.findOne)
router.delete('/adminRole/:username',verifyToken,verifyRole, employeesController.delete)
router.patch('/:username', employeesController.update)  
router.get('/check_duplicate_email/:email',employeesController.checkDuplicateEmail)


module.exports = router; 