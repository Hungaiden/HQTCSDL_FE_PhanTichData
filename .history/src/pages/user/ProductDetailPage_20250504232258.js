"use client"

import { useEffect, useState } from "react"
import {
    FaCheck,
    FaHeart,
    FaRegStar,
    FaShieldAlt,
    FaShoppingCart,
    FaStar,
    FaStarHalfAlt,
    FaTruck,
    FaUndo,
} from "react-icons/fa"
import { Link, useOutletContext, useParams } from "react-router-dom"
import "../../styles/pages/ProductDetailPage.scss"

const ProductDetailPage = () => {
  const { productId } = useParams()
  const { setCartCount } = useOutletContext()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    // Simulate API call to fetch product details
    setTimeout(() => {
      const mockProduct = {
        id: productId,
        name: "Áo thun nam cổ tròn basic",
        price: 299000,
        discount: 15,
        rating: 4.5,
        reviewCount: 120,
        description:
          "Áo thun nam cổ tròn basic với chất liệu cotton 100% mang lại cảm giác thoáng mát, thấm hút mồ hôi tốt. Thiết kế đơn giản, dễ phối đồ, phù hợp với nhiều phong cách khác nhau.",
        details: [
          "Chất liệu: Cotton 100%",
          "Kiểu dáng: Regular fit",
          "Xuất xứ: Việt Nam",
          "Bảo quản: Giặt máy ở nhiệt độ thường, không tẩy, ủi ở nhiệt độ thấp",
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Đen", "Trắng", "Xanh navy", "Xám"],
        stock: 50,
        images: [
          "/placeholder.svg?height=600&width=600",
          "/placeholder.svg?height=600&width=600",
          "/placeholder.svg?height=600&width=600",
          "/placeholder.svg?height=600&width=600",
        ],
        category: "Thời trang nam",
      }

      setProduct(mockProduct)
      setLoading(false)

      // Fetch related products
      const mockRelatedProducts = [
        {
          id: 101,
          name: "Áo polo nam basic",
          price: 359000,
          discount: 0,
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 102,
          name: "Áo thun nam họa tiết",
          price: 329000,
          discount: 10,
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 103,
          name: "Áo sơ mi nam dài tay",
          price: 459000,
          discount: 0,
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 104,
          name: "Áo khoác jean nam",
          price: 699000,
          discount: 20,
          image: "/placeholder.svg?height=300&width=300",
        },
      ]

      setRelatedProducts(mockRelatedProducts)
    }, 500)
  }, [productId])

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước")
      return
    }

    if (!selectedColor) {
      alert("Vui lòng chọn màu sắc")
      return
    }

    // Add to cart logic here
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`)

    // Update cart count
    setCartCount((prevCount) => prevCount + quantity)
  }

  const renderStarRating = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} />)
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} />)
    }

    return stars
  }

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="spinner"></div>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    )
  }

  const discountedPrice = product.discount
    ? Math.round((product.price * (100 - product.discount)) / 100)
    : product.price

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> /<Link to="/products"> Sản phẩm</Link> /
          <Link to={`/products?category=${product.category}`}> {product.category}</Link> /<span> {product.name}</span>
        </div>

        <div className="product-detail-container">
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage] || "/placeholder.svg"} alt={product.name} />
              {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
            </div>
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} - Ảnh ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>

            <div className="product-meta">
              <div className="product-rating">
                <div className="stars">{renderStarRating(product.rating)}</div>
                <span className="review-count">{product.reviewCount} đánh giá</span>
              </div>
              <div className="product-sku">
                <span>Mã SP: {product.id}</span>
              </div>
            </div>

            <div className="product-price">
              {product.discount > 0 ? (
                <>
                  <span className="current-price">{discountedPrice.toLocaleString()}đ</span>
                  <span className="original-price">{product.price.toLocaleString()}đ</span>
                  <span className="discount-percent">-{product.discount}%</span>
                </>
              ) : (
                <span className="current-price">{product.price.toLocaleString()}đ</span>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-options">
              <div className="option-group">
                <h3>Màu sắc</h3>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className={`color-option ${selectedColor === color ? "selected" : ""}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <span className={`color-circle ${color.toLowerCase().replace(" ", "-")}`}></span>
                      <span className="color-name">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <h3>Kích thước</h3>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      className={`size-option ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <h3>Số lượng</h3>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn decrease"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input type="number" value={quantity} readOnly />
                  <button
                    className="quantity-btn increase"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                  <span className="stock-info">Còn {product.stock} sản phẩm</span>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button className="btn-add-to-cart" onClick={handleAddToCart}>
                <FaShoppingCart /> Thêm vào giỏ hàng
              </button>
              <button className="btn-buy-now" onClick={handleAddToCart}>
                Mua ngay
              </button>
              <button className="btn-wishlist">
                <FaHeart />
              </button>
            </div>

            <div className="product-benefits">
              <div className="benefit-item">
                <FaTruck />
                <span>Giao hàng miễn phí cho đơn hàng từ 500.000đ</span>
              </div>
              <div className="benefit-item">
                <FaUndo />
                <span>Đổi trả miễn phí trong 30 ngày</span>
              </div>
              <div className="benefit-item">
                <FaShieldAlt />
                <span>Bảo hành chính hãng 12 tháng</span>
              </div>
              <div className="benefit-item">
                <FaCheck />
                <span>Cam kết 100% chính hãng</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details-tabs">
          <div className="tabs-header">
            <div className="tab active">Thông tin sản phẩm</div>
            <div className="tab">Đánh giá ({product.reviewCount})</div>
          </div>
          <div className="tabs-content">
            <div className="tab-pane active">
              <h3>Chi tiết sản phẩm</h3>
              <ul className="product-details-list">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>

              <h3>Hướng dẫn bảo quản</h3>
              <ul className="product-care-list">
                <li>Giặt máy ở nhiệt độ thường</li>
                <li>Không sử dụng chất tẩy</li>
                <li>Ủi ở nhiệt độ thấp</li>
                <li>Không giặt khô</li>
                <li>Phơi trong bóng râm</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="related-products">
          <h2>Sản phẩm liên quan</h2>
          <div className="products-grid">
            {relatedProducts.map((product) => (
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
                          {Math.round((product.price * (100 - product.discount)) / 100).toLocaleString()}đ
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
      </div>
    </div>
  )
}

export default ProductDetailPage
