import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationSearch from '../Components/LocationSearch'
import VehiclePanel from '../Components/VehiclePanel'
import ConfirmVehiclePanel from '../Components/ConfirmVehiclePanel'
import LookingForDriver from '../Components/LookingForDriver'
import WaitingForDriver from '../Components/WaitingForDriver'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../Context/UserContext'
import { SoketServicesContext } from '../Context/soketContext'

import LiveLocation2 from '../Components/LiveLocation2'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmVehiclePanelOpen, setConfirmVehiclePanelOpen] = useState(false)
  const [lookingForDriverOpen, setLookingForDriverOpen] = useState(false)
  const [WaitingForDriverOpen, setWaitingForDriverOpen] = useState(false)
  const [fare, setFare] = useState({})
  const [finalPickup, setFinalPickup] = useState('')
  const [finalDestination, setFinalDestination] = useState('')
  const [vehicleType, setVehicleType] = useState('')


  const vehiclePanelRef = useRef(null)
  const PanelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const confirmVehiclePanelRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const logOutRef = useRef(null)
  const mapRef = useRef(null)

  const navigate = useNavigate()


  const {ride , setRide}=useContext(userDataContext)
  const {soket}  = useContext(SoketServicesContext)


  const [suggestion, setSuggestion] = useState([])
  const [activeFild, setActiveFild] = useState('')
  console.log(suggestion)
  const pickupSuggestionHandeler = async (e) => {
    setPickup(e.target.value)
    // if(pickup.length()>=3){
    try {
      console.log(import.meta.env.VITE_BASE_URL)
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-auto-suggestion`, {
        params: {
          input: pickup
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
      setSuggestion(response.data)
    } catch (error) {
      console.log(error)
    }

  }



  const destinationSuggestionHandeler = async (e) => {
    setDestination(e.target.value)
    // if(destination.length()>=3){
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-auto-suggestion`, {
        params: {
          input: destination
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
      setSuggestion(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(PanelRef.current, {
        height: '60%',
        opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
      gsap.to(logOutRef.current,{
        zIndex:"10"
      })
      gsap.to(mapRef.current,{
        zIndex:"9"
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
      gsap.to(logOutRef.current,{
        zIndex:"40"
      })
      gsap.to(mapRef.current,{
        zIndex:"39"
      })
    }
  }, [panelOpen])

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        translateY: '0%'
      })
      gsap.to(mapRef.current,{
        zIndex:"9"
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        translateY: '100%'
      })
      gsap.to(mapRef.current,{
        zIndex:"39"
      })
    }
  }, [vehiclePanelOpen])



  useGSAP(() => {
    if (confirmVehiclePanelOpen) {
      gsap.to(confirmVehiclePanelRef.current, {
        translateY: '0%'
      })
    }
    else {
      gsap.to(confirmVehiclePanelRef.current, {
        translateY: '100%'
      })
    }
  }, [confirmVehiclePanelOpen])


  useGSAP(() => {
    if (lookingForDriverOpen) {
      gsap.to(lookingForDriverRef.current, {
        translateY: '0%'
      })
    }
    else {
      gsap.to(lookingForDriverRef.current, {
        translateY: '100%'
      })
    }
  }, [lookingForDriverOpen])


  useGSAP(() => {
    if (WaitingForDriverOpen) {
      gsap.to(waitingForDriverRef.current, {
        translateY: '0%'
      })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        translateY: '100%'
      })
    }
  }, [WaitingForDriverOpen])

  const getFare = async (pickUp, destination) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: {
          pickUp,
          destination
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response)
      setFare(response.data.fare)
    } catch (error) {
      console.log(error)
    }
  }


  const submitHandler = (e) => {
    e.preventDefault()
    setVehiclePanelOpen(true)
    setPanelOpen(false)
    setFinalPickup(pickup)
    setFinalDestination(destination)
    getFare(pickup, destination)
    // setPickup('')
    // setDestination('')
    console.log('form submitted')
  }

  const createRide = async (pickUp, destination, vehicleType) => {
    const body = {
        pickUp, destination, vehicleType
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, 
           body,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        // console.log(response.data.ride)
        setRide(response.data.ride)

    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
  console.log(ride)
}, [ride])

