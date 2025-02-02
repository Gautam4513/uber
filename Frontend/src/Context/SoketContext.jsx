import React, { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'

export const SoketServicesContext = createContext()
const soket = io(`${import.meta.env.VITE_BASE_URL}`)

const SoketContext = ({children}) => {

    useEffect(() => {

        soket.on("connect", () => {
            console.log("connected to server")
        })
        soket.on("disconnect", () => {
            console.log("disconnected to server")
        })

    }, [])

    const sendMessage = (eventName, message) => {
       soket.emit(eventName, message)
    }
    const receiveMessage = (eventName, callbake) => {
      soket.on(eventName, callbake)
    }

    return (

        <div>
            <SoketServicesContext.Provider value={{sendMessage , receiveMessage , soket }}>
                {children}
            </SoketServicesContext.Provider>

        </div>
    )
}

export default SoketContext