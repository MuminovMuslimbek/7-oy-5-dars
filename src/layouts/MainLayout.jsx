import React from 'react'
import Header from '../Component/Header'

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default MainLayout