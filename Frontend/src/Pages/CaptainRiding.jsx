import React, { useRef, useState } from 'react'
import FinishRide from '../Components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRiding = () => {
  const [finishRideOpen, setFinishRideOpen] = useState(false)
  const finishRideRef = useRef(null)


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
      <div className='w-screen h-screen'>
      <img className='w-full h-full  object-fill' src="https://th.bing.com/th/id/R.2b6b6c31e9c26e93180ab83eb58dc018?rik=6gulESQ4Qq2x%2fw&riu=http%3a%2f%2fwww.technewsworld.com%2farticle_images%2f2015%2f82763_620x330.jpg&ehk=W5GcbLegEcnGDMsjlC7ZY9iUf44hOr9ip4utoE2weRc%3d&risl=&pid=ImgRaw&r=0" alt="map img" />
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
        <FinishRide setFinishRideOpen={setFinishRideOpen} />
        </div>




    </div>
  )
}

export default CaptainRiding