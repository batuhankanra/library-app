import React from 'react'
import { Outlet } from 'react-router'

const AdminLayout:React.FC = () => {
  return (
    <div>
      sa
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
