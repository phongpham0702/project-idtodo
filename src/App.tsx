// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./assets/styles/App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from "./components/login/loginForm"
import RegisterForm from "./components/login/registerForm"
import SideBar from "./components/sidebar/sidebar.component"
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<SideBar/>} /> {/* Protected route */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
