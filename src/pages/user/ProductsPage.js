"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../../styles/pages/productsPage.scss"

const ProductsPage = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [sortBy, setSortBy] = useState("newest")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // Simulated data fetch
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyProducts = [
        {
          id: 1,
          name: "Áo polo nam",
          category: "Thời trang nam",
          price: 359000,
          originalPrice: 450000,
          discount: 20,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.5,
          ratingCount: 120,
          isNew: true,
        },
        {
          id: 2,
          name: "Quần short nam",
          category: "Thời trang nam",
          price: 299000,
          originalPrice: 350000,
          discount: 15,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.2,
          ratingCount: 85,
        },
        {
          id: 3,
          name: "Váy đầm nữ",
          category: "Thời trang nữ",
          price: 799000,
          originalPrice: 950000,
          discount: 16,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.8,
          ratingCount: 210,
          isNew: true,
        },
        {
          id: 4,
          name: "Áo sơ mi nam",
          category: "Thời trang nam",
          price: 450000,
          originalPrice: 550000,
          discount: 18,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.3,
          ratingCount: 95,
        },
        {
          id: 5,
          name: "Áo khoác nữ",
          category: "Thời trang nữ",
          price: 850000,
          originalPrice: 1050000,
          discount: 19,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.6,
          ratingCount: 150,
        },
        {
          id: 6,
          name: "Quần jeans nam",
          category: "Thời trang nam",
          price: 550000,
          originalPrice: 650000,
          discount: 15,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.4,
          ratingCount: 110,
        },
        {
          id: 7,
          name: "Áo thun nữ",
          category: "Thời trang nữ",
          price: 250000,
          originalPrice: 300000,
          discount: 17,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.2,
          ratingCount: 80,
          isNew: true,
        },
        {
          id: 8,
          name: "Giày thể thao nam",
          category: "Giày dép",
          price: 1200000,
          originalPrice: 1500000,
          discount: 20,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.7,
          ratingCount: 180,
        },
        {
          id: 9,
          name: "Túi xách nữ",
          category: "Phụ kiện",
          price: 950000,
          originalPrice: 1200000,
          discount: 21,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.5,
          ratingCount: 130,
        },
        {
          id: 10,
          name: "Đồng hồ nam",
          category: "Phụ kiện",
          price: 1800000,
          originalPrice: 2200000,
          discount: 18,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.9,
          ratingCount: 220,
          isNew: true,
        },
        {
          id: 11,
          name: "Quần dài nữ",
          category: "Thời trang nữ",
          price: 480000,
          originalPrice: 600000,
          discount: 20,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.3,
          ratingCount: 90,
        },
        {
          id: 12,
          name: "Áo khoác nam",
          category: "Thời trang nam",
          price: 950000,
          originalPrice: 1150000,
          discount: 17,
          image: "/placeholder.svg?height=300&width=300",
          rating: 4.6,
          ratingCount: 140,
        },
      ]

      const uniqueCategories = [...new Set(dummyProducts.map((product) => product.category))]
      setCategories(uniqueCategories)
      setProducts(dummyProducts)
      setFilteredProducts(dummyProducts)
      setLoading(false)
    }, 1000)
  }, [])

  // Apply filters
  const applyFilters = () => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by price
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount)
        break
      default: // newest
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  // Handle category selection
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Handle price range change
  const handlePriceChange = (index, value) => {
    const newPriceRange = [...priceRange]
    newPriceRange[index] = Number.parseInt(value)
    setPriceRange(newPriceRange)
  }

  // Apply filters when filter state changes
  useEffect(() => {
    applyFilters()
  }, [selectedCategories, priceRange, sortBy])

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Toggle mobile filters
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 2000000])
    setSortBy("newest")
  }

  // Format price to VND
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
  }

  // Render star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>)
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-star-${i}`} className="far fa-star"></i>)
    }

    return stars
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="container">
          <h1>Sản phẩm</h1>
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Sản phẩm</span>
          </div>
        </div>
      </div>

      <div className="container">
        <button className="filter-toggle-mobile" onClick={toggleFilters}>
          <i className="fas fa-filter"></i> Bộ lọc sản phẩm
        </button>

        <div className="products-container">
          <div className={`filters-sidebar ${filtersOpen ? "open" : ""}`}>
            <div className="filters-header">
              <h3>Bộ lọc sản phẩm</h3>
              <button className="close-filters" onClick={toggleFilters}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="filters-content">
              <div className="filter-group">
                <div className="filter-header">
                  <h4>Danh mục</h4>
                  <span className="toggle-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </div>
                <div className="filter-options">
                  {categories.map((category, index) => (
                    <label key={index} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-header">
                  <h4>Giá</h4>
                  <span className="toggle-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </div>
                <div className="filter-options">
                  <div className="price-range">
                    <div className="price-inputs">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        min="0"
                        max={priceRange[1]}
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        min={priceRange[0]}
                        max="2000000"
                      />
                    </div>
                    <div className="slider">
                      <div
                        className="progress"
                        style={{
                          left: `${(priceRange[0] / 2000000) * 100}%`,
                          right: `${100 - (priceRange[1] / 2000000) * 100}%`,
                        }}
                      ></div>
                      <div className="range-input">
                        <input
                          type="range"
                          min="0"
                          max="2000000"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(0, e.target.value)}
                        />
                        <input
                          type="range"
                          min="0"
                          max="2000000"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(1, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="apply-filters" onClick={applyFilters}>
                Áp dụng bộ lọc
              </button>
            </div>
          </div>

          <div className="products-main">
            <div className="products-header">
              <div className="products-count">
                Hiển thị <span>{filteredProducts.length}</span> sản phẩm
              </div>
              <div className="products-sort">
                <label>Sắp xếp theo:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Mới nhất</option>
                  <option value="price-low">Giá: Thấp đến cao</option>
                  <option value="price-high">Giá: Cao đến thấp</option>
                  <option value="name">Tên sản phẩm</option>
                  <option value="discount">Giảm giá nhiều nhất</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="loading-products">
                <div className="spinner"></div>
                <p>Đang tải sản phẩm...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn</p>
                <button onClick={clearFilters}>Xóa bộ lọc</button>
              </div>
            ) : (
              <div className="products-grid">
                {currentProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    {product.isNew && <div className="product-badge">Mới</div>}
                    <Link to={`/products/${product.id}`} className="product-card-link">
                      <div className="product-image">
                        <img src={product.image || "/placeholder.svg"} alt={product.name} />
                        <div className="product-actions">
                          <button title="Xem nhanh">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="add-to-cart" title="Thêm vào giỏ">
                            <i className="fas fa-shopping-cart"></i>
                          </button>
                        </div>
                      </div>
                      <div className="product-info">
                        <div className="product-category">{product.category}</div>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-price">
                          <span className="current-price">{formatPrice(product.price)}</span>
                          {product.discount > 0 && (
                            <>
                              <span className="original-price">{formatPrice(product.originalPrice)}</span>
                              <span className="discount">-{product.discount}%</span>
                            </>
                          )}
                        </div>
                        <div className="product-rating">
                          <div className="stars">{renderStars(product.rating)}</div>
                          <span className="rating-count">({product.ratingCount})</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="pagination">
                <ul className="pagination-list">
                  <li className="pagination-item">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={currentPage === 1 ? "disabled" : ""}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map((number) => (
                    <li key={number + 1} className="pagination-item">
                      <button
                        onClick={() => paginate(number + 1)}
                        className={currentPage === number + 1 ? "active" : ""}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  <li className="pagination-item">
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={currentPage === totalPages ? "disabled" : ""}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
