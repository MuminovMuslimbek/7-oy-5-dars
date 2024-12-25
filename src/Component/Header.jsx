import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from '../App'

function Header() {
  const { logOut, setLogOut } = useContext(LogOut)
  const navigate = useNavigate()

  useEffect(() => {
    let local = localStorage.getItem('token')
    if (!local) {
      navigate('/login')
    }
  }, [logOut])

  function LogOutInHome() {
    let isRight = confirm('Rostdan ham chiqib ketmoqchimisiz??')
    if (isRight) {
      localStorage.clear()
      setLogOut(true)
      navigate('/login')
    }
  }

  return (
    <div className='bg-blue-500 py-[15px]'>
      <div className='flex justify-between items-center mx-auto w-full max-w-[1200px] font-medium text-[20px] text-white select-none'>
        <Link to={'/'}>Logo</Link>
        <ul>
          <NavLink to={'/products'}>Products</NavLink>
        </ul>
        <button onClick={LogOutInHome}>Log Out</button>
      </div>
    </div>
  )
}

export default Header