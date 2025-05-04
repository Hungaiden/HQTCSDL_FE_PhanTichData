"use client"

import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { FaShoppingBag, FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"
import "../../styles/layout/userHeader.scss"

const UserHeader = ({ cartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="user-header">
      <div className="header-top">
        <div className="container">
          <div className="top-info">
            <div className="contact-info">
              <span>Hotline: 1900 1234</span>
              <span>Email: contact@thoitrangviet.com</span>
            </div>
            <div className="top-links">
              <a href="#">Theo dõi đơn hàng</a>
              <a href="#">Cửa hàng</a>
              <a href="#">Trợ giúp</a>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <div className="logo">
              <Link to="/">
                <FaShoppingBag />
                <span>Thời Trang Việt</span>
              </Link>
            </div>

            <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`}>
              <ul>
                <li>
                  <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>
                    Trang chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" onClick={() => setMobileMenuOpen(false)}>
                    Sản phẩm
                  </NavLink>
                </li>
                <li>
                  <a href="#">Nam</a>
                </li>
                <li>
                  <a href="#">Nữ</a>
                </li>
                <li>
                  <a href="#">Trẻ em</a>
                </li>
                <li>
                  <a href="#">Khuyến mãi</a>
                </li>
                <li>
                  <a href="#">Tin tức</a>
                </li>
              </ul>
            </nav>

            <div className="header-actions">
              <button className="search-toggle" onClick={() => setSearchOpen(!searchOpen)}>
                <FaSearch />
              </button>
              <Link to="/account" className="account-link">
                <FaUser />
              </Link>
              <Link to="/cart" className="cart-link">
                <FaShoppingCart />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
            </div>
          </div>

          <div className={`search-bar ${searchOpen ? "open" : ""}`}>
            <input type="text" placeholder="Tìm kiếm sản phẩm..." />
            <button>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default UserHeader
