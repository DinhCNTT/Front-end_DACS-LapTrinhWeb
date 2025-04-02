import React from "react";
import "./TopNavbar.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"; // Import SearchBar

const TopNavbar = () => {
  return (
    <header className="top-navbar">
      {/* Phần 1: Logo và menu chính */}
      <div className="nav-left">
        <Link to="/" className="logo">Unimarket</Link>
        <nav className="main-menu">
        <nav className="main-menu">
        <Link to="/do-choi-cong-nghe">Đồ Chơi Công Nghệ</Link>
        <Link to="/swap-zone">Đổi Đồ – Swap Zone</Link>
        <Link to="/do-an-uong">Ăn Uống & Đồ Bếp Mini</Link>
        </nav>

        </nav>
      </div>

      {/* Phần 2: Thanh tìm kiếm */}
      <div className="nav-search">
        <SearchBar />
      </div>

      {/* Phần 3: Menu bên phải */}
      <div className="nav-right">
        <Link to="/quan-ly-tin" className="manage-post">Quản lý tin</Link>
        <button className="post-btn">ĐĂNG TIN</button>
      </div>
    </header>
  );
};

export default TopNavbar;
