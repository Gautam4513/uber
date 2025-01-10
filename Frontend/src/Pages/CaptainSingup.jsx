import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSingup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})

    const submitHandeler = (e)=>{
        e.preventDefault();
        setCaptainData({
            fullName:{
                firstName,
                lastName
            },
            email,
            password
        })
    }
    useEffect(() => {
     console.log(captainData)
    }, [captainData])
  return (
    <div>
    <div className='w-screen h-screen  flex flex-col justify-between py-5 px-5'>
        <div className=' flex flex-col gap-10 p-3 justify-between '>
            <div>
                <img className='w-32 ' src="./imges/uber-logo-for-driver.webp" alt="" />
            </div>
            <div>
                <form
                    onSubmit={(e) => {
                        submitHandeler(e)
                    }}
                    className=' flex flex-col justify-center items-center px-4 border-2 py-5 gap-5 rounded-lg'>
                    <div>
                        <label htmlFor="userName" className='text-lg font-bold '>What's your name</label>
                        <div  className='flex justify-between items-center gap-3 '>
                            <input
                                required
                                value={firstName}
                                onChange={(e)=>{
                                    setFirstName(e.target.value)
                                }}
                                className='bg-[#eee] w-full  py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg'
                                type="text" name='firstName' id='userName' placeholder='First name' />
                            <input
                                required
                                value={lastName}
                                onChange={(e)=>{
                                    setLastName(e.target.value)
                                }}
                                className='bg-[#eee] w-full py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg'
                                type="text" name='lastName' placeholder='Last name' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className='text-lg font-bold '>What's Your email</label>
                        <input
                            required
                                value={email}
                                onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}
                            className='bg-[#eee] w-full py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg' type="email" name='email' id='email' placeholder='abc@example.com' />
                    </div>

                    <div>
                        <label htmlFor="password" className='text-lg font-bold '>Enter your password</label>
                        <input
                            required
                                value={password}
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                            className='bg-[#eee] w-full py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg' type="password" name='password' id='password' placeholder='*******' />
                    </div>
                    <div className='w-full'>
                        <button className='w-full bg-gray-700 text-white py-3 rounded-lg text-xl font-bold active:shadow-yellow-500  active:shadow-lg'>Register</button>
                    </div>
                </form>
                <div className='flex '>
                    <p>Already have an account?</p>
                    <Link to='/captain-login' className='text-blue-600 active:text-purple-700 active:underline-offset-2 active:underline'>Login here</Link>
                </div>
            </div>
        </div>
        <div className=' flex justify-center items-center w-full px-2'>
            <Link to='/singup' className='bg-green-400 w-full py-5 text-xl rounded-lg font-mono font-bold active:bg-emerald-400 flex justify-center'>Register as User</Link>
        </div>

    </div>
</div>
  )
}

export default CaptainSingup