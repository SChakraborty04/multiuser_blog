import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <div className="flex items-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <FontAwesomeIcon icon={faExclamationTriangle} className="h-5 w-5 mr-2" />
        <div>Only Registered users can write articles.</div>
      </div>
      <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