soket.on("ride-confirm",(data)=>{
  console.log(data)
  setRide(data)
  console.log(ride)
  setWaitingForDriverOpen(true)
  setLookingForDriverOpen(false)
  setConfirmVehiclePanelOpen(false)
})
useEffect(()=>{
  soket.on("ride-accepted",(data)=>{
    navigate('/riding',{state:{ride:data}})
  })
},[])


  return (
    <div className='relative'>
      <div ref={logOutRef} className='fixed  top-5 flex justify-between items-center w-screen px-3  z-40 '>
        <img className='w-28 ' src="./imges/uber-logo-vector-png-uber-logo-3196.png" alt="uer logo" />
        <Link to='/user/logout' className='w-10 h-10 bg-white rounded-full flex justify-center items-center '>
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div ref={mapRef} className='w-full fixed h-[65vh] bg-green-500 z-[25] '>
        <LiveLocation2 isUser={true} />
      </div>
      <div className='w-screen h-screen absolute top-0 flex flex-col justify-end z-20'>
        <div className='bg-white  py-3 px-5 rounded-t-lg relative' >
          <form
            onSubmit={(e) => {
              submitHandler(e)
            }}
            className='w-full h-full flex flex-col justify-between py-5 '>
            <h3 className='text-xl font-bold'>Find a trip <i className="ri-taxi-fill"></i></h3>
            <div className="line absolute h-[30%] w-1   top-[30%] left-9 flex flex-col justify-center items-center">
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
            <div className='flex flex-col gap-3'>
              <input
                required
                onClick={() => {
                  setPanelOpen(true)
                  setActiveFild("pickup")
                }}
                value={pickup}
                onChange={(e) => {
                  pickupSuggestionHandeler(e)
                }}
                className='bg-[#eee] py-3 px-10 rounded-lg w-full' type="text" placeholder='Add a pick-up location ' />
              <input
                required
                onClick={() => {
                  setPanelOpen(true)
                  setActiveFild("destination")
                }}
                value={destination}
                onChange={(e) => {
                  destinationSuggestionHandeler(e)
                }}
                className='bg-[#eee] py-3 px-10 rounded-lg w-full' type="text" placeholder='Enter your destination' />
              <button
                className='w-full active:bg-gray-600 text-lg font-bold bg-black text-white rounded-lg px-3 py-2'>pick ride</button>
            </div>

          </form>

          <div className='w-full h-0.5 bg-gradient-to-r from-transparent via-black to-transparent rounded-full'></div>
        </div>


        <div ref={PanelRef} className='bg-white z-20 px-5 h-[0%]'>
          <LocationSearch
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setSuggestion={setSuggestion}
            suggestion={suggestion}
            activeFild={activeFild}
            setPickup={setPickup}
            setDestination={setDestination}
          />
        </div>




        <div ref={vehiclePanelRef} className='fixed w-screen bottom-0 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
          <VehiclePanel
            setVehiclePanelOpen={setVehiclePanelOpen}
            setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen}
            fare={fare}
            setVehicleType={setVehicleType}
          />
        </div>



        <div ref={confirmVehiclePanelRef} className='fixed w-screen bottom-0 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
          <ConfirmVehiclePanel
            setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen}
            setLookingForDriverOpen={setLookingForDriverOpen}
            vehicleType={vehicleType}
            fare={fare}
            pickup={pickup}
            destination={destination}
            createRide={createRide}
          />
        </div>



        <div ref={lookingForDriverRef} className='fixed w-screen bottom-0 translate-y-full bg-white border border-black py-5 px-3 rounded-lg'>
          <LookingForDriver 
          setLookingForDriverOpen={setLookingForDriverOpen}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType} 
          />
        </div>



        <div ref={waitingForDriverRef} className='fixed w-screen bottom-0 translate-y-0 bg-white border border-black py-5 px-3 rounded-lg'>
          <WaitingForDriver 
          setWaitingForDriverOpen={setWaitingForDriverOpen}
          ride={ride}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          />
        </div>



      </div>
    </div>
  )
}

export default Home