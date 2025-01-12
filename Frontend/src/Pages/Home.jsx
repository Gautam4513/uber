import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationSearch from '../Components/LocationSearch'
import VehiclePanel from '../Components/VehiclePanel'
import ConfirmVehiclePanel from '../Components/ConfirmVehiclePanel'
import LookingForDriver from '../Components/LookingForDriver'
import WaitingForDriver from '../Components/WaitingForDriver'
import { Link } from 'react-router-dom'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmVehiclePanelOpen, setConfirmVehiclePanelOpen] = useState(false)
  const [lookingForDriverOpen , setLookingForDriverOpen]= useState(false)
  const [WaitingForDriverOpen, setWaitingForDriverOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const PanelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const confirmVehiclePanelRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(PanelRef.current, {
        height: '70%',
        opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(PanelRef.current, {
        height: '0%',
        opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(()=>{
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current,{
        translateY:'0%'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current,{
        translateY:'100%'
      })
    }
  },[vehiclePanelOpen])



  useGSAP(()=>{
    if(confirmVehiclePanelOpen){
      gsap.to(confirmVehiclePanelRef.current,{
        translateY:'0%'
      })
    }
    else{
      gsap.to(confirmVehiclePanelRef.current,{
        translateY:'100%'
      })
    }
  },[confirmVehiclePanelOpen])


  useGSAP(()=>{
    if(lookingForDriverOpen){
      gsap.to(lookingForDriverRef.current,{
        translateY:'0%'
      })
    }
    else{
      gsap.to(lookingForDriverRef.current,{
        translateY:'100%'
      })
    }
  },[lookingForDriverOpen])


  useGSAP(()=>{
    if(WaitingForDriverOpen){
      gsap.to(waitingForDriverRef.current,{
        translateY:'0%'
      })
    }
    else{
      gsap.to(waitingForDriverRef.current,{
        translateY:'100%'
      })
    }
  },[WaitingForDriverOpen])


  const submitHandler = (e) => {
    e.preventDefault()
    console.log('form submitted')
  }
  return (
    <div className='relative'>
      <div className='fixed  top-5 flex justify-between items-center w-screen px-3  z-10 '>
        <img className='w-28 ' src="./imges/uber-logo-vector-png-uber-logo-3196.png" alt="uer logo" />
        <Link to='/user/logout' className='w-10 h-10 bg-white rounded-full flex justify-center items-center '>
        <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='w-screen h-screen'>
        <img className='w-full h-full  object-fill' src="https://th.bing.com/th/id/R.2b6b6c31e9c26e93180ab83eb58dc018?rik=6gulESQ4Qq2x%2fw&riu=http%3a%2f%2fwww.technewsworld.com%2farticle_images%2f2015%2f82763_620x330.jpg&ehk=W5GcbLegEcnGDMsjlC7ZY9iUf44hOr9ip4utoE2weRc%3d&risl=&pid=ImgRaw&r=0" alt="map img" />
      </div>
      <div className='w-screen h-screen absolute top-0 flex flex-col justify-end z-20'>
        <div className='bg-white h-[30%] py-3 px-5 rounded-t-lg relative' >
          <form
            onSubmit={(e) => {
              submitHandler(e)
            }}
            className='w-full h-full flex flex-col justify-between py-5'>
            <h3 className='text-xl font-bold'>Find a trip <i className="ri-taxi-fill"></i></h3>
            <div className="line absolute h-[40%] w-1   top-[40%] left-9 flex flex-col justify-center items-center">
              <i className="ri-circle-line text-[10px] font-bold"></i>
              <div className='bg-gray-900  h-full w-1'></div>
              <i className="ri-checkbox-blank-fill text-[10px] font-bold"></i>

            </div>
            <div
              ref={panelCloseRef}
              onClick={() => {
                setPanelOpen(false)
              }}
              className="arrow-btn absolute top-6 right-6 opacity-0"><i className="ri-arrow-down-wide-line font-bold text-xl"></i></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className='bg-[#eee] py-3 px-10 rounded-lg w-full' type="text" placeholder='Add a pick-up location' />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className='bg-[#eee] py-3 px-10 rounded-lg w-full' type="text" placeholder='Enter your destination' />
          </form>
          <div className='w-full h-0.5 bg-gradient-to-r from-transparent via-black to-transparent rounded-full'></div>
        </div>


        <div ref={PanelRef} className='bg-white z-20 px-5 h-[0%]'>
          <LocationSearch setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>




        <div ref={vehiclePanelRef} className='fixed w-screen bottom-0 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
         <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen} />
        </div>



        <div ref={confirmVehiclePanelRef} className='fixed w-screen bottom-0 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
         <ConfirmVehiclePanel  setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen} setLookingForDriverOpen={setLookingForDriverOpen} />
        </div>



        <div ref={lookingForDriverRef} className='fixed w-screen bottom-0 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
         <LookingForDriver setLookingForDriverOpen={setLookingForDriverOpen} />
        </div>


        
        <div ref={waitingForDriverRef}  className='fixed w-screen bottom-0 translate-y-0 bg-white border border-black py-5 px-3 rounded-lg'>
         <WaitingForDriver setWaitingForDriverOpen={setWaitingForDriverOpen} />
        </div>



      </div>
    </div>
  )
}

export default Home