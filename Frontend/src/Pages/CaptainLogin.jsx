import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainContext'

const CaptainLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {captainData , setCaptainData }= useContext(CaptainDataContext)
    const submitHandeler = async (e) => {
        e.preventDefault();
        console.log(email, password)
      const captain = {
            email: email,
            password: password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)

        if(response.status === 200){
            const data = response.data
            localStorage.setItem('token',data.token)
            setCaptainData(data.captain)
            navigate('/captain-home')
            

        }


        setEmail('')
        setPassword('')

    }
    useEffect(() => {
        console.log(captainData)
    }, [captainData])
    return (
        <div>
            <div className='w-screen h-screen  flex flex-col justify-between py-5 px-5'>
                <div className=' flex flex-col gap-10 p-3 justify-between '>
                    <div>
                        <img className=' ' src="./imges/uber-logo-for-driver.webp" alt="" />
                    </div>
                    <div>
                        <form
                            onSubmit={(e) => {
                                submitHandeler(e)
                            }}
                            className=' flex flex-col justify-center items-center px-4 border-2 py-5 gap-5 rounded-lg'>
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
                            <div className='w-full'>
                                <button className='w-full bg-gray-700 text-white py-3 rounded-lg text-xl font-bold active:shadow-yellow-500  active:shadow-lg'>Login</button>
                            </div>
                        </form>
                        <div className='flex px-2'>
                            <p>want join fleet?</p>
                            <Link to='/captain-singup' className='text-blue-600 active:text-purple-700 active:underline-offset-2 active:underline'>Register as Captain</Link>
                        </div>
                    </div>
                </div>
                <div className=' flex justify-center items-center w-full px-2'>
                    <Link to='/login' className='bg-yellow-500 w-full py-5 text-xl rounded-lg font-mono font-bold active:bg-orange-500 flex justify-center'>Login as User</Link>
                </div>

            </div>
        </div>
    )
}

export default CaptainLogin