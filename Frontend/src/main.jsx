import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import UserContext from './Context/UserContext.jsx'
import CaptainContext from './Context/CaptainContext.jsx'
import SoketContext from './Context/soketContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>

    
            
      <CaptainContext>
        <UserContext>
        <SoketContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </SoketContext>
        </UserContext>

      </CaptainContext>


  </StrictMode>,
)
