"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import "../../styles/layout/adminLayout.scss"

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`admin-content ${sidebarOpen ? "" : "expanded"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
