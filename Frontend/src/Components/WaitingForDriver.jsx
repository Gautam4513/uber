import React from 'react'

const WaitingForDriver = (props) => {
    const imge = {
        car: "./imges/car.png",
        bike: "./imges/bike.webp",
        auto: "./imges/auto.png"
    }
    return (
        <>
            <div
                onClick={() => {
                    props.setWaitingForDriverOpen(false)
                }} className='bg-gray-700 w-10 rounded-full h-1 absolute top-2 right-[10.7rem] '> </div>
            <h3 className='w-full text-2xl font-bold flex justify-center'>Waiting For a Driver</h3>
            <div className='w-full flex justify-between items-center'>
                <div className='w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5 rounded-full'></div>
                <div className='w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5 rounded-full'></div>
            </div>
            <div>
                <div className='flex justify-between py-3'>
                    <img className='w-1/2' src={imge[props.vehicleType]} alt="" />
                    <div className='text-right w-1/2' >
                        <h3 className='text-lg font-bold w-full'>{props.ride?.captain?.fullName?.firstName}</h3>
                        <h2 className='text-xl font-semibold w-full'>{props.ride?.captain?.vehicle?.plate}</h2>
                        <p className='text-sm w-full'>{props.ride?.captain?.vehicle?.type}</p>
                    </div>
                </div>

                <div className='w-full bg-[#eee] h-0.5'></div>
                <div className='px-5 py-2'>
                    <div className='flex items-center gap-5 py-2'>
                        <i className="ri-map-pin-2-fill"></i>
                        <div>
                            <h2 className='text-xl font-bold'>
                                pickUp
                            </h2>
                            <p>
                                {props.ride?.pickUp}
                            </p>
                        </div>
                    </div>
                    <div className='w-full bg-[#eee] h-0.5'></div>
                    <div className='flex items-center gap-5 py-2'>
                        <i className="ri-map-pin-4-fill"></i>
                        <div>
                            <h2 className='text-xl font-bold'>
                                Destination
                            </h2>
                            <p>
                                {props.ride?.destination}
                            </p>
                        </div>
                    </div>
                    <div className='w-full bg-[#eee] h-0.5'></div>
                    <div className='flex items-center gap-5 py-2'>
                        <i className="ri-currency-fill"></i>
                        <div>
                            <h2 className='text-xl font-bold'>&#8377; {props.fare[props.vehicleType]}</h2>
                        </div>
                    </div>

                </div>
                <div className='w-full bg-[#eee] h-0.5 mb-3'></div>

            </div>
        </>
    )
}

export default WaitingForDriver