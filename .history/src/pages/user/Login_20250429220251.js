"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser, FaLock, FaShoppingBag } from "react-icons/fa"
import "../../styles/pages/login.scss"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError("Vui lòng nhập cả email và mật khẩu")
      return
    }

    // For demo purposes, hardcoded credentials
    if (email === "admin@example.com" && password === "admin123") {
      // Successful login
      navigate("/admin")
    } else {
      setError("Email hoặc mật khẩu không đúng")
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <FaShoppingBag />
            <h1>Thời Trang Việt</h1>
          </div>
          <p>Nhập thông tin đăng nhập để truy cập vào trang quản trị</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Ghi nhớ đăng nhập</label>
            </div>
            <a href="#" className="forgot-password">
              Quên mật khẩu?
            </a>
          </div>

          <button type="submit" className="btn-login">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
