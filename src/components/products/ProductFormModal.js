"use client"

import { useState, useEffect } from "react"
import { FaTimes, FaUpload } from "react-icons/fa"
import "../../styles/components/modal.scss"
import "../../styles/components/productForm.scss"

const ProductFormModal = ({ product, onSave, onClose, categories }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
    isFeatured: false
  })

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description || "",
        image: product.image || null,
        isFeatured: product.isFeatured || false
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? Number.parseFloat(value) || "" : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Tên sản phẩm</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="category">Danh mục</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="new">+ Thêm danh mục mới</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="1"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Tồn kho</label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Hình ảnh sản phẩm</label>
            <div className="image-upload">
              <div className="image-preview">
                {formData.image ? (
                  <img src={formData.image || "/placeholder.svg"} alt="Xem trước sản phẩm" />
                ) : (
                  <img src="/placeholder.svg?height=100&width=100" alt="Không có hình ảnh" />
                )}
              </div>
              <div className="upload-controls">
                <button type="button" className="btn-upload">
                  <FaUpload /> Tải lên hình ảnh
                </button>
                <p className="upload-hint">Định dạng hỗ trợ: JPG, PNG. Kích thước tối đa: 2MB</p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="isFeatured" className="checkbox-label">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    isFeatured: e.target.checked
                  });
                }}
              />
              <span>Sản phẩm nổi bật</span>
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-primary">
              {product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductFormModal
