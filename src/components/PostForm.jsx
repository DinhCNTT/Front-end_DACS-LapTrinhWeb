<<<<<<< HEAD
// PostForm.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNavbar from "../components/TopNavbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PostForm.css";

const PostForm = () => {
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate(); // Khởi tạo navigate
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNavbar from "../components/TopNavbar";
import "./PostForm.css";

const PostForm = () => {
  const [categories, setCategories] = useState([]); // Danh mục cha
  const [currentSubCategories, setCurrentSubCategories] = useState([]); // Danh mục con hiện tại
  const [modalVisible, setModalVisible] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([]); // Lưu breadcrumb (đường dẫn danh mục)
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5133/api/category/get-categories-with-icon");
<<<<<<< HEAD
        console.log("Dữ liệu danh mục:", res.data);

        const validCategories = res.data.map(category => ({
          ...category,
          DanhMucCon: Array.isArray(category.danhMucCon) ? category.danhMucCon.filter(sub => sub?.id) : [],
        }));
        setCategories(validCategories);
=======
        setCategories(res.data);
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
<<<<<<< HEAD

    setModalVisible(true);
=======
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
<<<<<<< HEAD
    setShowSubCategories(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSubCategories(category.DanhMucCon);
    setShowSubCategories(true);
  };

  const handleBackToCategories = () => {
    setShowSubCategories(false);
  };

  const handleSubCategorySelect = (subCategory) => {
    console.log("Danh mục con đã chọn:", subCategory.tenDanhMucCon);
    setModalVisible(false);
    setShowSubCategories(false);

    // Điều hướng đến PostTinDang với tham số danh mục con đã chọn
    navigate(`/post-tin?categoryId=${subCategory.id}&categoryName=${subCategory.tenDanhMucCon}`);
  };

  const handleClickOutside = (event) => {
    if (event.target.closest(".custom-modal-content") === null) {
=======
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
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
      setModalVisible(false);
    }
  };

  return (
    <div>
      <TopNavbar />
      <div className="custom-category-section">
<<<<<<< HEAD
        <div
          className="custom-category-header"
          onClick={toggleModal}
          style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "20px" }}
        >
          <h3>{selectedCategory ? selectedCategory.tenDanhMucCha : "Chọn Danh Mục"}</h3>
        </div>

        {modalVisible && (
          <div className="custom-modal active" onClick={handleClickOutside}>
            <div className="custom-modal-content">
              {!showSubCategories ? (
                <>
                  <h3>Chọn Danh Mục</h3>
                  <button className="close-button" onClick={toggleModal}>X</button>
                  <div className="custom-category-grid">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="custom-category-item"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category.icon && (
                          <img
                            src={category.icon}
                            alt={category.tenDanhMucCha}
                            className="custom-category-icon"
                          />
                        )}
                        <h3>{category.tenDanhMucCha}</h3>
                        <span className="custom-arrow">→</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="modal-title">Chọn Danh Mục</h3>
                  <button className="back-button" onClick={handleBackToCategories}>←</button>
                  <table className="custom-subcategory-table">
                    <tbody>
                      {subCategories.map((subCategory) => (
                        <tr key={subCategory.id}>
                          <td className="subcategory-name">{subCategory.tenDanhMucCon}</td>
                          <td>
                            <button className="button-choose" onClick={() => handleSubCategorySelect(subCategory)}>Chọn</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
=======
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
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default PostForm;
=======
export default PostForm; 
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
