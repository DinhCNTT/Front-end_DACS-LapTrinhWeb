import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TopNavbar.css";
import SearchBar from "./SearchBar";

const TopNavbar = () => {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5133/api/category/get-categories-with-icon");
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  return (
    <header className="top-navbar">
      <div className="nav-left">
        <Link to="/" className="logo">Unimarket</Link>
        <nav className="main-menu">
          {/* Danh mục cha */}
          <div className="dropdown">
            <span className="dropdown-title">Danh mục</span>
            <div className="dropdown-content">
              {categories.map((parent) => (
                <div key={parent.id} className="parent-category">
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
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link to="/do-choi-cong-nghe">Đồ Chơi Công Nghệ</Link>
          <Link to="/swap-zone">Đổi Đồ – Swap Zone</Link>
          <Link to="/do-an-uong">Ăn Uống & Đồ Bếp Mini</Link>
        </nav>
      </div>

      <div className="nav-search">
        <SearchBar />
      </div>

      <div className="nav-right">
        <Link to="/quan-ly-tin" className="manage-post">Quản lý tin</Link>
        <Link to="/dang-tin" className="post-btn">ĐĂNG TIN</Link>
      </div>
    </header>
  );
};

export default TopNavbar;