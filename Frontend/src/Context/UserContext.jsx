import React, { createContext, useState } from 'react'

export const userDataContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })
    const [ride , setRide] = useState({})
  return (
    <div>
        <userDataContext.Provider value={{user, setUser,ride,setRide}} >
        {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext