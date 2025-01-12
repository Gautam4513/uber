import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div>
            <div className='bg-cover bg-[url(./imges/homePageBackground.jpeg)] w-screen h-screen flex flex-col justify-center items-center pt-5 relative'>
                <div className='px-5 absolute top-5 left-3 '>
                    <img className='w-24 relative top-3 left-3' src="./imges/uber-logo-vector-png-uber-logo-3196.png" alt="uber logo" />
                </div>
                <div className=' backdrop-blur-md w-full py-3 px-3 flex flex-col gap-4 rounded-lg border-2 border-gray-400'>
                    <h1 className='text-3xl font-bold'>Get Started With Uber</h1>
                    <Link
                        to='/login'
                        className='w-full bg-black text-white rounded-md font-semibold py-3 text-lg flex justify-end px-3 active:bg-gray-800'><span className='w-full flex-1 flex justify-center items-center'>Continue</span>
                        <i class="ri-arrow-right-line"></i></Link>
                </div>

            </div>
        </div>
    )
}

export default Start