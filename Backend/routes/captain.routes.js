const express = require('express');
const {body} = require('express-validator')
const captainController = require('../controllers/captain.controller');
const { authCaptain } = require('../middlewares/auth.middleware');


const router = express.Router();


router.post('/register',[
    body('fullName.firstName').trim().isLength({min:3}).withMessage('enter valid name'),
    body('email').isEmail().withMessage('enter valid email'),
    body('password').isLength({min:6}).withMessage('password should be at least 6 characters'),
    body('vehicle.type').isIn(['bike','car','auto']).withMessage('enter valid vehicle type'),
],captainController.registerCaptain )

router.post('/login',[
    body('email').isEmail().withMessage('enter valid email'),
    body('password').isLength({min:6}).withMessage('password should be at least 6 characters')
], captainController.loginCaptain)

router.get('/profile',authCaptain,captainController.ProfileCaptain)

router.get('/logout',authCaptain , captainController.logoutCaptain)

module.exports = router