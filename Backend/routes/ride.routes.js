const express = require('express')
const router = express.Router()
const {body, query} = require('express-validator')
const { authUser, authCaptain } = require('../middlewares/auth.middleware')
const { createRideController, getFareController, rideConfirmController, rideAcceptedController, rideCompletedController } = require('../controllers/ride.controller')

router.post('/create',
body('pickUp').isLength({min:3}).withMessage("3 character require"),
body('destination').isLength({min:3}).withMessage('3 character require'),
body('vehicleType').isIn(["bike","car","auto"]).withMessage("please select bike or car or auto"),
authUser,
createRideController)

router.get('/get-fare',
query('pickUp').isLength({min:3}).withMessage("give more data"),
query('destination').isLength({min:3}).withMessage('give more data'),
authUser,
getFareController)

router.post('/ride-confirm',
authCaptain,rideConfirmController)

router.post('/ride-accepted',
authCaptain,rideAcceptedController)

router.post('/ride-completed',
authCaptain,rideCompletedController)


module.exports = router