const express = require('express');
const router = express.Router();
const userController = require('./../controllers/users.controllers');

router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post("/registration",userController.registerUser);
router.post("/login",userController.loginUser);
module.exports = router;
