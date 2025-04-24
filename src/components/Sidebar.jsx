import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaHome, FaUserPlus, FaUsersCog, FaCogs, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
<<<<<<< HEAD
import "./Sidebar.css";
import { MdCategory, MdOutlinePostAdd, MdOutlineLibraryAdd, MdFolderOpen, MdPostAdd } from "react-icons/md"; // Thêm icon MdPostAdd cho mục "Quản Lý Tin Đăng"

=======
import { MdCategory, MdOutlinePostAdd, MdOutlineLibraryAdd, MdFolderOpen, MdPostAdd } from "react-icons/md"; // Thêm icon MdPostAdd cho mục "Quản Lý Tin Đăng"
import "./Sidebar.css";
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

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
<<<<<<< HEAD
                {/* ✅ Hiển thị họ tên từ user */}
=======
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                <p className="welcome-text">Xin chào, {user?.fullName || "Admin"}!</p>
            </div>

            {/* Menu */}
            <ul className="sidebar-menu">
                <li onClick={() => navigate("/admin")}>
                    <a href="#"><FaHome className="menu-icon" /> <span className="menu-label">Quản Lý Người Dùng</span></a>
                </li>
                <li onClick={() => navigate("/admin/add-employee")}>
<<<<<<< HEAD
                    <a href="#"><FaUserPlus className="menu-icon" /> <span className="menu-label">Thêm Nhân Viên</span></a>
=======
                    <a href="#"><FaUserPlus className="menu-icon" /> <span className="menu-label">Phân quyền người dùng</span></a>
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                </li>
                <li onClick={() => navigate("/admin/employees")}>
                    <a href="#"><FaUsersCog className="menu-icon" /> <span className="menu-label">Quản Lý Nhân Viên</span></a>
                </li>
<<<<<<< HEAD
                <li onClick={() => navigate("/admin/categories")}>
                <a href="#"><MdCategory className="menu-icon" /> <span className="menu-label">Thêm Danh Mục</span></a>
                </li>
                <li onClick={() => navigate("/admin/add-parent-category")}> 
                    <a href="#"><MdCategory className="menu-icon" /> <span className="menu-label">Thêm Danh Mục Cha</span></a> 
=======
                <li onClick={() => navigate("/admin/add-category")}>
                    <a href="#"><MdOutlinePostAdd className="menu-icon" /> <span className="menu-label">Thêm Danh Mục</span></a>
                </li>
                <li onClick={() => navigate("/admin/manage-subcategories")}> 
                    <a href="#"><MdCategory className="menu-icon" /> <span className="menu-label">Quản Lý Danh Mục</span></a> 
                </li>
                <li onClick={() => navigate("/admin/add-parent-category")}> 
                    <a href="#"><MdOutlineLibraryAdd className="menu-icon" /> <span className="menu-label">Thêm Danh Mục Cha</span></a> 
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                </li>
                <li onClick={() => navigate("/admin/manage-categories")}> 
                    <a href="#"><MdFolderOpen className="menu-icon" /> <span className="menu-label">Quản Lý Danh Mục Cha</span></a> 
                </li>
<<<<<<< HEAD
                
                <li onClick={() => navigate("/admin/manage-subcategories")}> 
                    <a href="#"><MdFolderOpen className="menu-icon" /> <span className="menu-label">Quản Lý Danh Mục Con</span></a> 
                </li>
=======
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                <li onClick={() => navigate("/admin/manage-posts")}> {/* Thêm mục Quản Lý Tin Đăng */}
                    <a href="#"><MdPostAdd className="menu-icon" /> <span className="menu-label">Quản Lý Tin Đăng</span></a>
                </li>
            </ul>
<<<<<<< HEAD
=======

>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
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
