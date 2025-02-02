import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SoketServicesContext } from '../Context/soketContext'
import LiveLocation2 from '../Components/LiveLocation2'

const Riding = () => {
    const navigate = useNavigate()
    const { soket } = useContext(SoketServicesContext)

    useEffect(() => {
        soket.on("ride-finish", (data) => {
            console.log(data, "this isdata")
            navigate('/home')
        })
    }, [])

    const location = useLocation()
    const ride = location.state?.ride
    console.log(ride)
    return (
        <div className='w-screen h-screen overflow-hidden'>
            <img className='fixed top-5 left-5 w-20' src="./imges/uber-logo-vector-png-uber-logo-3196.png" alt="" />
            <Link to={'/home'} className='fixed top-2 right-5 bg-[#fff] w-10 h-10 rounded-full flex justify-center items-center '>
                <i className="ri-home-5-line"></i>
            </Link>
            <div className='w-full h-1/2'>
                <LiveLocation2 isUser={true} ride={ride} />
            </div>
            <div className='w-full h-1/2 px-3'>
                <div className='flex justify-between py-3'>
                    <img className='w-1/2' src="./imges/car.png" alt="" />
                    <div className='text-right w-1/2' >
                        <h3 className='text-lg font-bold w-full'>{ride?.captain?.fullName.firstName}</h3>
                        <h2 className='text-xl font-semibold w-full'>{ride?.captain?.vehicle.plate}</h2>
                        <p className='text-sm w-full'>{ride?.captain?.vehicle.type}</p>
                    </div>
                </div>

                <div className='w-full bg-[#eee] h-0.5'></div>
                <div className='px-5 py-2'>


                    <div className='flex items-center gap-5 py-2'>
                        <i className="ri-map-pin-4-fill"></i>
                        <div>
                            <h2 className='text-xl font-bold'>
                                Destination
                            </h2>
                            <p className='max-h-10 overflow-hidden'>
                                {ride?.destination}
                            </p>
                        </div>
                    </div>
                    <div className='w-full bg-[#eee] h-0.5'></div>
                    <div className='flex items-center gap-5 py-2'>
                        <i className="ri-currency-fill"></i>
                        <div>
                            <h2 className='text-xl font-bold'>&#8377; {ride?.fare}</h2>
                        </div>
                    </div>

                </div>
                <div className='w-full bg-[#eee] h-0.5 mb-3'></div>
                <button className='w-full py-3 text-white bg-blue-500 active:bg-blue-900 rounded-lg'>Make payment</button>
            </div>
        </div>
    )
}

export default Riding