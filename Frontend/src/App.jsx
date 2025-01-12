
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './Pages/Start'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSingup from './Pages/CaptainSingup'
import UserSingup from './Pages/UserSingUp'
import { userDataContext } from './Context/UserContext'
import Home from './Pages/Home'
import UserProtectedWrapper from './Pages/UserProtectedWrapper'
import UserLogout from './Pages/UserLogout'
import CaptainHome from './Pages/CaptainHome'
import CaptainProtectedWrapper from './Pages/CaptainProtectedWrapper'
import CaptainLogout from './Pages/CaptainLogout'
import Riding from './Pages/Riding'
import CaptainRiding from './Pages/CaptainRiding'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/singup' element={<UserSingup />} />
        <Route path='/riding' element={<Riding />}/>
        <Route path='/captain-riding' element={<CaptainRiding />}/>
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-singup' element={<CaptainSingup />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/user/logout'
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          } />
        <Route path='/captain-home'
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
        <Route path='/captain/logout'
          element ={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </div>
  )
}

export default App