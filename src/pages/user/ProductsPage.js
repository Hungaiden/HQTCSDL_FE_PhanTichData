"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../../styles/pages/productsPage.scss"
import { FaSearch } from "react-icons/fa"

const ProductsPage = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [sortBy, setSortBy] = useState("newest")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 12
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from API
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts();
  }, [pagination.currentPage, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products?page=${pagination.currentPage}&limit=${pagination.limit}&search=${searchTerm}`
      );
      const data = await response.json();
      if (data.data) {
        const { products: productsData, pagination: paginationData } = data.data;
        const formattedProducts = await Promise.all(productsData.map(async (product) => {
          // Fetch category info for each product
          const categoryResponse = await fetch(
            `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories/${product.category_id}`
          );
          const categoryData = await categoryResponse.json();
          const category = categoryData.data;

          return {
            id: product._id,
            name: product.title,
            categoryId: product.category_id, // Make sure this is correctly set
            category: category ? category.title : "Chưa phân loại",
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            discount: product.discount || 0,
            image: product.thumbnail || "/placeholder.svg",
            rating: product.rating || 4.0,
            ratingCount: product.ratingCount || 0,
            isNew: product.isNew || false
          };
        }));
        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        setPagination(paginationData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories/all"
      );
      const data = await response.json();
      if (data.data && data.data.categories) {
        const categories = data.data.categories
          .filter(cat => cat.status === "active")
          .map(cat => ({
            id: cat._id,
            title: cat.title,
            parent_id: cat.parent_id
          }));
        // Build tree structure for nested display
        const rootCategories = categories.filter(cat => !cat.parent_id);
        const nestedCategories = rootCategories.map(cat => ({
          ...cat,
          children: getChildCategories(cat.id, categories)
        }));
        setCategories(nestedCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add helper function to get child categories
  const getChildCategories = (parentId, allCategories) => {
    const children = allCategories.filter(cat => cat.parent_id === parentId);
    return children.map(child => ({
      ...child,
      children: getChildCategories(child.id, allCategories)
    }));
  };

  const getAllChildrenIds = (categoryId, allCategories) => {
    let ids = [categoryId];
    const category = allCategories.find(cat => cat.id === categoryId);
    if (category && category.children) {
      category.children.forEach(child => {
        ids = [...ids, ...getAllChildrenIds(child.id, allCategories)];
      });
    }
    return ids;
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      const allCategoryIds = selectedCategories.flatMap(catId => 
        getAllChildrenIds(catId, categories)
      );
      filtered = filtered.filter(product => 
        allCategoryIds.includes(product.categoryId)
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(prev => 
        prev.filter(id => id !== categoryId)
      );
    } else {
      setSelectedCategories(prev => [...prev, categoryId]);
    }
  };

  // Add this effect to reapply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, priceRange, sortBy, searchTerm, products]);

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...priceRange]
    newPriceRange[index] = Number.parseInt(value)
    setPriceRange(newPriceRange)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.querySelector('input[type="search"]').value;
    setSearchTerm(searchValue);
    setPagination(prev => ({...prev, currentPage: 1})); // Reset to first page on search
  };

  const renderCategory = (category, level = 0) => {
    return (
      <div key={category.id} className="category-item" style={{ paddingLeft: `${level * 20}px` }}>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
            onChange={() => handleCategoryChange(category.id)}
          />
          {category.title}
        </label>
        {category.children && category.children.length > 0 && (
          <div className="nested-categories">
            {category.children.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const paginate = (pageNumber) => {
    setPagination(prev => ({
      ...prev,
      currentPage: pageNumber
    }));
  }

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 2000000])
    setSortBy("newest")
  }

  const formatPrice = (price) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

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
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              defaultValue={searchTerm}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
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
                  {categories.map(category => renderCategory(category))}
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
                {filteredProducts.map((product) => (
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
                      onClick={() => paginate(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className={pagination.currentPage === 1 ? "disabled" : ""}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                  </li>
                  {[...Array(pagination.totalPages).keys()].map((number) => (
                    <li key={number + 1} className="pagination-item">
                      <button
                        onClick={() => paginate(number + 1)}
                        className={pagination.currentPage === number + 1 ? "active" : ""}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  <li className="pagination-item">
                    <button
                      onClick={() => paginate(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className={pagination.currentPage === pagination.totalPages ? "disabled" : ""}
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