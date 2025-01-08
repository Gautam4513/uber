const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const userController = require('../controllers/user.controller')
const authorization = require('../middlewares/auth.middleware')

router.post('/register',
[
    body('fullName.firstName').trim().isLength({min:3}).withMessage('firstname mustbe graterthan 3 characters'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters'),
],userController.registerUser)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters'),
], userController.loginUser)

router.get('/profile',authorization.authUser,userController.profileUser)

router.get('/logout',authorization.authUser,userController.logoutUser)


module.exports = router