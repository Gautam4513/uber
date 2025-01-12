import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  // const [exit, setExit] = useState(false)
  // const [token, setToken] = useState('')

  
  const navigate = useNavigate()
// console.log(import.meta.env.VITE_API_URL)
  
  
  useEffect( () => {
    let isExicuted = false
    if(!isExicuted){
      const token = localStorage.getItem('token')
      axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then((response)=>{
        console.log(response)
        if(response.status===200){
          localStorage.removeItem('token')
          // setExit(true)
          navigate('/login')
        }
      })
      isExicuted = true
    }
    
    
  
    
  },[navigate])
  
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout