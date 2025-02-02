import React from 'react'

const CaptainDetails = ({captainData}) => {
    return (
        <div className='bg-white'>
            <div className='flex justify-between w-full items-center'>
                <div className='py-3 px-2 flex items-center gap-2'>
                    <img className='w-14 aspect-square object-cover rounded-full' src="https://img.freepik.com/free-photo/portrait-hesitant-man-purses-lips-looks-bewilderment-feels-doubt_273609-16785.jpg" alt="" />
                    <h1 className='text-xl font-semibold'>{(captainData.fullName.firstName)+" "+ (captainData.fullName.lastName)}</h1>
                </div>
                <div className='text-right px-3'>
                    <h1 className='font-bold text-xl'>&#8377; {captainData.ernning}</h1>
                    <p className='text-md font-medium'>Earnd</p>
                </div>
            </div>
            <div className='bg-[#eee] h-1/2 mt-10 rounded-lg overflow-hidden px-3 py-2'>
                <div className='flex justify-between items-center bg-[#eee] h-full'>
                    <div className='flex flex-col justify-between items-center'>
                        <i className="text-xl font-medium ri-time-line"></i>
                        <h3 className='text-xl font-bold'>10.3</h3>
                        <p className='text-sm font-thin'>Hours Online</p>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <i className="text-xl font-medium ri-speed-up-fill"></i>
                        <h3 className='text-xl font-bold'>30 KM</h3>
                        <p className='text-sm font-thin'>Tolat Distence</p>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <i className="text-xl font-medium ri-booklet-fill"></i>
                        <h3 className='text-xl font-bold'>12</h3>
                        <p className='text-sm font-thin'>Total Trips</p>
                    </div>
                </div>
            </div></div>
    )
}

export default CaptainDetails