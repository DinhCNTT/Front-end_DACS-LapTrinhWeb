import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import "./CategoryForm.css";

const API_URL = "http://localhost:5133"; // Định nghĩa base URL

const CategoryForm = () => {
    const [tenDanhMuc, setTenDanhMuc] = useState("");
    const [maDanhMucCha, setMaDanhMucCha] = useState("");
    const [parentCategories, setParentCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/admin/get-parent-categories`)
            .then((response) => {
                console.log("Dữ liệu danh mục cha nhận được:", response.data);
                setParentCategories(response.data);
            })
            .catch((error) => console.error("Lỗi khi lấy danh mục cha:", error));
    }, []);

    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        setMaDanhMucCha(selectedId);

        // Tìm danh mục cha tương ứng
        const category = parentCategories.find((cat) => cat.maDanhMucCha.toString() === selectedId);
        setSelectedCategory(category || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tenDanhMuc) {
            toast.error("❌ Vui lòng nhập tên danh mục!");
            return;
        }

        const formData = new FormData();
        formData.append("tenDanhMuc", tenDanhMuc);
        formData.append("maDanhMucCha", maDanhMucCha || null);

        try {
            await axios.post(`${API_URL}/api/admin/add-category`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("✅ Thêm danh mục thành công!");

            // Reset form
            setTenDanhMuc("");
            setMaDanhMucCha("");
            setSelectedCategory(null);
        } catch (error) {
            console.error("Lỗi khi thêm danh mục:", error);
            toast.error("❌ Thêm danh mục thất bại!");
        }
    };

    return (
        <div className="category-page-container">
            <Sidebar />
            <h2 className="category-title">Thêm Danh Mục</h2>
            <form className="category-form" onSubmit={handleSubmit}>
                <div className="category-form-group">
                    <label>Tên danh mục:</label>
                    <input 
                        type="text" 
                        value={tenDanhMuc} 
                        onChange={(e) => setTenDanhMuc(e.target.value)} 
                        required 
                    />
                </div>

                <div className="category-form-group">
                    <label>Danh mục cha:</label>
                    <select 
                        value={maDanhMucCha} 
                        onChange={handleCategoryChange}
                    >
                        <option value="">Không có</option>
                        {parentCategories.map((parent) => (
                            <option 
                                key={parent.maDanhMucCha} 
                                value={parent.maDanhMucCha}
                            >
                                {parent.tenDanhMucCha}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedCategory && (
                    <div className="selected-category-info">
                        <p><strong>Danh mục cha:</strong> {selectedCategory.tenDanhMucCha}</p>
                        {selectedCategory.anhDanhMucCha && (
                            <img 
                                src={`${API_URL}${selectedCategory.anhDanhMucCha}`} 
                                alt="Ảnh danh mục cha" 
                                className="category-image"
                                onError={(e) => { e.target.src = "/default-category.png"; }} // Ảnh mặc định nếu lỗi
                            />
                        )}
                    </div>
                )}

                <button type="submit" className="category-submit-button">
                    Thêm Danh Mục
                </button>
            </form>
            <ToastContainer autoClose={3000} />
        </div>
    );
};

export default CategoryForm;
