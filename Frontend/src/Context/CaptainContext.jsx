import React, { createContext, useState, useEffect } from 'react'
export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {
    const [captainData, setCaptainData] = useState(() => {
        // Initialize from localStorage if available
        const savedData = localStorage.getItem('captainData')
        return savedData ? JSON.parse(savedData) : {
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
        }
    })

    // Persist captainData to localStorage whenever it changes
    useEffect(() => {
        if (captainData._id) {  // Only save if we have valid data
            localStorage.setItem('captainData', JSON.stringify(captainData))
        }
    }, [captainData])

    return (
        <CaptainDataContext.Provider value={{captainData, setCaptainData}}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext