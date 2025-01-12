import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopup = (props) => {
    const navigate = useNavigate()

    const [OTP, setOTP] = useState('')

    const submitHandler = (e)=>{
        e.preventDefault()
        navigate('/captain-riding')

    }
    return (
        <>
            <div
                onClick={() => {
                    props.setConfirmRidePopupOpen(false)
                }} className='bg-gray-700 w-10 rounded-full h-1 absolute top-2 right-[10.7rem] '> </div>
            <h3 className='w-full text-2xl font-bold flex justify-center'>New Ride Avilable</h3>
            <div className='w-full flex justify-between items-center'>
                <div className='w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5 rounded-full'></div>
                <div className='w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5 rounded-full'></div>
            </div>
            <div>
                <div className='p-1'>
                    <div className='flex justify-between w-full items-center bg-yellow-400 rounded-lg'>
                        <div className='py-3 px-2 flex items-center gap-2'>
                            <img className='w-14 aspect-square object-cover rounded-full' src="https://img.freepik.com/free-photo/portrait-hesitant-man-purses-lips-looks-bewilderment-feels-doubt_273609-16785.jpg" alt="" />
                            <h1 className='text-xl font-semibold'>Deep Muchadiya</h1>
                        </div>
                        <div className='text-right px-3'>
                            <h1 className='font-bold text-xl'>&#8377; 2.2 KM</h1>
                            <p className='text-md font-medium'>Distence</p>
                        </div>
                    </div>
                </div>

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
                <div className='w-full   font-semibold py-3 rounded-lg flex justify-between items-center gap-2 flex-col '>
                    <form 
                        onSubmit={(e)=>{
                            submitHandler(e)
                        }}
                    className='w-full   font-semibold py-3 rounded-lg flex justify-between items-center gap-2 flex-col '>
                        <input 
                        required
                        value={OTP}
                        onChange={(e)=>{
                            setOTP(e.target.value)
                        }}
                        type="number" placeholder='Enter OTP' className='font-mono bg-[#eee] w-full py-3  placeholder:text-sm  border focus:shadow-xl rounded-lg text-xl px-3' />
                        <button

                            className='w-full bg-green-500 text-white font-semibold py-3 rounded-lg active:bg-green-800'>Confirm</button>
                        <button type='reset'
                            onClick={() => {
                                props.setConfirmRidePopupOpen(false)
                            }}
                            className='w-full bg-gray-300  font-semibold py-3 text-red-500 rounded-lg active:bg-gray-800 active:text-white'>Cancel</button>

                    </form>


                </div>
            </div>
        </>
    )
}

export default ConfirmRidePopup