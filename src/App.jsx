import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'

export const LogOut = createContext(null)

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [logOut, setLogOut] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.token) {
      setToken(location.state.token)
    }
  }, [navigate])

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      setToken(localToken)
    } else {
      navigate('/login')
    }
  }, [])


  useEffect(() => {
    let local = localStorage.getItem('token')
    if (!local) {
      navigate('/login')
    }
  }, [logOut])


  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate('/login')
    }
    return children
  }

  return (
    <div>
      <LogOut.Provider value={{ logOut, setLogOut }}>
        <Routes>
          <Route index element={<PrivateRoute isAuth={!!token}><MainLayout><Home /></MainLayout></PrivateRoute>} />
          <Route path='/products' element={<MainLayout><Products /></MainLayout>} />
          <Route path='/register' element={<AuthLayout><Register /></AuthLayout>} />
          <Route path='/login' element={<AuthLayout><Login /></AuthLayout>} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </LogOut.Provider>

    </div>
  )
}

export default App