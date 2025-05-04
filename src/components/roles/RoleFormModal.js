"use client"

import { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles/components/modal.scss"
import "../../styles/components/roleForm.scss"

const RoleFormModal = ({ role, onSave, onClose }) => {
  const initialPermissions = {
    dashboard: { view: false },
    products: { view: false, create: false, edit: false, delete: false },
    users: { view: false, create: false, edit: false, delete: false },
    roles: { view: false, create: false, edit: false, delete: false },
    orders: { view: false, process: false, cancel: false },
    statistics: { view: false },
  }

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    permissions: initialPermissions,
  })

  useEffect(() => {
    if (role) {
      setFormData({
        id: role.id,
        name: role.name,
        description: role.description,
        permissions: { ...role.permissions },
      })
    }
  }, [role])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePermissionChange = (module, action, checked) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [module]: {
          ...formData.permissions[module],
          [action]: checked,
        },
      },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container role-modal">
        <div className="modal-header">
          <h2>{role ? "Edit Role" : "Add New Role"}</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="role-form">
          <div className="form-group">
            <label htmlFor="name">Role Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="permissions-section">
            <h3>Permissions</h3>

            <div className="permissions-table">
              <table>
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>View</th>
                    <th>Create</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Other</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dashboard</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.dashboard.view}
                        onChange={(e) => handlePermissionChange("dashboard", "view", e.target.checked)}
                      />
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td>Products</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.products.view}
                        onChange={(e) => handlePermissionChange("products", "view", e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.products.create}
                        onChange={(e) => handlePermissionChange("products", "create", e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.products.edit}
                        onChange={(e) => handlePermissionChange("products", "edit", e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.products.delete}
                        onChange={(e) => handlePermissionChange("products", "delete", e.target.checked)}
                      />
                    </td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td>Users</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.users.view}
                        onChange={(e) => handlePermissionChange("users", "view", e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.users.create}
                        onChange={(e) => handlePermissionChange("users", "create", e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.users.edit}
                        onChange={(e) => handlePermissionChange("users", "edit", e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.users.delete}
                        onChange={(e) => handlePermissionChange("users", "delete", e.target.checked)}
                      />
                    </td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td>Roles</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.roles.view}
                        onChange={(e) => handlePermissionChange("roles", "view", e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.roles.create}
                        onChange={(e) => handlePermissionChange("roles", "create", e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.roles.edit}
                        onChange={(e) => handlePermissionChange("roles", "edit", e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.roles.delete}
                        onChange={(e) => handlePermissionChange("roles", "delete", e.target.checked)}
                      />
                    </td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td>Orders</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.orders.view}
                        onChange={(e) => handlePermissionChange("orders", "view", e.target.checked)}
                      />
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <div className="other-permissions">
                        <label>
                          <input
                            type="checkbox"
                            checked={formData.permissions.orders.process}
                            onChange={(e) => handlePermissionChange("orders", "process", e.target.checked)}
                          />
                          Process
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={formData.permissions.orders.cancel}
                            onChange={(e) => handlePermissionChange("orders", "cancel", e.target.checked)}
                          />
                          Cancel
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>Statistics</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.permissions.statistics.view}
                        onChange={(e) => handlePermissionChange("statistics", "view", e.target.checked)}
                      />
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {role ? "Update Role" : "Add Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RoleFormModal
