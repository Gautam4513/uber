import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='w-screen h-screen overflow-hidden'>
            <img className='fixed top-5 left-5 w-20' src="./imges/uber-logo-vector-png-uber-logo-3196.png" alt="" />
            <Link to={'/home'} className='fixed top-2 right-5 bg-[#fff] w-10 h-10 rounded-full flex justify-center items-center '>
            <i className="ri-home-5-line"></i>
            </Link>
            <div className='w-full h-1/2'>
                <img className='w-full h-full  object-fill' src="https://th.bing.com/th/id/R.2b6b6c31e9c26e93180ab83eb58dc018?rik=6gulESQ4Qq2x%2fw&riu=http%3a%2f%2fwww.technewsworld.com%2farticle_images%2f2015%2f82763_620x330.jpg&ehk=W5GcbLegEcnGDMsjlC7ZY9iUf44hOr9ip4utoE2weRc%3d&risl=&pid=ImgRaw&r=0" alt="map img" />
            </div>
            <div className='w-full h-1/2 px-3'>
            <div className='flex justify-between py-3'>
                    <img className='w-1/2' src="./imges/car.png" alt="" />
                    <div className='text-right w-1/2' >
                        <h3 className='text-lg font-bold w-full'>Gautam</h3>
                        <h2 className='text-xl font-semibold w-full'>GJ 03 Md 8789</h2>
                        <p className='text-sm w-full'>honda sp 125</p>
                    </div>
                </div>

                <div className='w-full bg-[#eee] h-0.5'></div>
                <div className='px-5 py-2'>
                   
                   
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
                <button className='w-full py-3 text-white bg-blue-500 active:bg-blue-900 rounded-lg'>Make payment</button>
            </div>
        </div>
    )
}

export default Riding