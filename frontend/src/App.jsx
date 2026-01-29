import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/register'
import Login from './pages/login'
import Profile from './pages/profile'
import{useSelector,useDispatch} from 'react-redux'
function App() {
  const Authuser=useSelector((state)=>state.user.users);



  return (
    <Router>
      <Routes>
        <Route path="/" element={Authuser ? <Profile /> : <Login />} />
        <Route path="/register" element={Authuser ? <Profile /> : <Register />} />
        <Route path="/login" element={Authuser ? <Profile /> : <Login />} />
        <Route path="/profile" element={Authuser ? <Profile /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App
