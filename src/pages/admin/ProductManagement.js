"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import ProductFormModal from "../../components/products/ProductFormModal";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import "../../styles/pages/productManagement.scss";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products"
      );
      const data = await response.json();
      if (data.data && data.data.products) {
        const formattedProducts = data.data.products.map((product) => ({
          id: product._id,
          name: product.title,
          category: product.category || "Chưa phân loại",
          price: product.price,
          status: product.status || "Còn hàng",
          stock: product.stock || 0,
        }));
        setProducts(formattedProducts);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products/delete/${currentProduct.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== currentProduct.id));
        setShowDeleteModal(false);
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      let url =
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products/create";
      let method = "POST";

      // Transform data to match API expectations
      const apiData = {
        title: productData.name,
        category: productData.category,
        price: productData.price,
        stock: productData.stock,
        status: productData.status,
      };

      if (productData.id) {
        url = `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/products/update/${productData.id}`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        fetchProducts(); // Refresh products list
        setShowProductModal(false);
      } else {
        console.error("Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "" || product.category === filterCategory) &&
      (filterStatus === "" || product.status === filterStatus)
    );
  });

  const categories = [...new Set(products.map((p) => p.category))];
  const statuses = [...new Set(products.map((p) => p.status))];

  if (loading) {
    return <div> Loading... </div>;
  }

  return (
    <div className="product-management-page">
      <div className="page-header">
        <h1> Quản lý sản phẩm </h1>{" "}
        <button className="btn-primary" onClick={handleAddProduct}>
          <FaPlus /> Thêm sản phẩm mới{" "}
        </button>{" "}
      </div>
      <div className="filters-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />{" "}
        </div>{" "}
        <div className="filter-box">
          <FaFilter />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value=""> Tất cả danh mục </option>{" "}
            {categories.map((category) => (
              <option key={category} value={category}>
                {" "}
                {category}{" "}
              </option>
            ))}{" "}
          </select>{" "}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value=""> Tất cả trạng thái </option>{" "}
            {statuses.map((status) => (
              <option key={status} value={status}>
                {" "}
                {status}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </div>{" "}
      </div>
      <div className="table-responsive">
        <table className="products-table">
          <thead>
            <tr>
              <th> ID </th> <th> Hình ảnh </th> <th> Tên sản phẩm </th>{" "}
              <th> Danh mục </th> <th> Giá </th> <th> Tồn kho </th>{" "}
              <th> Trạng thái </th> <th> Thao tác </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td> #{product.id} </td>{" "}
                <td>
                  <div className="product-image">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt={product.name}
                    />{" "}
                  </div>{" "}
                </td>{" "}
                <td> {product.name} </td> <td> {product.category} </td>{" "}
                <td> {product.price.toLocaleString()}đ </td>{" "}
                <td> {product.stock} </td>{" "}
                <td>
                  <span
                    className={`status-badge ${
                      product.status === "Còn hàng"
                        ? "active"
                        : product.status === "Sắp hết"
                        ? "low-stock"
                        : "out-of-stock"
                    }`}
                  >
                    {product.status}{" "}
                  </span>{" "}
                </td>{" "}
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon edit"
                      onClick={() => handleEditProduct(product)}
                    >
                      <FaEdit />
                    </button>{" "}
                    <button
                      className="btn-icon delete"
                      onClick={() => handleDeleteClick(product)}
                    >
                      <FaTrash />
                    </button>{" "}
                  </div>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>
      {showProductModal && (
        <ProductFormModal
          product={currentProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowProductModal(false)}
          categories={categories}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          title="Xóa sản phẩm"
          message={`Bạn có chắc chắn muốn xóa sản phẩm "${currentProduct.name}"? Hành động này không thể hoàn tác.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}{" "}
    </div>
  );
};

export default ProductManagement;
