import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SoketServicesContext } from '../Context/soketContext'
import axios from "axios"

const ConfirmRidePopup = (props) => {
    const {soket}=useContext(SoketServicesContext)
    const navigate = useNavigate()

    const [OTP, setOTP] = useState('')

    const submitHandler =async (e)=>{
        e.preventDefault()
        try{
            console.log(props.ride)
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/ride-accepted`,{
                rideId:props.ride._id
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
        }catch(error){
            console.log(error)
        }
        // navigateToRiding()
        navigate('/captain-riding',{state:{ride:props.ride}})
        

    }
    // useEffect(()=>{
    //     const navigateToRiding=()=>{
    //         navigate('/captain-riding',{state:{rideId:props.ride._id}})
    //     }
    //     // navigate('/captain-riding')
    // },[])
    return (
        <>
            <div
                onClick={() => {
                    props.setConfirmRidePopupOpen(false)
                }} className='bg-gray-700 w-10 rounded-full h-1 absolute top-2 right-[10.7rem] '> </div>
            <h3 className='w-full text-2xl font-bold flex justify-center'>Confirm ride</h3>
            <div className='w-full flex justify-between items-center'>
                <div className='w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5 rounded-full'></div>
                <div className='w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5 rounded-full'></div>
            </div>
            <div>
                <div className='p-1'>
                    <div className='flex justify-between w-full items-center bg-yellow-400 rounded-lg'>
                        <div className='py-3 px-2 flex items-center gap-2'>
                            <img className='w-14 aspect-square object-cover rounded-full' src="https://img.freepik.com/free-photo/portrait-hesitant-man-purses-lips-looks-bewilderment-feels-doubt_273609-16785.jpg" alt="" />
                            <h1 className='text-xl font-semibold'>{(props.ride?.userId?.fullName?.firstName)+" "+(props.ride?.userId?.fullName?.lastName)}</h1>
                        </div>
                        <div className='text-right px-3'>
                            <h1 className='font-bold text-xl'>&#8377; {props.ride?.distance/1000} KM</h1>
                            <p className='text-md font-medium'>Distance</p>
                        </div>
                    </div>
                </div>

                <div className='w-full bg-[#eee] h-0.5'></div>
                <div className='px-5 py-2'>
                    <div className='flex items-center gap-5 py-2'>
                        <i className="ri-map-pin-2-fill"></i>
                        <div>
                            <h2 className='text-xl font-bold'>
                                PickUp
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
                            <h2 className='text-xl font-bold'>&#8377; {props.ride?.fare}</h2>
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