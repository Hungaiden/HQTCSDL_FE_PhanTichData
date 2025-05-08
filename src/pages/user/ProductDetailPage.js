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
    window.scrollTo(0, 0);
    fetchProductDetails();
    fetchRelatedProducts();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products/${productId}`
      );
      const data = await response.json();
      
      if (data.data) {
        const productData = data.data;
        // Fetch category info
        const categoryResponse = await fetch(
          `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories/${productData.category_id}`
        );
        const categoryData = await categoryResponse.json();
        
        setProduct({
          id: productData._id,
          name: productData.title,
          price: productData.price,
          originalPrice: productData.originalPrice || productData.price,
          discount: productData.discount || 0,
          description: productData.description || "",
          category: categoryData.data ? categoryData.data.title : "Chưa phân loại",
          categoryId: productData.category_id,
          stock: productData.stock || 0,
          rating: productData.rating || 4.5,
          reviewCount: productData.reviewCount || 0,
          images: [productData.thumbnail || "/placeholder.svg"],
          sizes: ["S", "M", "L", "XL"], // You can add these to your API if needed
          colors: ["Đen", "Trắng", "Xanh navy", "Xám"], // You can add these to your API if needed
          details: productData.details || [] // Add default empty array
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(
        `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products`
      );
      const data = await response.json();
      
      if (data.data && data.data.products) {
        const relatedProds = data.data.products
          .filter(prod => prod._id !== productId)
          .slice(0, 4)
          .map(prod => ({
            id: prod._id,
            name: prod.title,
            price: prod.price,
            discount: prod.discount || 0,
            image: prod.thumbnail || "/placeholder.svg"
          }));
        setRelatedProducts(relatedProds);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

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
                {/* Only map if details array exists */}
                {product.details && product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
                {/* Add default details if none provided */}
                {(!product.details || product.details.length === 0) && (
                  <>
                    <li>Chất liệu: Cotton cao cấp</li>
                    <li>Xuất xứ: Việt Nam</li>
                    <li>Phong cách: Hiện đại, trẻ trung</li>
                  </>
                )}
              </ul>
              {/* Rest of the details section */}
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
