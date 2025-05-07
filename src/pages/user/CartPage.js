"use client"

import { useEffect, useState } from "react"
import { FaArrowLeft, FaShoppingCart, FaTrashAlt } from "react-icons/fa"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import "../../styles/pages/cartPage.scss"

const CartPage = () => {
  const navigate = useNavigate()
  const { setCartCount } = useOutletContext()

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || []
      setCartItems(storedCart)
      setLoading(false)
    }

    loadCartItems()
  }, [])

  const updateCartInStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCartItems(updatedCart)
    setCartCount(updatedCart.length)
  }

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return

    const updatedCart = [...cartItems]
    updatedCart[index].quantity = newQuantity
    updateCartInStorage(updatedCart)
  }

  const handleRemoveItem = (index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      const updatedCart = [...cartItems]
      updatedCart.splice(index, 1)
      updateCartInStorage(updatedCart)
    }
  }

  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?")) {
      localStorage.removeItem("cart")
      setCartItems([])
      setCartCount(0)
    }
  }

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      alert("Vui lòng nhập mã giảm giá")
      return
    }

    // Mock coupon validation
    if (couponCode.toUpperCase() === "SALE10") {
      setCouponApplied(true)
      setCouponDiscount(10)
      alert("Áp dụng mã giảm giá thành công: Giảm 10%")
    } else if (couponCode.toUpperCase() === "SALE20") {
      setCouponApplied(true)
      setCouponDiscount(20)
      alert("Áp dụng mã giảm giá thành công: Giảm 20%")
    } else {
      alert("Mã giảm giá không hợp lệ hoặc đã hết hạn")
    }
  }

  const handleRemoveCoupon = () => {
    setCouponApplied(false)
    setCouponDiscount(0)
    setCouponCode("")
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống")
      return
    }

    // Save order summary to localStorage for checkout page
    const orderSummary = {
      items: cartItems,
      subtotal: calculateSubtotal(),
      shipping: calculateShipping(),
      discount: calculateDiscount(),
      total: calculateTotal(),
    }

    localStorage.setItem("orderSummary", JSON.stringify(orderSummary))

    // Navigate to checkout page
    navigate("/checkout")
  }

  // Calculate prices
  const calculateItemTotal = (item) => {
    const discountedPrice = item.discount ? Math.round((item.price * (100 - item.discount)) / 100) : item.price
    return discountedPrice * item.quantity
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0)
  }

  const calculateDiscount = () => {
    return couponApplied ? Math.round((calculateSubtotal() * couponDiscount) / 100) : 0
  }

  const calculateShipping = () => {
    const subtotal = calculateSubtotal()
    // Free shipping for orders over 500,000đ
    return subtotal > 500000 ? 0 : 30000
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() - calculateDiscount()
  }

  const formatPrice = (price) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải giỏ hàng...</p>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>Giỏ hàng của bạn</h1>
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link> / <span>Giỏ hàng</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingCart />
            </div>
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link to="/products" className="btn-continue-shopping">
              <FaArrowLeft /> Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <div className="cart-header-item product-col">Sản phẩm</div>
                <div className="cart-header-item price-col">Đơn giá</div>
                <div className="cart-header-item quantity-col">Số lượng</div>
                <div className="cart-header-item total-col">Thành tiền</div>
                <div className="cart-header-item action-col"></div>
              </div>

              {cartItems.map((item, index) => {
                const discountedPrice = item.discount
                  ? Math.round((item.price * (100 - item.discount)) / 100)
                  : item.price

                return (
                  <div className="cart-item" key={index}>
                    <div className="product-col">
                      <div className="product-info">
                        <div className="product-image">
                          <img src={item.image || "/placeholder.svg"} alt={item.name} />
                        </div>
                        <div className="product-details">
                          <h3 className="product-name">{item.name}</h3>
                          <div className="product-variants">
                            <span className="variant">Màu: {item.color}</span>
                            <span className="variant">Size: {item.size}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="price-col">
                      {item.discount > 0 ? (
                        <>
                          <span className="current-price">{formatPrice(discountedPrice)}</span>
                          <span className="original-price">{formatPrice(item.price)}</span>
                        </>
                      ) : (
                        <span className="current-price">{formatPrice(item.price)}</span>
                      )}
                    </div>

                    <div className="quantity-col">
                      <div className="quantity-selector">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(index, Number.parseInt(e.target.value) || 1)}
                        />
                        <button className="quantity-btn" onClick={() => handleQuantityChange(index, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className="total-col">
                      <span className="item-total">{formatPrice(calculateItemTotal(item))}</span>
                    </div>

                    <div className="action-col">
                      <button className="btn-remove" onClick={() => handleRemoveItem(index)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                )
              })}

              <div className="cart-actions">
                <Link to="/products" className="btn-continue-shopping">
                  <FaArrowLeft /> Tiếp tục mua sắm
                </Link>
                <button className="btn-clear-cart" onClick={handleClearCart}>
                  Xóa giỏ hàng
                </button>
              </div>
            </div>

            <div className="cart-summary">
              <h2>Tóm tắt đơn hàng</h2>

              <div className="coupon-section">
                <h3>Mã giảm giá</h3>
                {couponApplied ? (
                  <div className="applied-coupon">
                    <div className="coupon-info">
                      <span className="coupon-code">{couponCode.toUpperCase()}</span>
                      <span className="coupon-discount">-{couponDiscount}%</span>
                    </div>
                    <button className="btn-remove-coupon" onClick={handleRemoveCoupon}>
                      Xóa
                    </button>
                  </div>
                ) : (
                  <div className="coupon-form">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button className="btn-apply-coupon" onClick={handleApplyCoupon}>
                      Áp dụng
                    </button>
                  </div>
                )}
              </div>

              <div className="summary-details">
                <div className="summary-row">
                  <span className="summary-label">Tạm tính</span>
                  <span className="summary-value">{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Phí vận chuyển</span>
                  <span className="summary-value">
                    {calculateShipping() === 0 ? "Free" : formatPrice(calculateShipping())}
                  </span>
                </div>
                {couponApplied && (
                  <div className="summary-row discount">
                    <span className="summary-label">Giảm giá</span>
                    <span className="summary-value">-{formatPrice(calculateDiscount())}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span className="summary-label">Tổng cộng</span>
                  <span className="summary-value">{formatPrice(calculateTotal())}</span>
                </div>
              </div>

              <button className="btn-checkout" onClick={handleCheckout}>
                Tiến hành thanh toán
              </button>

              <div className="shipping-note">
                <p>Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
