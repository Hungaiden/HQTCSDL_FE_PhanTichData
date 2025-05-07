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

  // Fetch products from API
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products"
      )
      const data = await response.json()
      if (data.data && data.data.products) {
        const formattedProducts = data.data.products.map(product => ({
          id: product._id,
          name: product.title,
          category: product.category || "Chưa phân loại",
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          discount: product.discount || 0,
          image: product.image || "/placeholder.svg?height=300&width=300",
          rating: product.rating || 4.0,
          ratingCount: product.ratingCount || 0,
          isNew: product.isNew || false
        }))
        setProducts(formattedProducts)
        setFilteredProducts(formattedProducts)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories"
      )
      const data = await response.json()
      if (data.data && Array.isArray(data.data.categories)) {
        const categoryNames = data.data.categories.map(cat => cat.title)
        setCategories(categoryNames)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

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
