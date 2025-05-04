"use client"

import { useEffect, useState } from "react"
import { FaArrowRight, FaHeadset, FaShieldAlt, FaShippingFast, FaUndo } from "react-icons/fa"
import { Link } from "react-router-dom"
import "../../styles/pages/homePage.scss"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    // Simulating API calls to fetch products
    // In a real app, these would be API calls
    setFeaturedProducts([
      {
        id: 1,
        name: "Áo thun nam cổ tròn",
        price: 299000,
        image: "/placeholder.svg?height=300&width=300",
        discount: 0,
      },
      { id: 2, name: "Đầm nữ mùa hè", price: 499000, image: "/placeholder.svg?height=300&width=300", discount: 20 },
      { id: 3, name: "Áo hoodie unisex", price: 399000, image: "/placeholder.svg?height=300&width=300", discount: 0 },
      { id: 4, name: "Quần jean nữ", price: 599000, image: "/placeholder.svg?height=300&width=300", discount: 0 },
    ])

    setNewArrivals([
      { id: 5, name: "Áo sơ mi nam", price: 459000, image: "/placeholder.svg?height=300&width=300", discount: 0 },
      { id: 6, name: "Áo kiểu nữ", price: 349000, image: "/placeholder.svg?height=300&width=300", discount: 15 },
      { id: 7, name: "Quần jean nam", price: 549000, image: "/placeholder.svg?height=300&width=300", discount: 0 },
      { id: 8, name: "Áo len nữ", price: 449000, image: "/placeholder.svg?height=300&width=300", discount: 0 },
    ])

    setBestSellers([
      { id: 9, name: "Áo khoác denim", price: 699000, image: "/placeholder.svg?height=300&width=300", discount: 10 },
      { id: 10, name: "Váy dài nữ", price: 799000, image: "/placeholder.svg?height=300&width=300", discount: 0 },
      { id: 11, name: "Áo polo nam", price: 359000, image: "/placeholder.svg?height=300&width=300", discount: 0 },
      { id: 12, name: "Quần short nam", price: 299000, image: "/placeholder.svg?height=300&width=300", discount: 0 },
    ])
  }, [])

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container">
          <div className="hero-content">
            <h1>Bộ sưu tập mùa hè 2023</h1>
            <p>Khám phá các xu hướng thời trang mới nhất với bộ sưu tập mùa hè đầy màu sắc và phong cách</p>
            <Link to="/products" className="btn-primary">
              Mua sắm ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Danh mục sản phẩm</h2>
            <Link to="/products" className="view-all">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>

          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">
                <img src="/placeholder.svg?height=400&width=300" alt="Thời trang nam" />
              </div>
              <div className="category-content">
                <h3>Thời trang nam</h3>
                <Link to="/products?category=nam" className="btn-outline">
                  Khám phá
                </Link>
              </div>
            </div>

            <div className="category-card">
              <div className="category-image">
                <img src="/placeholder.svg?height=400&width=300" alt="Thời trang nữ" />
              </div>
              <div className="category-content">
                <h3>Thời trang nữ</h3>
                <Link to="/products?category=nu" className="btn-outline">
                  Khám phá
                </Link>
              </div>
            </div>

            <div className="category-card">
              <div className="category-image">
                <img src="/placeholder.svg?height=400&width=300" alt="Phụ kiện" />
              </div>
              <div className="category-content">
                <h3>Phụ kiện</h3>
                <Link to="/products?category=phu-kien" className="btn-outline">
                  Khám phá
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Sản phẩm nổi bật</h2>
            <Link to="/products" className="view-all">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
                  <div className="product-actions">
                    <button className="btn-quick-view">Xem nhanh</button>
                    <button className="btn-add-to-cart">Thêm vào giỏ</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="product-price">
                    {product.discount > 0 ? (
                      <>
                        <span className="current-price">
                          {((product.price * (100 - product.discount)) / 100).toLocaleString()}đ
                        </span>
                        <span className="original-price">{product.price.toLocaleString()}đ</span>
                      </>
                    ) : (
                      <span className="current-price">{product.price.toLocaleString()}đ</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <h2>Giảm giá lên đến 50%</h2>
            <p>Ưu đãi đặc biệt cho bộ sưu tập mùa hè. Nhanh tay mua sắm ngay hôm nay!</p>
            <Link to="/products?category=sale" className="btn-primary">
              Mua ngay
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Sản phẩm mới</h2>
            <Link to="/products?sort=newest" className="view-all">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>

          <div className="products-grid">
            {newArrivals.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
                  <div className="product-actions">
                    <button className="btn-quick-view">Xem nhanh</button>
                    <button className="btn-add-to-cart">Thêm vào giỏ</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="product-price">
                    {product.discount > 0 ? (
                      <>
                        <span className="current-price">
                          {((product.price * (100 - product.discount)) / 100).toLocaleString()}đ
                        </span>
                        <span className="original-price">{product.price.toLocaleString()}đ</span>
                      </>
                    ) : (
                      <span className="current-price">{product.price.toLocaleString()}đ</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Sản phẩm bán chạy</h2>
            <Link to="/products?sort=bestselling" className="view-all">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>

          <div className="products-grid">
            {bestSellers.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
                  <div className="product-actions">
                    <button className="btn-quick-view">Xem nhanh</button>
                    <button className="btn-add-to-cart">Thêm vào giỏ</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="product-price">
                    {product.discount > 0 ? (
                      <>
                        <span className="current-price">
                          {((product.price * (100 - product.discount)) / 100).toLocaleString()}đ
                        </span>
                        <span className="original-price">{product.price.toLocaleString()}đ</span>
                      </>
                    ) : (
                      <span className="current-price">{product.price.toLocaleString()}đ</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <FaShippingFast />
              </div>
              <div className="feature-content">
                <h3>Miễn phí vận chuyển</h3>
                <p>Cho đơn hàng từ 500.000đ</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaUndo />
              </div>
              <div className="feature-content">
                <h3>Đổi trả dễ dàng</h3>
                <p>Trong vòng 30 ngày</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaHeadset />
              </div>
              <div className="feature-content">
                <h3>Hỗ trợ 24/7</h3>
                <p>Hotline: 1900 1234</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <div className="feature-content">
                <h3>Thanh toán an toàn</h3>
                <p>Bảo mật thông tin</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
