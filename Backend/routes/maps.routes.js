const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');
const { getAddressCoordinateController, getDistanceTimeController, getAutoSuggestionController } = require('../controllers/maps.controller');
const router = express.Router();
const {query} = require('express-validator')

router.get('/get-address-coordinates',
query('address').isLength({min:3}).withMessage('give more than 3 character')
,authUser,getAddressCoordinateController)


router.get('/get-distance-time',
query('origin').isLength({min:3}).withMessage('give more than 3 character'),
query('destination').isLength({min:3}).withMessage('give more than 3 character'),
authUser,getDistanceTimeController)

router.get('/get-auto-suggestion',
query('input').isLength({min:3}).withMessage('give more than 3 character'),
authUser,getAutoSuggestionController)

module.exports = router;