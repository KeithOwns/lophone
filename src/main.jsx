import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import IPhoneApp from './IPhoneApp.jsx'
import DeviceSelector from './DeviceSelector.jsx'
import AndroidApp from './AndroidApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DeviceSelector />} />

        <Route path="/android" element={<AndroidApp />} />
        <Route path="/iphone" element={<IPhoneApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
