import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaHome, FaUserPlus, FaUsersCog, FaCogs, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { MdCategory, MdOutlinePostAdd, MdOutlineLibraryAdd, MdFolderOpen } from "react-icons/md"; 
import "./Sidebar.css";

const Sidebar = ({ onLogout }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // ✅ Lấy thông tin user từ AuthContext

    return (
        <div className="sidebar">
            {/* Ảnh đại diện bằng icon */}
            <div className="sidebar-header">
                <div className="avatar-container">
                    <FaUserCircle className="avatar-icon" />
                </div>
                <p className="welcome-text">Xin chào, {user?.fullName || "Admin"}!</p>
            </div>

            {/* Menu */}
            <ul className="sidebar-menu">
                <li onClick={() => navigate("/admin")}>
                    <a href="#"><FaHome className="menu-icon" /> <span className="menu-label">Quản Lý Người Dùng</span></a>
                </li>
                <li onClick={() => navigate("/admin/add-employee")}>
                    <a href="#"><FaUserPlus className="menu-icon" /> <span className="menu-label">Phân quyền người dùng</span></a>
                </li>
                <li onClick={() => navigate("/admin/employees")}>
                    <a href="#"><FaUsersCog className="menu-icon" /> <span className="menu-label">Quản Lý Nhân Viên</span></a>
                </li>
                <li onClick={() => navigate("/admin/add-category")}>
                    <a href="#"><MdOutlinePostAdd className="menu-icon" /> <span className="menu-label">Thêm Danh Mục</span></a>
                </li>
                <li onClick={() => navigate("/admin/manage-subcategories")}> 
                    <a href="#"><MdCategory className="menu-icon" /> <span className="menu-label">Quản Lý Danh Mục</span></a> 
                </li>
                <li onClick={() => navigate("/admin/add-parent-category")}> 
                    <a href="#"><MdOutlineLibraryAdd className="menu-icon" /> <span className="menu-label">Thêm Danh Mục Cha</span></a> 
                </li>
                <li onClick={() => navigate("/admin/manage-categories")}> 
                    <a href="#"><MdFolderOpen className="menu-icon" /> <span className="menu-label">Quản Lý Danh Mục Cha</span></a> 
                </li>
                <li>
                    <a href="#"><FaCogs className="menu-icon" /> <span className="menu-label">Cài đặt hệ thống</span></a>
                </li>
            </ul>

            {/* Nút Đăng Xuất */}
            <div className="sidebar-footer">
                <button className="logout-btn" onClick={() => {
                    console.log("👉 Nút Đăng xuất đã được nhấn!");
                    onLogout?.();
                }}>
                    <FaSignOutAlt className="menu-icon" /> <span>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
