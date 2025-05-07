"use client"

import { useEffect, useState } from "react"
import { FaArrowRight, FaHeadset, FaShieldAlt, FaShippingFast, FaUndo } from "react-icons/fa"
import { Link } from "react-router-dom"
import "../../styles/pages/homePage.scss"

const HomePage = () => {
  const [categories, setCategories] = useState([])  
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([]) // Thêm state
  const [bestSellers, setBestSellers] = useState([]) // Thêm state  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
    fetchFeaturedProducts()
    fetchNewArrivals() // Thêm fetch
    fetchBestSellers() // Thêm fetch
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories/all"
      )
      const data = await response.json()
      if (data.data && data.data.categories) {
        const activeCategories = data.data.categories
          .filter(cat => cat.status === "active")
          .slice(0, 3) // Chỉ lấy 3 danh mục đầu tiên
        setCategories(activeCategories)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products"
      )
      const data = await response.json()
      if (data.data && data.data.products) {
        const featured = data.data.products
          .filter(product => product.featured === "1")
          .slice(0, 8) // Chỉ lấy 8 sản phẩm nổi bật
        setFeaturedProducts(featured)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  const fetchNewArrivals = async () => {
    try {
      const response = await fetch(
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products?sort=newest"
      )
      const data = await response.json()
      if (data.data && data.data.products) {
        const newProducts = data.data.products
          .filter(product => product.status === "active")
          .slice(0, 8)
        setNewArrivals(newProducts)
      }
    } catch (error) {
      console.error("Error fetching new arrivals:", error)
    }
  }

  const fetchBestSellers = async () => {
    try {
      const response = await fetch(
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products?sort=bestselling"
      )
      const data = await response.json()
      if (data.data && data.data.products) {
        const bestSelling = data.data.products
          .filter(product => product.status === "active")
          .slice(0, 8)
        setBestSellers(bestSelling)
      }
    } catch (error) {
      console.error("Error fetching best sellers:", error)
    }
  }

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

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Danh mục sản phẩm</h2>
            <Link to="/products" className="view-all">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <div className="category-card" key={category._id}>
                <div className="category-image">
                  <img 
                    src={category.thumbnail || "/placeholder.svg?height=400&width=300"} 
                    alt={category.title} 
                  />
                </div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <Link 
                    to={`/products?category=${category.slug}`} 
                    className="btn-outline"
                  >
                    Khám phá
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Sản phẩm nổi bật</h2>
            <Link to="/products" className="view-all">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="loading">Đang tải...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <Link to={`/products/${product._id}`}>
                    <div className="product-image">
                      <img
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.title}
                      />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.title}</h3>
                      <div className="product-price">
                        {product.discount > 0 ? (
                          <>
                            <span className="discounted-price">
                              ${((product.price * (100 - product.discount)) / 100).toLocaleString()}
                            </span>
                            <span className="original-price">
                              ${product.price.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="price">${product.price.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
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
              <div className="product-card" key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <div className="product-image">
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                    />
                    {product.discountPercentage > 0 && (
                      <span className="discount-badge">
                        -{product.discountPercentage}%
                      </span>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.title}</h3>
                    <div className="product-price">
                      {product.discountPercentage > 0 ? (
                        <>
                          <span className="current-price">
                            ${((product.price * (100 - product.discountPercentage)) / 100).toLocaleString()}
                          </span>
                          <span className="original-price">
                            ${product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="price">${product.price.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </Link>
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
              <div className="product-card" key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <div className="product-image">
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                    />
                    {product.discountPercentage > 0 && (
                      <span className="discount-badge">
                        -{product.discountPercentage}%
                      </span>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.title}</h3>
                    <div className="product-price">
                      {product.discountPercentage > 0 ? (
                        <>
                          <span className="current-price">
                            ${((product.price * (100 - product.discountPercentage)) / 100).toLocaleString()}
                          </span>
                          <span className="original-price">
                            ${product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="price">${product.price.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Moved to bottom
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
      </section> */}
    </div>
  )
}

export default HomePage
