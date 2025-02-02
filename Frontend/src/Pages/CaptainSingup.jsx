import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainContext'
import { SoketServicesContext } from '../Context/soketContext'

const CaptainSingup = () => {
    const {sendMessage , receiveMessage }=useContext(SoketServicesContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [color, setColor] = useState('')
    const [plate, setPlate] = useState('')
    const [capacity, setCapacity] = useState('')
    const [type, setType] = useState('')

    const navigate = useNavigate()
    const {captainData , setCaptainData}=useContext(CaptainDataContext)


    const submitHandeler =async (e) => {
        e.preventDefault();
        const captain = {
            fullName: {
                firstName,
                lastName
            },
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                type
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captain)
        if(response.status === 201){
            const data = response.data
            sendMessage('join',{
                userType:"captain",
                userId:data.captain._id
            })
            localStorage.setItem('token',data.token)
            setCaptainData(data.captain)
            console.log(captainData)
            navigate('/captain-home')
        }
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setColor('')
        setPlate('')
        setCapacity('')
        setType('')
        
       

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
                                <div className='flex justify-between items-center gap-3 '>
                                    <input
                                        required
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value)
                                        }}
                                        className='bg-[#eee] w-full  py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg'
                                        type="text" name='firstName' id='userName' placeholder='First name' />
                                    <input
                                        required
                                        value={lastName}
                                        onChange={(e) => {
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
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    className='bg-[#eee] w-full py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg' type="email" name='email' id='email' placeholder='abc@example.com' />
                            </div>

                            <div>
                                <label htmlFor="password" className='text-lg font-bold '>Enter your password</label>
                                <input
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    className='bg-[#eee] w-full py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg' type="password" name='password' id='password' placeholder='*******' />
                            </div>
                            <div>
                                <h2 className='text-xl font-bold'>vehical details</h2>
                                <div className='flex flex-wrap justify-between items-center gap-2'>
                                    <div className='  '>
                                        <label className='text-lg font-bold ' htmlFor="color">color</label>
                                        <input
                                            required
                                            value={color}
                                            onChange={(e) => {
                                                setColor(e.target.value)
                                            }}
                                            className='bg-[#eee] w-full py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg' type="text" id='color' placeholder='red' />
                                    </div>
                                    <div className=' '>
                                        <label className='text-lg font-bold ' htmlFor="plate">Number plate</label>
                                        <input
                                            required
                                            value={plate}
                                            onChange={(e) => {
                                                setPlate(e.target.value)
                                            }}
                                            className='bg-[#eee] w-full py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg' type="text" id='plate' placeholder='GJ 03 MD 8789' />
                                    </div>
                                    <div className=' '>
                                        <label className='text-lg font-bold ' htmlFor="capacity">
                                            Vehical capacity
                                        </label>
                                        <input
                                            required
                                            value={capacity}
                                            onChange={(e) => {
                                                setCapacity(e.target.value)
                                            }}
                                            className='bg-[#eee] w-full py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg' type="number" id='capacity' placeholder='2' />
                                    </div>
                                    <div className=' '>
                                        <label className='text-lg font-bold ' htmlFor="type">vehical type</label>
                                        <select
                                            required
                                            value={type}
                                            onChange={(e) => {
                                                setType(e.target.value)
                                            }}
                                            className='bg-[#eee] w-full py-3 px-2 placeholder:text-sm text-lg border focus:shadow-xl rounded-lg' name="type" id="type">
                                            <option value="car">car</option>
                                            <option value="bike">bike</option>
                                            <option value="auto">auto</option>
                                        </select>
                                    </div>
                                </div>
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