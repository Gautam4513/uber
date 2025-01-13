const express = require('express')
const { validationResult } = require('express-validator')
const { getAddressCoordinates, getDistanceTime, getAutoSuggestion } = require('../Services/maps.services')





module.exports.getAddressCoordinateController = async (req, res, next) => {
    const error = validationResult(req)
    console.log(error)
    if (!error.isEmpty()) {
       return res.status(400).json({ error: error.array() })
    }
    const { address } = req.query
    console.log(req.query)
    try {
        const coordinates = await getAddressCoordinates(address)
        console.log(coordinates)
        res.status(200).json(coordinates)
    }
    catch(error){
        res.status(400).json({error})
    }
}


module.exports.getDistanceTimeController = async (req, res, next) => {
    const error = validationResult(req)
    console.log(error)
    if (!error.isEmpty()) {
       return res.status(400).json({ error: error.array() })
    }
    const { origin, destination } = req.query
    console.log(req.query)
    try {
        const distanceTime = await getDistanceTime(origin, destination)
        console.log(distanceTime)
        res.status(200).json(distanceTime)
    }
    catch(error){
        res.status(400).json({error})
    }
}


module.exports.getAutoSuggestionController = async (req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    try{
const {input}= req.query
const suggestions = await getAutoSuggestion(input)
res.status(200).json(suggestions)
    }catch(err){
        res.status(400).json({error:err})
    }
}