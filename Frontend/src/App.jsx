
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSingup from './Pages/CaptainSingUp'
import UserSingup from './Pages/UserSingUp'
import { userDataContext } from './Context/UserContext'



const App = () => {
  const data=useContext(userDataContext)
  console.log(data)
  console.log(data[0].fullName)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/singup' element={<UserSingup />} />
        <Route path='/captain-login' element={<CaptainLogin />}/>
        <Route path='/captain-singup' element={<CaptainSingup />} />
      </Routes>
    </div>
  )
}

export default App