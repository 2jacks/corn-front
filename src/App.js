import React from 'react'
import './App.css'

import { LoginPage } from './components/LoginPage/LoginPage'
import { Corn } from './components/Corn/Corn'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Corn />} />
    </Routes>
  )
}

export default App
