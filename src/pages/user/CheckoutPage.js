"use client"

import { useEffect, useState } from "react"
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import "../../styles/pages/checkoutPage.scss"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { setCartCount } = useOutletContext()

  const [orderSummary, setOrderSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    paymentMethod: "cod",
    notes: "",
  })

  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    // Load order summary from localStorage
    const loadOrderSummary = () => {
      const storedOrderSummary = JSON.parse(localStorage.getItem("orderSummary"))

      if (!storedOrderSummary) {
        navigate("/cart")
        return
      }

      setOrderSummary(storedOrderSummary)
      setLoading(false)
    }

    loadOrderSummary()
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.fullName.trim()) {
      errors.fullName = "Vui lòng nhập họ tên"
    }

    if (!formData.email.trim()) {
      errors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email không hợp lệ"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Số điện thoại không hợp lệ"
    }

    if (!formData.address.trim()) {
      errors.address = "Vui lòng nhập địa chỉ"
    }

    if (!formData.city.trim()) {
      errors.city = "Vui lòng chọn tỉnh/thành phố"
    }

    if (!formData.district.trim()) {
      errors.district = "Vui lòng chọn quận/huyện"
    }

    if (!formData.ward.trim()) {
      errors.ward = "Vui lòng chọn phường/xã"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".error-message")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    // Simulate order processing
    setLoading(true)

    setTimeout(() => {
      // Generate random order ID
      const randomOrderId =
        "DH" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")
      setOrderId(randomOrderId)

      // Clear cart and order summary
      localStorage.removeItem("cart")
      localStorage.removeItem("orderSummary")

      // Update cart count
      setCartCount(0)

      // Show order complete screen
      setOrderComplete(true)
      setLoading(false)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="checkout-loading">
        <div className="loading-spinner"></div>
        <p>Đang xử lý...</p>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="order-complete">
        <div className="container">
          <div className="order-complete-content">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h1>Đặt hàng thành công!</h1>
            <p className="order-id">
              Mã đơn hàng: <strong>{orderId}</strong>
            </p>
            <p className="thank-you-message">
              Cảm ơn bạn đã mua hàng tại Thời Trang Việt. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
            </p>
            <p className="email-notification">
              Một email xác nhận đơn hàng đã được gửi đến <strong>{formData.email}</strong>
            </p>

            <div className="order-actions">
              <Link to="/" className="btn-back-home">
                Quay lại trang chủ
              </Link>
              <button className="btn-track-order">Theo dõi đơn hàng</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="page-header">
          <h1>Thanh toán</h1>
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link> / <Link to="/cart">Giỏ hàng</Link> / <span>Thanh toán</span>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-container">
            <form className="checkout-form" onSubmit={handlePlaceOrder}>
              <div className="form-section">
                <h2>Thông tin giao hàng</h2>

                <div className="form-group">
                  <label htmlFor="fullName">
                    Họ tên <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={formErrors.fullName ? "error" : ""}
                  />
                  {formErrors.fullName && <div className="error-message">{formErrors.fullName}</div>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "error" : ""}
                    />
                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      Số điện thoại <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? "error" : ""}
                    />
                    {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">
                    Địa chỉ <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={formErrors.address ? "error" : ""}
                    placeholder="Số nhà, tên đường"
                  />
                  {formErrors.address && <div className="error-message">{formErrors.address}</div>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">
                      Tỉnh/Thành phố <span className="required">*</span>
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={formErrors.city ? "error" : ""}
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                    </select>
                    {formErrors.city && <div className="error-message">{formErrors.city}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="district">
                      Quận/Huyện <span className="required">*</span>
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={formErrors.district ? "error" : ""}
                    >
                      <option value="">Chọn quận/huyện</option>
                      <option value="Quận 1">Quận 1</option>
                      <option value="Quận 2">Quận 2</option>
                      <option value="Quận 3">Quận 3</option>
                      <option value="Quận 4">Quận 4</option>
                    </select>
                    {formErrors.district && <div className="error-message">{formErrors.district}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="ward">
                    Phường/Xã <span className="required">*</span>
                  </label>
                  <select
                    id="ward"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    className={formErrors.ward ? "error" : ""}
                  >
                    <option value="">Chọn phường/xã</option>
                    <option value="Phường 1">Phường 1</option>
                    <option value="Phường 2">Phường 2</option>
                    <option value="Phường 3">Phường 3</option>
                    <option value="Phường 4">Phường 4</option>
                  </select>
                  {formErrors.ward && <div className="error-message">{formErrors.ward}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Ghi chú đơn hàng</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <h2>Phương thức thanh toán</h2>

                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="payment-cod"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="payment-cod">
                      <FaMoneyBillWave />
                      <span>Thanh toán khi nhận hàng (COD)</span>
                    </label>
                    {formData.paymentMethod === "cod" && (
                      <div className="payment-description">Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng.</div>
                    )}
                  </div>

                  <div className="payment-method">
                    <input
                      type="radio"
                      id="payment-bank"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === "bank"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="payment-bank">
                      <FaCreditCard />
                      <span>Chuyển khoản ngân hàng</span>
                    </label>
                    {formData.paymentMethod === "bank" && (
                      <div className="payment-description">
                        <p>
                          Thực hiện thanh toán vào tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của
                          bạn trong phần Nội dung thanh toán. Đơn hàng sẽ được giao sau khi tiền đã chuyển.
                        </p>
                        <div className="bank-info">
                          <p>
                            <strong>Ngân hàng:</strong> Vietcombank
                          </p>
                          <p>
                            <strong>Số tài khoản:</strong> 1234567890
                          </p>
                          <p>
                            <strong>Chủ tài khoản:</strong> Công ty TNHH Thời Trang Việt
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="checkout-actions">
                <Link to="/cart" className="btn-back-to-cart">
                  Quay lại giỏ hàng
                </Link>
                <button type="submit" className="btn-place-order">
                  Đặt hàng
                </button>
              </div>
            </form>
          </div>

          <div className="order-summary">
            <h2>Đơn hàng của bạn</h2>

            <div className="order-items">
              {orderSummary.items.map((item, index) => {
                const discountedPrice = item.discount
                  ? Math.round((item.price * (100 - item.discount)) / 100)
                  : item.price

                return (
                  <div className="order-item" key={index}>
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      <span className="item-quantity">{item.quantity}</span>
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <div className="item-variants">
                        <span className="variant">Màu: {item.color}</span>
                        <span className="variant">Size: {item.size}</span>
                      </div>
                    </div>
                    <div className="item-price">{discountedPrice.toLocaleString()}đ</div>
                  </div>
                )
              })}
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span className="summary-label">Tạm tính</span>
                <span className="summary-value">{orderSummary.subtotal.toLocaleString()}đ</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Phí vận chuyển</span>
                <span className="summary-value">
                  {orderSummary.shipping === 0 ? "Miễn phí" : orderSummary.shipping.toLocaleString() + "đ"}
                </span>
              </div>
              {orderSummary.discount > 0 && (
                <div className="summary-row discount">
                  <span className="summary-label">Giảm giá</span>
                  <span className="summary-value">-{orderSummary.discount.toLocaleString()}đ</span>
                </div>
              )}
              <div className="summary-row total">
                <span className="summary-label">Tổng cộng</span>
                <span className="summary-value">{orderSummary.total.toLocaleString()}đ</span>
              </div>
            </div>

            <div className="secure-checkout">
              <FaShieldAlt />
              <p>Thanh toán an toàn và bảo mật</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
