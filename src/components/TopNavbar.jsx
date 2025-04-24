<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./TopNavbar.css";
import SearchBar from "./SearchBar";
import { AuthContext } from "../context/AuthContext";
import { CategoryContext } from "../context/CategoryContext"; // Import CategoryContext

const TopNavbar = () => {
  const [categories, setCategories] = useState([]); // Lưu các danh mục
  const { setSelectedCategory, selectedCategory } = useContext(CategoryContext);
  const navigate = useNavigate();
  const location = useLocation();
=======
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TopNavbar.css";
import SearchBar from "./SearchBar";

const TopNavbar = () => {
  const [categories, setCategories] = useState([]);

>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

  useEffect(() => {
    fetchCategories();
  }, []);

<<<<<<< HEAD
  // Reset danh mục khi rời khỏi /market
  useEffect(() => {
    if (location.pathname !== "/market") {
      setSelectedCategory("");
    }
  }, [location.pathname]);

=======
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5133/api/category/get-categories-with-icon");
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

<<<<<<< HEAD
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate("/market"); // Chuyển đến trang market khi chọn danh mục
  };

  const isCategorySelected = (categoryName) => {
    return location.pathname === "/market" && selectedCategory === categoryName ? "active" : "";
  };

  return (
    <header className="top-navbar">
      <div className="nav-left">
        <span
          className="logo"
          onClick={() => {
            setSelectedCategory(""); // Reset danh mục
            navigate("/market");     // Quay về danh sách tất cả tin đăng
          }}
          style={{ cursor: "pointer" }}
        >
          Unimarket
        </span>

=======
  return (
    <header className="top-navbar">
      <div className="nav-left">
        <Link to="/" className="logo">Unimarket</Link>
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
        <nav className="main-menu">
          {/* Danh mục cha */}
          <div className="dropdown">
            <span className="dropdown-title">Danh mục</span>
            <div className="dropdown-content">
              {categories.map((parent) => (
                <div key={parent.id} className="parent-category">
<<<<<<< HEAD
                  <span
                    className={`parent-link ${isCategorySelected(parent.tenDanhMucCha)}`}
                    onClick={() => handleCategoryClick(parent.tenDanhMucCha)}
                  >
                    {parent.icon && <img src={parent.icon} alt="icon" className="category-icon" />}
                    {parent.tenDanhMucCha}
                  </span>

                  {parent.danhMucCon.length > 0 && (
                    <div className="sub-menu">
                      {parent.danhMucCon.map((child) => (
                        <span
                          key={child.id}
                          className={`sub-link ${isCategorySelected(child.tenDanhMucCon)}`}
                          onClick={() => handleCategoryClick(child.tenDanhMucCon)}
                        >
                          {child.tenDanhMucCon}
                        </span>
=======
                  <Link to={`/danh-muc/${parent.tenDanhMucCha}`} className="parent-link">
                    {parent.icon && <img src={parent.icon} alt="icon" className="category-icon" />}
                    {parent.tenDanhMucCha}
                  </Link>

                  {/* Danh mục con hiển thị khi hover */}
                  {parent.danhMucCon.length > 0 && (
                    <div className="sub-menu">
                      {parent.danhMucCon.map((child) => (
                        <Link key={child.id} to={`/danh-muc/${child.tenDanhMucCon}`} className="sub-link">
                          {child.tenDanhMucCon}
                        </Link>
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

<<<<<<< HEAD
          {/* Các danh mục nổi bật */}
          <button
            className={`category-button-electronics ${isCategorySelected("Đồ Điện Tử")}`}
            onClick={() => handleCategoryClick("Đồ Điện Tử")}
          >
            Đồ Điện Tử
          </button>
          <button
            className={`category-button-furniture ${isCategorySelected("Nội Thất Sinh Viên")}`}
            onClick={() => handleCategoryClick("Nội Thất Sinh Viên")}
          >
            Nội Thất Sinh Viên
          </button>
          <button
            className={`category-button-homegoods ${isCategorySelected("Đồ Gia Dụng")}`}
            onClick={() => handleCategoryClick("Đồ Gia Dụng")}
          >
            Đồ Gia Dụng
          </button>
=======
          <Link to="/do-choi-cong-nghe">Đồ Chơi Công Nghệ</Link>
          <Link to="/swap-zone">Đổi Đồ – Swap Zone</Link>
          <Link to="/do-an-uong">Ăn Uống & Đồ Bếp Mini</Link>
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
        </nav>
      </div>

      <div className="nav-search">
        <SearchBar />
      </div>

      <div className="nav-right">
<<<<<<< HEAD
        <span className="manage-post" onClick={() => navigate("/quan-ly-tin")}>Quản lý tin</span>
        <span className="post-btn" onClick={() => navigate("/dang-tin")}>ĐĂNG TIN</span>
=======
        <Link to="/quan-ly-tin" className="manage-post">Quản lý tin</Link>
        <Link to="/dang-tin" className="post-btn">ĐĂNG TIN</Link>
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
      </div>
    </header>
  );
};

<<<<<<< HEAD
export default TopNavbar;
=======
export default TopNavbar;
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
