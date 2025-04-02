import React from "react";
import TopNavbar from "../components/TopNavbar";
import BannerSlider from "../components/BannerSlider";
import CategoryList from "../components/CategoryList"; // Import component hiển thị danh mục

const MarketplacePage = () => {
  return (
    <div className="marketplace-page">
      {/* Thanh menu đầu trang */}
      <TopNavbar />

      {/* Banner chạy tự động */}
      <BannerSlider />

      {/* Nội dung chính */}
      <div className="main-content">
        <h2>Danh Mục Sản Phẩm</h2>

        {/* Danh sách danh mục */}
        <CategoryList />

        {/* Các phần khác */}
      </div>
    </div>
  );
};

export default MarketplacePage;
