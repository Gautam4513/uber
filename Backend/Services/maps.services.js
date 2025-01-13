const axios = require('axios');
module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: process.env.GOOGLE_MAPS_API
            }
        });
        console.log(response)
        if(response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            // console.log(lat,lng)
            return { lat: lat, lng: lng };
        }
        else{
           throw  ({error:'Address not found'})
        }

   
    } catch (error) {
        console.error('Error retrieving address coordinates:', error);
        throw error;
    }
};


module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw ({error:'Origin or Destination are required'})
    }
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: origin,
                destinations: destination,
                key: process.env.GOOGLE_MAPS_API
            }
        });
        console.log(response)
        if(response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status !== 'OK'){
                throw ({error:'Distance not found'})
            }
            const distanceTime = response.data.rows[0].elements[0];
            return distanceTime;
        }
        else{
            throw ({error:'Distance not found'})
        }
    } catch (error) {
        console.error('Error retrieving distance and time:', error);
        throw error;
    }
}

module.exports.getAutoSuggestion = async (input)=>{
    if(!input){
        throw ({message:'qury is required'})
    }
    try{
const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json',{
    params:{
        input:input,
        key:process.env.GOOGLE_MAPS_API
    }
})
if(response.data.status === 'OK'){
    return response.data.predictions
}
else{
    throw ({error:'No suggestions found'})
}
    }catch(err){
        console.log(err)
        throw err
    }
}