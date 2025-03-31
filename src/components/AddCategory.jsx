import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import "./AddCategory.css";

const AddCategory = () => {
    const [tenDanhMuc, setTenDanhMuc] = useState("");
    const [anhDanhMuc, setAnhDanhMuc] = useState(null);
    const [icon, setIcon] = useState(null);
    const [maDanhMucCha, setMaDanhMucCha] = useState("");
    const [parentCategories, setParentCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5133/api/admin/get-parent-categories")
            .then((response) => {
                console.log("Dữ liệu danh mục cha nhận được:", response.data);
                setParentCategories(response.data);
            })
            .catch((error) => console.error("Lỗi khi lấy danh mục cha:", error));
    }, []);

    const handleImageChange = (e) => {
        setAnhDanhMuc(e.target.files[0]);
    };

    const handleIconChange = (e) => {
        setIcon(e.target.files[0]);
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
        if (anhDanhMuc) formData.append("anhDanhMuc", anhDanhMuc);
        if (icon) formData.append("icon", icon);

        try {
            await axios.post("http://localhost:5133/api/admin/add-category", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Hiển thị thông báo thành công nhưng KHÔNG chuyển trang
            toast.success("✅ Thêm danh mục thành công!");

            // Xóa dữ liệu trên form sau khi thêm thành công
            setTenDanhMuc("");
            setAnhDanhMuc(null);
            setIcon(null);
            setMaDanhMucCha("");
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
                    <label>Ảnh danh mục:</label>
                    <input 
                        type="file" 
                        onChange={handleImageChange} 
                        accept="image/*" 
                    />
                    {anhDanhMuc && (
                        <img 
                            src={URL.createObjectURL(anhDanhMuc)} 
                            alt="Preview" 
                            style={{ width: '100px', marginTop: '10px' }} 
                        />
                    )}
                </div>

                <div className="category-form-group">
                    <label>Icon:</label>
                    <input 
                        type="file" 
                        onChange={handleIconChange} 
                        accept="image/*" 
                    />
                    {icon && (
                        <img 
                            src={URL.createObjectURL(icon)} 
                            alt="Icon Preview" 
                            style={{ width: '50px', marginTop: '10px' }} 
                        />
                    )}
                </div>

                <div className="category-form-group">
                    <label>Danh mục cha:</label>
                    <select 
                        value={maDanhMucCha} 
                        onChange={(e) => setMaDanhMucCha(e.target.value)}
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

                <button type="submit" className="category-submit-button">
                    Thêm Danh Mục
                </button>
            </form>
            <ToastContainer autoClose={3000} />
        </div>
    );
};

export default AddCategory;
