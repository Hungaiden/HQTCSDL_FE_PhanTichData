"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "../../styles/components/modal.scss";
import "../../styles/components/categoryForm.scss";

const ProductCategoryFormModal = ({ category, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    status: "Hiện",
    position: 0,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        description: category.description,
        status: category.status,
        position: category.position,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2> {category ? "Sửa danh mục" : "Thêm danh mục mới"} </h2>{" "}
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>{" "}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name"> Tên danh mục </label>{" "}
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description"> Mô tả </label>{" "}
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="position"> Vị trí </label>{" "}
            <input
              type="number"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status"> Trạng thái </label>{" "}
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Hiện"> Hiện </option>{" "}
              <option value="Ẩn"> Ẩn </option>{" "}
            </select>{" "}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Hủy{" "}
            </button>{" "}
            <button type="submit" className="btn-primary">
              {" "}
              {category ? "Cập nhật" : "Thêm mới"}{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default ProductCategoryFormModal;
