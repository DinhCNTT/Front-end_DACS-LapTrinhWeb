import { useState, useEffect } from "react";
import axios from "axios";
import "./AddParentCategory.css";
const AddParentCategory = () => {
    const [tenDanhMucCha, setTenDanhMucCha] = useState("");
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5133/api/admin/get-parent-categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục cha:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tenDanhMucCha.trim()) return alert("Vui lòng nhập tên danh mục!");

        try {
            const res = await axios.post("http://localhost:5133/api/admin/add-parent-category", { tenDanhMucCha });
            setMessage(res.data.message);
            setTenDanhMucCha("");
            fetchCategories();
        } catch (error) {
            setMessage(error.response?.data || "Lỗi khi thêm danh mục cha!");
        }
    };

    return (
        <div className="parent-category-page-container">
            <h2 className="parent-category-title">Thêm Danh Mục Cha</h2>

            <form className="parent-category-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nhập tên danh mục cha"
                    value={tenDanhMucCha}
                    onChange={(e) => setTenDanhMucCha(e.target.value)}
                    required
                />
                <button className="parent-category-submit-button" type="submit">Thêm</button>
            </form>

            {message && <p className="parent-category-message">{message}</p>}

            <div className="parent-category-list">
                <h3>Danh Mục Cha</h3>
                <ul>
                    {categories.map((cat) => (
                        <li key={cat.maDanhMucCha}>{cat.tenDanhMucCha}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddParentCategory;
