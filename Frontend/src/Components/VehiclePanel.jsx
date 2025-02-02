import React from 'react'

const VehiclePanel = (props) => {
    return (
        <>
            <div
                onClick={() => {
                    props.setVehiclePanelOpen(false)
                }} className='bg-gray-700 w-10 rounded-full h-1 absolute top-2 right-[10.7rem] '> </div>
            <h3 className='text-2xl font-semibold'>Choose Your Vehicle</h3>
            <div className='w-full h-0.5 bg-gradient-to-r mb-3 from-transparent via-[rgb(0,0,0)] to-transparent rounded-full'></div>


            <div className='flex flex-col justify-between items-center gap-2 '>





                <div
                    onClick={() => {
                        props.setConfirmVehiclePanelOpen(true)
                        props.setVehicleType('car')
                    }}
                    className='flex justify-between items-center bg-[#eee] overflow-hidden rounded-lg border border-gray-500 active:border-gray-950 w-full'>
                    <div className=' w-24 aspect-square  flex justify-center items-center'>
                        <img src="./imges/car.png" alt="car" />
                    </div>
                    <div className=' flex-1 w-full h-full py-1 px-1'>
                        <h2 className='text-xl font-semibold flex justify-start items-center'>UberGO
                            <i className="ri-user-fill text-sm px-2"></i>
                            <div className="capacity text-lg">
                                4
                            </div>
                        </h2>
                        <div>2 minites away</div>
                        <div className='text-sm'>Afortable car Uber</div>
                    </div>
                    <div className='price font-bold text-xl px-2 '>&#8377;
                        {props.fare.car}</div>
                </div>




                <div onClick={() => {
                    props.setConfirmVehiclePanelOpen(true)
                    props.setVehicleType('bike')
                }} className='flex justify-between items-center bg-[#eee] overflow-hidden rounded-lg border border-gray-500 active:border-gray-950 w-full'>
                    <div className=' w-24 aspect-square  flex justify-center items-center'>
                        <img src="./imges/bike.webp" alt="car" />
                    </div>
                    <div className=' flex-1 w-full h-full py-1 px-1'>
                        <h2 className='text-xl font-semibold flex justify-start items-center'>MOTO
                            <i className="ri-user-fill text-sm px-2"></i>
                            <div className="capacity text-lg">
                                1
                            </div>
                        </h2>
                        <div>4 minites away</div>
                        <div className='text-sm'>Afortable bike Uber</div>
                    </div>
                    <div className='price font-bold text-xl px-2 '>&#8377;
                    {props.fare.bike}</div>
                </div>








                <div onClick={() => {
                    props.setConfirmVehiclePanelOpen(true)
                    props.setVehicleType('auto')
                }} className='flex justify-between items-center bg-[#eee] overflow-hidden rounded-lg border border-gray-500 active:border-gray-950 w-full'>
                    <div className=' w-24 aspect-square  flex justify-center items-center'>
                        <img src="./imges/auto.png" alt="car" />
                    </div>
                    <div className=' flex-1 w-full h-full py-1 px-1'>
                        <h2 className='text-xl font-semibold flex justify-start items-center'>Auto
                            <i className="ri-user-fill text-sm px-2"></i>
                            <div className="capacity text-lg">
                                3
                            </div>
                        </h2>
                        <div>3 minites away</div>
                        <div className='text-sm'>Afortable auto Uber</div>
                    </div>
                    <div className='price font-bold text-xl px-2 '>&#8377;
                    {props.fare.auto}</div>
                </div>






            </div>
        </>
    )
}

export default VehiclePanel