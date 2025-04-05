import React from "react";
import "./SearchBar.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="search-bar">
      {/* Phần chọn vị trí */}
      <div className="location">
        <FaMapMarkerAlt className="location-icon" />
        <span>Tp Hồ Chí Minh ▼</span>
      </div>

      {/* Ô tìm kiếm */}
      <input type="text" placeholder="Tìm kiếm sản phẩm trên Unimarket" />

      {/* Nút tìm kiếm */}
      <button className="search-btn">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
