import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext'
import { SoketServicesContext } from '../Context/soketContext'

const CaptainProtectedWrapper = ({ children }) => {
    const {sendMessage} = useContext(SoketServicesContext)
    const { setCaptainData } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const initializeCaptain = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/captain-login')
                return
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                if (response.status === 200) {
                    const captainData = response.data.captain
                    setCaptainData(captainData)
                    localStorage.setItem('captainData', JSON.stringify(captainData))
                    
                    sendMessage('join', {
                        userType: "captain",
                        userId: captainData._id
                    })
                }
            } catch (error) {
                localStorage.removeItem('token')
                localStorage.removeItem('captainData')
                navigate('/captain-login')
            } finally {
                setIsLoading(false)
            }
        }

        initializeCaptain()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return children
}

export default CaptainProtectedWrapper