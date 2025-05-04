"use client"
import { FaBars, FaBell, FaEnvelope, FaUser } from "react-icons/fa"
import "../../styles/layout/header.scss"

const Header = ({ toggleSidebar }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <div className="header-right">
        <div className="header-icon">
          <FaBell />
          <span className="badge">3</span>
        </div>
        <div className="header-icon">
          <FaEnvelope />
          <span className="badge">5</span>
        </div>
        <div className="admin-profile">
          <div className="admin-avatar">
            <FaUser href="Login"/>
          </div>
          <span className="admin-name">Quản trị viên</span>
        </div>
      </div>
    </header>
  )
}

export default Header
