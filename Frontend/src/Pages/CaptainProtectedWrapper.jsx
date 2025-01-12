import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainProtectedWrapper = ({ children }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/captain-login')
        }
        const checkToken = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    console.log('token is valid')
                }
            } catch (error) {
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        }
        checkToken()
    })


    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapper