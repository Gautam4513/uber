import React from 'react'

const LocationSearch = (props) => {

    const sampleData = ['mota mava,kalavad road,rajkot1',
    'mota mava,kalavad road,rajkot2',
    'mota mava,kalavad road,rajkot3',
    'mota mava,kalavad road,rajkot4',
    'mota mava,kalavad road,rajkot5',
    'mota mava,kalavad road,rajkot6'
]
  return (

    <div className='flex flex-col justify-between items-center gap-3 overflow-auto h-full'>


    {
        sampleData.map((data,index)=>{
            return  <div 
            onClick={()=>{
                props.setPanelOpen(false)
                props.setVehiclePanelOpen(true)
            }}
            key={index} className='flex justify-start bg-gray-300 items-center gap-2 px-3 py-5 rounded-lg border border-gray-400 active:border-gray-950'>
            <div className='bg-[#eee] rounded-full w-8 aspect-square flex justify-center items-center'><i className="ri-map-pin-2-fill"></i></div>
            <div className='font-semibold overflow-hidden w-full'>{data} </div>
        </div> 
        })
    }


       







    </div>
  )
}

export default LocationSearch