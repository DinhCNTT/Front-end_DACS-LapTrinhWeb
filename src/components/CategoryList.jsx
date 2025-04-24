<<<<<<< HEAD
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./CategoryList.css";
import { CategoryContext } from "../context/CategoryContext"; // Import CategoryContext

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const placeholderImage = "https://dummyimage.com/150"; // Ảnh mặc định
  const { setSelectedCategory } = useContext(CategoryContext); // Lấy setSelectedCategory từ context
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryList.css";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const placeholderImage = "https://dummyimage.com/150"; // Ảnh mặc định
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5133/api/category");

        // Sử dụng ảnh trả về từ API, kết hợp baseUrl với đường dẫn ảnh
        const fixedCategories = response.data.map((category) => ({
          tenDanhMucCha: category.tenDanhMucCha,
          anhDanhMuc: category.anhDanhMucCha
            ? `http://localhost:5133${category.anhDanhMucCha}` // Kết hợp baseUrl với ảnh
            : placeholderImage, // Nếu không có ảnh, dùng ảnh mặc định
        }));

        setCategories(fixedCategories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

<<<<<<< HEAD
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName); // Cập nhật danh mục khi nhấn
  };

=======
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
  return (
    <div className="category-container">
      <h2 className="category-title">Khám phá danh mục</h2>
      <ul className="category-grid">
        {categories.map((category, index) => (
<<<<<<< HEAD
          <li key={index} className="category-item">
=======
          <li key={index} className="category-list-item">
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
            <img
              src={category.anhDanhMuc}
              alt={category.tenDanhMucCha}
              className="category-image"
<<<<<<< HEAD
              onClick={() => handleCategoryClick(category.tenDanhMucCha)} // Khi nhấn vào, cập nhật danh mục
=======
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImage;
              }}
            />
            <p className="category-name">{category.tenDanhMucCha}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

<<<<<<< HEAD
export default CategoryList;
=======
export default CategoryList;
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
