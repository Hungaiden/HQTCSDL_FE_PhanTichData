"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import UserHeader from "./UserHeader"
import UserFooter from "./UserFooter"
import "../../styles/layout/userLayout.scss"

const UserLayout = () => {
  const [cartCount, setCartCount] = useState(3)

  return (
    <div className="user-layout">
      <UserHeader cartCount={cartCount} />
      <main className="user-main">
        <Outlet context={{ setCartCount }} />
      </main>
      <UserFooter />
    </div>
  )
}

export default UserLayout
