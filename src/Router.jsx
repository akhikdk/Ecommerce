import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Home"
import Login from './pages/Login'

export default function Router() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}
