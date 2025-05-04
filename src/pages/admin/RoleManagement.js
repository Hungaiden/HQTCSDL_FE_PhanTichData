"use client"

import { useState } from "react"
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa"
import RoleFormModal from "../../components/roles/RoleFormModal"
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal"
import "../../styles/pages/roleManagement.scss"

// Sample role data
const initialRoles = [
  {
    id: 1,
    name: "Quản trị viên",
    description: "Toàn quyền truy cập tất cả tính năng",
    permissions: {
      dashboard: { view: true },
      products: { view: true, create: true, edit: true, delete: true },
      users: { view: true, create: true, edit: true, delete: true },
      roles: { view: true, create: true, edit: true, delete: true },
      orders: { view: true, process: true, cancel: true },
      statistics: { view: true },
    },
    userCount: 2,
  },
  {
    id: 2,
    name: "Quản lý",
    description: "Có thể quản lý sản phẩm và xem người dùng",
    permissions: {
      dashboard: { view: true },
      products: { view: true, create: true, edit: true, delete: false },
      users: { view: true, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
      orders: { view: true, process: true, cancel: false },
      statistics: { view: true },
    },
    userCount: 3,
  },
  {
    id: 3,
    name: "Khách hàng",
    description: "Tài khoản khách hàng thông thường",
    permissions: {
      dashboard: { view: false },
      products: { view: false, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
      orders: { view: false, process: false, cancel: false },
      statistics: { view: false },
    },
    userCount: 120,
  },
  {
    id: 4,
    name: "Nhân viên bán hàng",
    description: "Có thể xem và xử lý đơn hàng",
    permissions: {
      dashboard: { view: true },
      products: { view: true, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
      orders: { view: true, process: true, cancel: true },
      statistics: { view: false },
    },
    userCount: 8,
  },
  {
    id: 5,
    name: "Nhân viên kho",
    description: "Quản lý kho và sản phẩm",
    permissions: {
      dashboard: { view: true },
      products: { view: true, create: true, edit: true, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
      orders: { view: true, process: false, cancel: false },
      statistics: { view: false },
    },
    userCount: 5,
  },
]

const RoleManagement = () => {
  const [roles, setRoles] = useState(initialRoles)
  const [searchTerm, setSearchTerm] = useState("")
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentRole, setCurrentRole] = useState(null)

  const handleAddRole = () => {
    setCurrentRole(null)
    setShowRoleModal(true)
  }

  const handleEditRole = (role) => {
    setCurrentRole(role)
    setShowRoleModal(true)
  }

  const handleDeleteClick = (role) => {
    setCurrentRole(role)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    setRoles(roles.filter((r) => r.id !== currentRole.id))
    setShowDeleteModal(false)
  }

  const handleSaveRole = (role) => {
    if (role.id) {
      // Edit existing role
      setRoles(roles.map((r) => (r.id === role.id ? role : r)))
    } else {
      // Add new role
      const newRole = {
        ...role,
        id: Math.max(...roles.map((r) => r.id)) + 1,
        userCount: 0,
      }
      setRoles([...roles, newRole])
    }
    setShowRoleModal(false)
  }

  const filteredRoles = roles.filter((role) => {
    return (
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="role-management-page">
      <div className="page-header">
        <h1>Quản lý vai trò</h1>
        <button className="btn-primary" onClick={handleAddRole}>
          <FaPlus /> Thêm vai trò mới
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm vai trò..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="roles-grid">
        {filteredRoles.map((role) => (
          <div key={role.id} className="role-card">
            <div className="role-header">
              <h3>{role.name}</h3>
              <div className="action-buttons">
                <button className="btn-icon edit" onClick={() => handleEditRole(role)}>
                  <FaEdit />
                </button>
                {role.name !== "Quản trị viên" && role.name !== "Khách hàng" && (
                  <button className="btn-icon delete" onClick={() => handleDeleteClick(role)}>
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
            <p className="role-description">{role.description}</p>
            <div className="role-users">Số người dùng: {role.userCount}</div>

            <div className="permissions-section">
              <h4>Quyền hạn</h4>
              <div className="permissions-grid">
                {Object.entries(role.permissions).map(([module, perms]) => {
                  const moduleNames = {
                    dashboard: "Tổng quan",
                    products: "Sản phẩm",
                    users: "Người dùng",
                    roles: "Vai trò",
                    orders: "Đơn hàng",
                    statistics: "Thống kê",
                  }

                  const actionNames = {
                    view: "Xem",
                    create: "Tạo mới",
                    edit: "Chỉnh sửa",
                    delete: "Xóa",
                    process: "Xử lý",
                    cancel: "Hủy",
                  }

                  return (
                    <div key={module} className="permission-module">
                      <h5>{moduleNames[module]}</h5>
                      <ul>
                        {Object.entries(perms).map(([action, allowed]) => (
                          <li key={action} className={allowed ? "allowed" : "denied"}>
                            {actionNames[action]}: {allowed ? "Có" : "Không"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showRoleModal && (
        <RoleFormModal role={currentRole} onSave={handleSaveRole} onClose={() => setShowRoleModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          title="Xóa vai trò"
          message={`Bạn có chắc chắn muốn xóa vai trò "${currentRole.name}"? Hành động này không thể hoàn tác.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  )
}

export default RoleManagement
