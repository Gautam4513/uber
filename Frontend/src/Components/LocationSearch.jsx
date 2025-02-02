import React from 'react'

const LocationSearch = ({
  setPanelOpen,
  setVehiclePanelOpen,
  setSuggestion,
  suggestion,
  activeFild,
  setPickup,
  setDestination

}) => {
console.log(suggestion)
   
  return (

    <div className='flex h-full flex-col justify-between items-center gap-3 overflow-auto '>


    {
        suggestion.map((data,index)=>{
            return  <div 
            onClick={()=>{
                if(activeFild==="pickup"){
                  setPickup(data.description)
                  setSuggestion([])
                }
                else{
                  setDestination(data.description)
                  setSuggestion([])
                }
                
            }}
            key={index} className='flex w-full justify-start bg-gray-300 items-center gap-1 px-3 py-5 rounded-lg border border-gray-400 active:border-gray-950'>
            <div className='bg-[#eee] rounded-full w-8 aspect-square flex justify-center items-center'><i className="ri-map-pin-2-fill"></i></div>
            <div className='font-semibold overflow-hidden w-full'>{data.description} </div>
        </div> 
        })
    }


       







    </div>
  )
}

export default LocationSearch