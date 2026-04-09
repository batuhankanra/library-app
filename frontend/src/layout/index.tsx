import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/header'
import Footer from '../components/footer'

const MainLayout:React.FC = () => {
  return (
    <div>
      <Navbar />
    <main className='pt-4'>
      <Outlet/>
    </main>
    <Footer />
      
    </div>
  )
}

export default MainLayout
