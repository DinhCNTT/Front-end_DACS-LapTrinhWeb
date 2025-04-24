<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import TopNavbar from "../components/TopNavbar";
import BannerSlider from "../components/BannerSlider";
import CategoryList from "../components/CategoryList"; // Import component hiển thị danh mục
import TinDangDanhChoBan from "../components/TinDangDanhChoBan"; // Import component TinDangDanhChoBan
=======
import React from "react";
import TopNavbar from "../components/TopNavbar";
import BannerSlider from "../components/BannerSlider";
import CategoryList from "../components/CategoryList"; // Import component hiển thị danh mục
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

const MarketplacePage = () => {
  return (
    <div className="marketplace-page">
      {/* Thanh menu đầu trang */}
      <TopNavbar />

      {/* Banner chạy tự động */}
      <BannerSlider />

      {/* Nội dung chính */}
      <div className="main-content">

        {/* Danh sách danh mục */}
        <CategoryList />

<<<<<<< HEAD
        {/* Tin đăng dành cho bạn */}
        <TinDangDanhChoBan /> {/* Thêm tin đăng dưới danh mục */}

=======
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
        {/* Các phần khác */}
      </div>
    </div>
  );
};

export default MarketplacePage;
