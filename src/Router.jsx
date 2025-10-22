import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Home"
import Login from './pages/Login'
import Details from './pages/Details'

export default function Router() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/details/:id" element={<Details/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}
