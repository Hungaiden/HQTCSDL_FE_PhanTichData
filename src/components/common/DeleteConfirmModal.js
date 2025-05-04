"use client"
import { FaTimes, FaExclamationTriangle } from "react-icons/fa"
import "../../styles/components/modal.scss"
import "../../styles/components/deleteConfirmModal.scss"

const DeleteConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container delete-modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onCancel}>
            <FaTimes />
          </button>
        </div>

        <div className="delete-content">
          <div className="warning-icon">
            <FaExclamationTriangle />
          </div>
          <p>{message}</p>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
