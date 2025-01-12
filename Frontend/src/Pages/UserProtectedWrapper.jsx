import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {
  // const [token, setToken] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
    }
    const checkToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          console.log('token is valid')
        }
      } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
        navigate('/login')
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

export default UserProtectedWrapper