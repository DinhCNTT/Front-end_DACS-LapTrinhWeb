import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNavbar from "../components/TopNavbar";
import "./PostForm.css";

const PostForm = () => {
  const [categories, setCategories] = useState([]); // Danh mục cha
  const [currentSubCategories, setCurrentSubCategories] = useState([]); // Danh mục con hiện tại
  const [modalVisible, setModalVisible] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([]); // Lưu breadcrumb (đường dẫn danh mục)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5133/api/category/get-categories-with-icon");
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setCurrentSubCategories([]);
    setBreadcrumb([]);
  };

  const handleCategorySelect = (category) => {
    if (category.danhMucCon?.length > 0) {
      setCurrentSubCategories(category.danhMucCon);
      setBreadcrumb([...breadcrumb, category]);
    } else {
      setModalVisible(false); // Đóng modal khi chọn xong danh mục con
    }
  };

  const handleBack = () => {
    if (breadcrumb.length > 0) {
      const newBreadcrumb = [...breadcrumb];
      newBreadcrumb.pop();
      setBreadcrumb(newBreadcrumb);
      setCurrentSubCategories(newBreadcrumb.length > 0 ? newBreadcrumb[newBreadcrumb.length - 1].danhMucCon : categories);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("custom-modal")) {
      setModalVisible(false);
    }
  };

  return (
    <div>
      <TopNavbar />
      <div className="custom-category-section">
        <h2>Danh Mục</h2>
        <div
          className="custom-category-header"
          onClick={toggleModal}
        >
          <h3>Chọn Danh Mục</h3> {/* Nút luôn hiển thị "Chọn Danh Mục" */}
        </div>

        {modalVisible && (
          <div className="custom-modal active" onClick={handleOutsideClick}>
            <div className="custom-modal-content">
              {breadcrumb.length > 0 && (
                <button className="custom-back-btn" onClick={handleBack}>
                  ← Quay lại
                </button>
              )}
              <h3>
                {breadcrumb.length > 0
                  ? breadcrumb[breadcrumb.length - 1].tenDanhMucCha
                  : "Chọn Danh Mục"}
              </h3>

              <div className="custom-category-grid">
                {(currentSubCategories.length > 0
                  ? currentSubCategories
                  : categories
                ).map((category) => (
                  <div
                    key={category.id}
                    className="custom-category-item"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.icon && (
                      <img
                        src={category.icon}
                        alt={category.tenDanhMucCha || category.tenDanhMucCon}
                        className="custom-category-icon"
                      />
                    )}
                    <h3>
                      {category.tenDanhMucCon || category.tenDanhMucCha}
                    </h3>
                    {category.danhMucCon?.length > 0 && (
                      <span className="custom-arrow">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostForm; 