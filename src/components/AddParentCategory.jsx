import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddParentCategory.css";

const AddParentCategory = () => {
    const [tenDanhMucCha, setTenDanhMucCha] = useState("");
    const [anhDanhMuc, setAnhDanhMuc] = useState(null);
    const [icon, setIcon] = useState(null);
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewIcon, setPreviewIcon] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5133/api/admin/get-parent-categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục cha:", error);
            toast.error("Lỗi khi tải danh sách danh mục cha");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAnhDanhMuc(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setIcon(file);
        setPreviewIcon(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!tenDanhMucCha.trim()) {
            toast.error("Vui lòng nhập tên danh mục cha!");
            return;
        }

        const formData = new FormData();
        formData.append("tenDanhMucCha", tenDanhMucCha);
        if (anhDanhMuc) formData.append("anhDanhMuc", anhDanhMuc);
        if (icon) formData.append("icon", icon);

        try {
            await axios.post("http://localhost:5133/api/admin/add-parent-category", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Thêm danh mục cha thành công!");
            setTenDanhMucCha("");
            setAnhDanhMuc(null);
            setIcon(null);
            setPreviewImage("");
            setPreviewIcon("");
            fetchCategories();
        } catch (error) {
            console.error("Lỗi khi thêm danh mục cha:", error);
            toast.error(error.response?.data?.message || "Lỗi khi thêm danh mục cha!");
        }
    };

    return (
        <div className="parent-category-page-container">
            <h2 className="parent-category-title">Thêm Danh Mục Cha</h2>

            <form className="parent-category-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nhập tên danh mục cha"
                        value={tenDanhMucCha}
                        onChange={(e) => setTenDanhMucCha(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Ảnh danh mục:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {previewImage && (
                        <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="image-preview"
                        />
                    )}
                </div>

                <div className="form-group">
                    <label>Icon:</label>
                    <input
                        type="file"
                        onChange={handleIconChange}
                        accept="image/*"
                    />
                    {previewIcon && (
                        <img 
                            src={previewIcon} 
                            alt="Icon Preview" 
                            className="icon-preview"
                        />
                    )}
                </div>

                <button className="parent-category-submit-button" type="submit">
                    Thêm
                </button>
            </form>

            <ToastContainer autoClose={3000} />

            <div className="parent-category-list">
                <h3>Danh Mục Cha</h3>
                <ul>
                    {categories.map((cat) => (
                        <li key={cat.maDanhMucCha}>
                            <div className="category-item">
                                <span>{cat.tenDanhMucCha}</span>
                                {cat.anhDanhMuc && (
                                    <img 
                                        src={`http://localhost:5133/${cat.anhDanhMuc}`} 
                                        alt={cat.tenDanhMucCha}
                                        className="category-image"
                                    />
                                )}
                                {cat.icon && (
                                    <img 
                                        src={`http://localhost:5133/${cat.icon}`} 
                                        alt={`${cat.tenDanhMucCha} icon`}
                                        className="category-icon"
                                    />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddParentCategory;