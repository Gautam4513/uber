import React from 'react'

const ConfirmVehiclePanel = (props) => {
    return (
        <>
            <div
                onClick={() => {
                    props.setConfirmVehiclePanelOpen(false)
                }} className='bg-gray-700 w-10 rounded-full h-1 absolute top-2 right-[10.7rem] '> </div>
            <h3 className='w-full text-2xl font-bold flex justify-center'>Confirm Your Ride</h3>
            <div className='w-full flex justify-between items-center'>
                <div className='w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5 rounded-full'></div>
                <div className='w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5 rounded-full'></div>
            </div>
            <div>
                <img src="./imges/car.png" alt="" />
                <div className='w-full bg-[#eee] h-0.5'></div>
                <div className='px-5 py-2'>
                    <div className='flex items-center gap-5 py-2'>
                        <i className="ri-map-pin-2-fill"></i>
                        <div>
                            <h2 className='text-xl font-bold'>
                                562/11-A
                            </h2>
                            <p>
                                kalavad road,rajkot
                            </p>
                        </div>
                    </div>
                    <div className='w-full bg-[#eee] h-0.5'></div>
                    <div className='flex items-center gap-5 py-2'>
                        <i className="ri-map-pin-4-fill"></i>
                        <div>
                            <h2 className='text-xl font-bold'>
                                562/12-A
                            </h2>
                            <p>
                                kalavad road,rajkot
                            </p>
                        </div>
                    </div>
                    <div className='w-full bg-[#eee] h-0.5'></div>
                    <div className='flex items-center gap-5 py-2'>
                    <i className="ri-currency-fill"></i>
                    <div>
                        <h2 className='text-xl font-bold'>&#8377; 193.58</h2>
                    </div>
                    </div>
                    
                </div>
                <div className='w-full bg-[#eee] h-0.5 mb-3'></div>
                <button 
                    onClick={()=>{
                        props.setLookingForDriverOpen(true)
                        props.setConfirmVehiclePanelOpen(false)
                    }}
                className='w-full bg-green-500 text-white font-semibold py-3 rounded-lg active:bg-green-800'>Confirm</button>
            </div>
        </>
    )
}

export default ConfirmVehiclePanel