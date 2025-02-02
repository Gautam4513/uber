import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopup from '../Components/RidePopup'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../Components/ConfirmRidePopup'
import { SoketServicesContext } from '../Context/soketContext'
import axios from 'axios'

import LiveLocation2 from '../Components/LiveLocation2'

const CaptainHome = () => {
  const {sendMessage , receiveMessage,soket } = useContext(SoketServicesContext)
  const {captainData, setCaptainData}=useContext(CaptainDataContext)

  const [ridePopupOpen, setRidePopupOpen] = useState(false)
  const [confirmRidePopupOpen, setConfirmRidePopupOpen] = useState(false)
  const [ride, setRide] = useState({})
  const ridePopupRef = useRef(null)
  const confirmRidePopupRef = useRef(null)

useGSAP(()=>{
  if(ridePopupOpen){
    gsap.to(ridePopupRef.current,{
      translateY:'0%'
    })
    
  }
  else{
    gsap.to(ridePopupRef.current,{
      translateY:'100%'
    })
  }
},[ridePopupOpen])



useGSAP(()=>{
  if(confirmRidePopupOpen){
    gsap.to(confirmRidePopupRef.current,{
      translateY:'0%'
    })
    
  }
  else{
    gsap.to(confirmRidePopupRef.current,{
      translateY:'100%'
    })
  }
},[confirmRidePopupOpen])

useEffect(() => {
  const sendLocation = ()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        sendMessage("update-location-captain",{
          userId:captainData._id,
          location:{
            ltd:position.coords.latitude,
            lng:position.coords.longitude
          }
        })
      })
    }
  }

  const intervalId = setInterval(sendLocation, 10000);
  sendLocation()
}, [])
soket.on("new-ride",(data)=>{
  console.log(data)
  setRide(data)
  console.log(ride)
  setRidePopupOpen(true)
})

const confirmRide=async ()=>{
  try{
await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/ride-confirm`,{
  ride,
  captainId:captainData._id
},{
  headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }
})
  }catch(error)
  {
    console.log(error)
  }
}



  return (
    <div className='w-screen h-screen overflow-hidden relative'>
      <div className='fixed w-full h-[65vh] z-20 bg-green-400'>
        <LiveLocation2 isUser={false}  />
      </div>
      
      <div className='relative w-full h-full'>
        <div className='fixed top-3 flex justify-between items-center w-screen px-3  z-[21] '>
          <img className='w-32 ' src="./imges/uber-logo-for-driver.webp" alt="uer logo" />
          <Link to='/captain/logout' className='w-8 h-8 bg-white rounded-full flex justify-center items-center'>
            <i className="ri-logout-box-r-line"></i>
          </Link>
        </div>

        <div className='absolute bottom-0 w-full px-3 py-2 z-10'>
          <CaptainDetails
            captainData={captainData}
          />
        </div>

        <div ref={ridePopupRef}  className='fixed w-screen bottom-0 translate-y-full bg-white border border-black py-5 px-3 rounded-lg z-20'>
          <RidePopup  
            setRidePopupOpen={setRidePopupOpen}  
            setConfirmRidePopupOpen={setConfirmRidePopupOpen}
            ride={ride}
            confirmRide={confirmRide}
          />
        </div>

        <div ref={confirmRidePopupRef}   className='fixed w-screen h-screen bottom-0 z-20 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
          <ConfirmRidePopup  
            setRidePopupOpen={setRidePopupOpen}  
            setConfirmRidePopupOpen={setConfirmRidePopupOpen}
            ride={ride}
          />
        </div>
      </div>
    </div>
  )
}

export default CaptainHome