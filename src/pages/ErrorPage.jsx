import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='flex flex-col justify-center items-center h-screen text-[40px] text-white'><h1>ErrorPage</h1> <Link to={'/'} className='text-blue-500 underline'>go bag</Link></div>
  )
}

export default ErrorPage