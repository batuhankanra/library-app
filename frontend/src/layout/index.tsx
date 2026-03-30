import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/header'

const MainLayout:React.FC = () => {
  return (
    <div>
      <Navbar />
    <main>
      <Outlet/>
    </main>
      
    </div>
  )
}

export default MainLayout
