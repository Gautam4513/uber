import React, { useRef, useState } from 'react'
import FinishRide from '../Components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import LiveLocation2 from '../Components/LiveLocation2'

const CaptainRiding = () => {
  const [finishRideOpen, setFinishRideOpen] = useState(false)
  const finishRideRef = useRef(null)
  const location= useLocation()
  const ride = location.state?.ride
  const navigate = useNavigate()

const rideCompleted =async ()=>{
try{
const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/ride-completed`,{
  rideId:ride._id
},{
  headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }
})
console.log(response)
navigate('/captain-home')
}catch(error){
  console.log(error)
}
}


useGSAP(()=>{
  if(finishRideOpen){
    gsap.to(finishRideRef.current,{
      translateY:'0%'
    })
  }
  else{
    gsap.to(finishRideRef.current,{
      translateY:'100%'
    })
  }
},[finishRideOpen])


  return (
    <div>
        <div className='fixed top-3 flex justify-between items-center w-screen px-3  z-10 '>
        <img className='w-32 ' src="./imges/uber-logo-for-driver.webp" alt="uer logo" />
      
      </div>
      <div className='w-screen h-[90vh]'>
        <LiveLocation2  isUser={false} ride={ride}/>
      </div>

      <div  className='fixed w-screen bottom-0 translate-y-0  bg-yellow-400 border  py-5 px-3 rounded-lg'>
       <div className='flex justify-between w-full items-center'>
        <h1 className='text-xl font-bold font-mono'>4 KM away</h1>
        <button
        onClick={()=>{
          setFinishRideOpen(true)
        }}
        className='bg-green-400 text-lg font-medium p-3 rounded-lg'>Complete Ride</button>
       </div>
        </div>


        <div  ref={finishRideRef}  className='fixed w-screen  bottom-0 z-20 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
        <FinishRide 
        setFinishRideOpen={setFinishRideOpen} 
        ride={ride}
        rideCompleted={rideCompleted}
        />
        </div>




    </div>
  )
}

export default CaptainRiding