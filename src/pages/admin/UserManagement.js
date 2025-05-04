"use client";

import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaUserShield,
} from "react-icons/fa";
import UserFormModal from "../../components/users/UserFormModal";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import "../../styles/pages/userManagement.scss";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch users data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/accounts"
      );
      const data = await response.json();
      if (data.data && data.data.accounts) {
        const formattedUsers = data.data.accounts.map((user) => ({
          id: user._id,
          name: user.fullName,
          email: user.email,
          role: user.role_id || "Chưa có vai trò",
          status: user.status || "Hoạt động",
          lastLogin: user.deletedAt || "Chưa đăng nhập",
        }));
        setUsers(formattedUsers);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowUserModal(true);
  };

  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/accounts/delete/${currentUser.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUsers(users.filter((u) => u.id !== currentUser.id));
        setShowDeleteModal(false);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSaveUser = async (userData) => {
    try {
      let url =
        "https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/accounts/create";
      let method = "POST";

      // Transform data to match API expectations
      const apiData = {
        fullName: userData.name,
        email: userData.email,
        role_id: userData.role,
        status: userData.status,
        ...(userData.password && { password: userData.password }),
      };

      if (userData.id) {
        // Edit existing user
        url = `https://hqtcsdl-git-main-bui-duc-hungs-projects.vercel.app/admin/accounts/update/${userData.id}`;
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
        fetchUsers(); // Refresh the users list
        setShowUserModal(false);
      } else {
        console.error("Failed to save user");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterRole === "" || user.role === filterRole) &&
      (filterStatus === "" || user.status === filterStatus)
    );
  });

  const roles = [...new Set(users.map((u) => u.role))];
  const statuses = [...new Set(users.map((u) => u.status))];

  // Rest of the JSX remains the same
  return (
    <div className="user-management-page">
      <div className="page-header">
        <h1>Quản lý người dùng</h1>
        <button className="btn-primary" onClick={handleAddUser}>
          <FaPlus /> Thêm người dùng mới
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <FaFilter />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">Tất cả vai trò</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-box">
          <FaFilter />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Đăng nhập gần nhất</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        user.status === "Hoạt động"
                          ? "active"
                          : user.status === "Không hoạt động"
                          ? "inactive"
                          : "blocked"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon edit"
                        onClick={() => handleEditUser(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDeleteClick(user)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="btn-icon role"
                        onClick={() => handleEditUser(user)}
                      >
                        <FaUserShield />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showUserModal && (
        <UserFormModal
          user={currentUser}
          onSave={handleSaveUser}
          onClose={() => setShowUserModal(false)}
          roles={roles}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          title="Xóa người dùng"
          message={`Bạn có chắc chắn muốn xóa người dùng "${currentUser.name}"? Hành động này không thể hoàn tác.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
