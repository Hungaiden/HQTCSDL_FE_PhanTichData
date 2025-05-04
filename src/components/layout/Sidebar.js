import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaTshirt,
  FaUsers,
  FaUsersCog,
  FaSignOutAlt,
  FaBox,
  FaList,
} from "react-icons/fa";
import "../../styles/layout/sidebar.scss";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2> Thời Trang Việt </h2>{" "}
      </div>{" "}
      <div className="sidebar-menu">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaHome /> <span> Tổng quan </span>{" "}
        </NavLink>{" "}
        <NavLink
          to="/admin/statistics"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaChartBar /> <span> Thống kê </span>{" "}
        </NavLink>{" "}
        <NavLink
          to="/admin/categories"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaList /> <span> Quản lý danh mục </span>{" "}
        </NavLink>{" "}
        <NavLink
          to="/admin/products"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaTshirt /> <span> Quản lý sản phẩm </span>{" "}
        </NavLink>{" "}
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaUsers /> <span> Quản lý người dùng </span>{" "}
        </NavLink>{" "}
        <NavLink
          to="/admin/roles"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaUsersCog /> <span> Quản lý vai trò </span>{" "}
        </NavLink>{" "}
      </div>{" "}
      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt /> <span> Đăng xuất </span>{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};

export default Sidebar;
