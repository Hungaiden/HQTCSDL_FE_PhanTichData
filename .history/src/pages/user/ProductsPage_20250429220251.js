"use client"

import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { FaFilter, FaTimes, FaSort, FaChevronDown, FaChevronUp } from "react-icons/fa"
import "../../styles/pages/productsPage.scss"

const ProductsPage = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    colors: true,
    sizes: true,
  })

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    // Simulating API call to fetch products
    setLoading(true)
    setTimeout(() => {
      // Sample product data
      const sampleProducts = [
        {
          id: 1,
          name: "Áo thun nam cổ tròn",
          price: 299000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 0,
          category: "Thời trang nam",
          color: "Đen",
          size: ["S", "M", "L", "XL"],
        },
        {
          id: 2,
          name: "Đầm nữ mùa hè",
          price: 499000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 20,
          category: "Thời trang nữ",
          color: "Xanh",
          size: ["S", "M", "L"],
        },
        {
          id: 3,
          name: "Áo hoodie unisex",
          price: 399000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 0,
          category: "Unisex",
          color: "Xám",
          size: ["M", "L", "XL"],
        },
        {
          id: 4,
          name: "Quần jean nữ",
          price: 599000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 0,
          category: "Thời trang nữ",
          color: "Xanh đậm",
          size: ["S", "M", "L"],
        },
        {
          id: 5,
          name: "Áo sơ mi nam",
          price: 459000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 0,
          category: "Thời trang nam",
          color: "Trắng",
          size: ["S", "M", "L", "XL"],
        },
        {
          id: 6,
          name: "Áo kiểu nữ",
          price: 349000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 15,
          category: "Thời trang nữ",
          color: "Hồng",
          size: ["S", "M", "L"],
        },
        {
          id: 7,
          name: "Quần jean nam",
          price: 549000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 0,
          category: "Thời trang nam",
          color: "Xanh",
          size: ["S", "M", "L", "XL"],
        },
        {
          id: 8,
          name: "Áo len nữ",
          price: 449000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 0,
          category: "Thời trang nữ",
          color: "Đỏ",
          size: ["S", "M", "L"],
        },
        {
          id: 9,
          name: "Áo khoác denim",
          price: 699000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 10,
          category: "Unisex",
          color: "Xanh",
          size: ["M", "L", "XL"],
        },
        {
          id: 10,
          name: "Váy dài nữ",
          price: 799000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 0,
          category: "Thời trang nữ",
          color: "Đen",
          size: ["S", "M", "L"],
        },
        {
          id: 11,
          name: "Áo polo nam",
          price: 359000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 0,
          category: "Thời trang nam",
          color: "Xanh lá",
          size: ["S", "M", "L", "XL"],
        },
        {
          id: 12,
          name: "Quần short nam",
          price: 299000,
          image: "/placeholder.svg?height=300&width=300",
          discount: 0,
          category: "Thời trang nam",
          color: "Xám",
          size: ["S", "M", "L", "XL"],
        },
      ]

      // Apply URL params if any
      const categoryParam = searchParams.get("category")
      if (categoryParam) {
        const categoryMap = {
          nam: "Thời trang nam",
          nu: "Thời trang nữ",
          "tre-em": "Thời trang trẻ em",
          "phu-kien": "Phụ kiện",
        }
        setSelectedCategories([categoryMap[categoryParam] || categoryParam])
      }

      setProducts(sampleProducts)
      setLoading(false)
    }, 500)
  }, [searchParams])

  const toggleFilter = (filter) => {
    setExpandedFilters({
      ...expandedFilters,
      [filter]: !expandedFilters[filter],
    })
  }

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    } else {
      setSelectedSizes([...selectedSizes, size])
    }
  }

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange]
    newPriceRange[index] = Number.parseInt(e.target.value)
    setPriceRange(newPriceRange)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 2000000])
    setSelectedColors([])
    setSelectedSizes([])
  }

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Filter by color
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false
    }

    // Filter by size
    if (selectedSizes.length > 0 && !selectedSizes.some((size) => product.size.includes(size))) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "newest":
      default:
        return b.id - a.id
    }
  })

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Sản phẩm</h1>
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link> / <span>Sản phẩm</span>
          </div>
        </div>

        <div className="products-container">
          {/* Mobile filter toggle */}
          <button className="filter-toggle-mobile" onClick={() => setFilterOpen(!filterOpen)}>
            <FaFilter /> Bộ lọc
          </button>

          {/* Filters sidebar */}
          <aside className={`filters-sidebar ${filterOpen ? "open" : ""}`}>
            <div className="filters-header">
              <h3>Bộ lọc sản phẩm</h3>
              <button className="close-filters" onClick={() => setFilterOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="filters-content">
              <div className="filter-group">
                <div className="filter-header" onClick={() => toggleFilter("categories")}>
                  <h4>Danh mục</h4>
                  {expandedFilters.categories ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expandedFilters.categories && (
                  <div className="filter-options">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes("Thời trang nam")}
                        onChange={() => toggleCategory("Thời trang nam")}
                      />
                      <span>Thời trang nam</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes("Thời trang nữ")}
                        onChange={() => toggleCategory("Thời trang nữ")}
                      />
                      <span>Thời trang nữ</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes("Unisex")}
                        onChange={() => toggleCategory("Unisex")}
                      />
                      <span>Unisex</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes("Phụ kiện")}
                        onChange={() => toggleCategory("Phụ kiện")}
                      />
                      <span>Phụ kiện</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="filter-group">
                <div className="filter-header" onClick={() => toggleFilter("price")}>
                  <h4>Giá</h4>
                  {expandedFilters.price ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expandedFilters.price && (
                  <div className="filter-options">
                    <div className="price-range">
                      <div className="price-inputs">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          min="0"
                          max={priceRange[1]}
                        />
                        <span>-</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          min={priceRange[0]}
                          max="2000000"
                        />
                      </div>
                      <div className="price-slider">
                        <input
                          type="range"
                          min="0"
                          max="2000000"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                        />
                        <input
                          type="range"
                          min="0"
                          max="2000000"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="filter-group">
                <div className="filter-header" onClick={() => toggleFilter("colors")}>
                  <h4>Màu sắc</h4>
                  {expandedFilters.colors ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expandedFilters.colors && (
                  <div className="filter-options">
                    <div className="color-options">
                      {["Đen", "Trắng", "Xanh", "Đỏ", "Xám", "Hồng", "Xanh lá", "Xanh đậm"].map((color) => (
                        <label key={color} className="color-option">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(color)}
                            onChange={() => toggleColor(color)}
                          />
                          <span className={`color-circle ${color.toLowerCase().replace(" ", "-")}`}></span>
                          <span>{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="filter-group">
                <div className="filter-header" onClick={() => toggleFilter("sizes")}>
                  <h4>Kích thước</h4>
                  {expandedFilters.sizes ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expandedFilters.sizes && (
                  <div className="filter-options">
                    <div className="size-options">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <label key={size} className="size-option">
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => toggleSize(size)}
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="clear-filters" onClick={clearFilters}>
                Xóa bộ lọc
              </button>
            </div>
          </aside>

          {/* Products grid */}
          <div className="products-content">
            <div className="products-toolbar">
              <div className="products-count">Hiển thị {sortedProducts.length} sản phẩm</div>
              <div className="products-sort">
                <label>
                  <FaSort /> Sắp xếp theo:
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá: Thấp đến cao</option>
                    <option value="price-desc">Giá: Cao đến thấp</option>
                    <option value="name-asc">Tên: A-Z</option>
                    <option value="name-desc">Tên: Z-A</option>
                  </select>
                </label>
              </div>
            </div>

            {loading ? (
              <div className="loading-products">
                <div className="spinner"></div>
                <p>Đang tải sản phẩm...</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="no-products">
                <p>Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn.</p>
                <button className="btn-primary" onClick={clearFilters}>
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {sortedProducts.map((product) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
