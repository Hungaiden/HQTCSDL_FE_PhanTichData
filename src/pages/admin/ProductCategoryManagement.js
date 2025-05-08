"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ProductCategoryFormModal from "../../components/product-categories/ProductCategoryFormModal";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import Pagination from "../../components/common/Pagination";
import "../../styles/pages/productCategoryManagement.scss";

const ProductCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });

  useEffect(() => {
    fetchCategories();
  }, [pagination.currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories?page=${pagination.currentPage}&limit=${pagination.limit}`
      );
      const data = await response.json();
      console.log("API Response:", data); // Thêm log để kiểm tra dữ liệu

      if (data.data) {
        const { categories, pagination: paginationData } = data.data;
        const formattedCategories = categories.map((category) => ({
          id: category._id || "",
          name: category.title || "Chưa có tên",
          description: category.description || "",
          status: category.status || "Hiện",
          position: category.position || 0,
          isFeatured: category.isFeatured || false,
        }));
        setCategories(formattedCategories);
        setPagination(paginationData);
      } else {
        // Nếu không có dữ liệu hoặc dữ liệu không đúng format
        setCategories([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // Set mảng rỗng nếu có lỗi
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setShowCategoryModal(true);
  };

  const handleDeleteClick = (category) => {
    setCurrentCategory(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories/delete/${currentCategory.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCategories(categories.filter((c) => c.id !== currentCategory.id));
        setShowDeleteModal(false);
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      let url =
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories/create";
      let method = "POST";

      const apiData = {
        title: categoryData.name,
        description: categoryData.description,
        status: categoryData.status,
        position: categoryData.position,
        isFeatured: categoryData.isFeatured // Add this
      };

      if (categoryData.id) {
        url = `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories/update/${categoryData.id}`;
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
        fetchCategories();
        setShowCategoryModal(false);
      } else {
        console.error("Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // Sửa lại phần filter để kiểm tra null/undefined
  const filteredCategories = categories.filter((category) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (category.name?.toLowerCase() || "").includes(searchLower) ||
      (category.description?.toLowerCase() || "").includes(searchLower)
    );
  });

  if (loading) return <div> Loading... </div>;

  return (
    <div className="category-management-page">
      <div className="page-header">
        <h1> Quản lý danh mục </h1>{" "}
        <button className="btn-primary" onClick={handleAddCategory}>
          <FaPlus /> Thêm danh mục mới{" "}
        </button>{" "}
      </div>
      <div className="filters-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />{" "}
        </div>{" "}
      </div>
      <div className="table-responsive">
        <table className="categories-table">
          <thead>
            <tr>
              <th> Tên danh mục </th> <th> Mô tả </th>{" "}
              <th> Vị trí </th> <th> Trạng thái </th> <th> Nổi bật </th> <th> Thao tác </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td> {category.name} </td>{" "}
                <td> {category.description} </td> <td> {category.position} </td>{" "}
                <td>
                  <span
                    className={`status-badge ${
                      category.status === "Hiện" ? "active" : "inactive"
                    }`}
                  >
                    {" "}
                    {category.status}{" "}
                  </span>{" "}
                </td>{" "}
                <td>
                  <input
                    type="checkbox"
                    checked={category.isFeatured}
                    onChange={async () => {
                      try {
                        const response = await fetch(
                          `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/categories/update/${category.id}`,
                          {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              isFeatured: !category.isFeatured
                            }),
                          }
                        );
                        if (response.ok) {
                          fetchCategories(); // Refresh the list
                        }
                      } catch (error) {
                        console.error("Error updating featured status:", error);
                      }
                    }}
                  />
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon edit"
                      onClick={() => handleEditCategory(category)}
                    >
                      <FaEdit />
                    </button>{" "}
                    <button
                      className="btn-icon delete"
                      onClick={() => handleDeleteClick(category)}
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
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(page) =>
          setPagination({ ...pagination, currentPage: page })
        }
      />
      {showCategoryModal && (
        <ProductCategoryFormModal
          category={currentCategory}
          onSave={handleSaveCategory}
          onClose={() => setShowCategoryModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          title="Xóa danh mục"
          message={`Bạn có chắc chắn muốn xóa danh mục "${currentCategory.name}"? Hành động này không thể hoàn tác.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}{" "}
    </div>
  );
};

export default ProductCategoryManagement;
