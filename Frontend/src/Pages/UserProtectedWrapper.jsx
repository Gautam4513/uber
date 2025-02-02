import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../Context/UserContext'
import { SoketServicesContext } from '../Context/soketContext'

const UserProtectedWrapper = ({ children }) => {
  const {sendMessage , receiveMessage }=useContext(SoketServicesContext)
  // const [token, setToken] = useState('')
  const navigate = useNavigate()
  const {user , setUser}=useContext(userDataContext)


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
          console.log(response)
          sendMessage('join',{
                userType:"user",
                userId:response.data.user._id
            })
          setUser(response.data)
        }
      } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
    checkToken()
  },[])

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper