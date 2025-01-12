import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopup from '../Components/RidePopup'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../Components/ConfirmRidePopup'

const CaptainHome = () => {

  const [ridePopupOpen, setRidePopupOpen] = useState(true)
  const [confirmRidePopupOpen, setConfirmRidePopupOpen] = useState(false)
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


  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className='fixed top-3 flex justify-between items-center w-screen px-3  z-10 '>
        <img className='w-32 ' src="./imges/uber-logo-for-driver.webp" alt="uer logo" />
        <Link to='/captain/logout' className='w-8 h-8 bg-white rounded-full flex justify-center items-center'>
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='w-full h-3/5'>
        <img className='w-full h-full  object-fill' src="https://th.bing.com/th/id/R.2b6b6c31e9c26e93180ab83eb58dc018?rik=6gulESQ4Qq2x%2fw&riu=http%3a%2f%2fwww.technewsworld.com%2farticle_images%2f2015%2f82763_620x330.jpg&ehk=W5GcbLegEcnGDMsjlC7ZY9iUf44hOr9ip4utoE2weRc%3d&risl=&pid=ImgRaw&r=0" alt="map img" />
      </div>
      <div className='w-full h-2/5 px-3 py-2 '>
       <CaptainDetails />
      </div>



      <div ref={ridePopupRef}  className='fixed w-screen bottom-0 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
        <RidePopup  setRidePopupOpen={setRidePopupOpen}  setConfirmRidePopupOpen={setConfirmRidePopupOpen}/>
        </div>



        <div ref={confirmRidePopupRef}   className='fixed w-screen h-screen bottom-0 z-20 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
        <ConfirmRidePopup  setRidePopupOpen={setRidePopupOpen}  setConfirmRidePopupOpen={setConfirmRidePopupOpen}/>
        </div>



    </div>
  )
}

export default CaptainHome