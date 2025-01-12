import React, { createContext, useState } from 'react'
export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {

    const [captainData, setCaptainData] = useState({
        email:'',
        password:'',
        fullName:{
            firstName:'',
            lastName:''
        },
        vehicle:{
            color:'',
            plate:'',
            capacity:'',
            type:''
        }
    })
  return (
    <>
    <CaptainDataContext.Provider value={{captainData , setCaptainData}}>
        {children}
    </CaptainDataContext.Provider>
    </>
  )
}

export default CaptainContext