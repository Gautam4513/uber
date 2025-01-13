const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const { authUser } = require('../middlewares/auth.middleware')
const { createRideController } = require('../controllers/ride.controller')

router.post('/create',
authUser,
body('pickUp').isLength({min:3}).withMessage("3 character require"),
body('destination').isLength({min:3}).withMessage('3 character require'),
body('vehicleType').isIn(["bike","car","auto"]).withMessage("please select bike or car or auto"),
createRideController)


module.exports = router