import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageParentCategories.css";

const ManageParentCategories = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newName, setNewName] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [newIcon, setNewIcon] = useState(null);
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

    const handleEdit = (category) => {
        setEditingCategory(category);
        setNewName(category.tenDanhMucCha);
        setPreviewImage(category.anhDanhMuc ? `http://localhost:5133/${category.anhDanhMuc}` : "");
        setPreviewIcon(category.icon ? `http://localhost:5133/${category.icon}` : "");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setNewIcon(file);
        setPreviewIcon(URL.createObjectURL(file));
    };

    const handleUpdate = async () => {
        if (!newName.trim()) {
            toast.error("Vui lòng nhập tên danh mục!");
            return;
        }
    
        const formData = new FormData();
        formData.append("tenDanhMucCha", newName);
        if (newImage) formData.append("anhDanhMuc", newImage);
        if (newIcon) formData.append("icon", newIcon);
    
        try {
            const response = await axios.put(
                `http://localhost:5133/api/admin/update-parent-category/${editingCategory.maDanhMucCha}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("token")}` // Thêm token nếu cần
                    }
                }
            );
            console.log("Response:", response.data); // Debug
            toast.success("Cập nhật danh mục cha thành công!"); // Hiển thị thông báo thành công
            fetchCategories(); // Gọi lại để cập nhật danh sách danh mục
        } catch (error) {
            console.error("Chi tiết lỗi:", {
                message: error.message,
                response: error.response?.data
            });
            toast.error(error.response?.data?.message || "Lỗi khi cập nhật");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
    
        try {
            await axios.delete(`http://localhost:5133/api/admin/delete-parent-category/${id}`);
            toast.success("Xóa danh mục cha thành công!");
            fetchCategories();
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
            // Kiểm tra xem phản hồi có tồn tại không
            if (error.response) {
                console.log("Phản hồi từ API:", error.response.data); // Debug
                toast.error(error.response.data.message || "Lỗi khi xóa danh mục cha!");
            } else {
                toast.error("Lỗi không xác định!");
            }
        }
    };

    return (
        <div className="parent-category-page-container">
            <h2>Quản Lý Danh Mục Cha</h2>
            <ToastContainer autoClose={3000} />

            <table className="parent-category-table">
                <thead>
                    <tr>
                        <th>Mã DM</th>
                        <th>Tên Danh Mục</th>
                        <th>Ảnh</th>
                        <th>Icon</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.maDanhMucCha}>
                            <td>{cat.maDanhMucCha}</td>
                            <td>
                                {editingCategory?.maDanhMucCha === cat.maDanhMucCha ? (
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    cat.tenDanhMucCha
                                )}
                            </td>
                            <td>
                                {editingCategory?.maDanhMucCha === cat.maDanhMucCha ? (
                                    <div className="file-upload">
                                        <input type="file" onChange={handleImageChange} />
                                        {previewImage && (
                                            <img src={previewImage} alt="Preview" className="image-preview" />
                                        )}
                                    </div>
                                ) : (
                                    cat.anhDanhMuc && (
                                        <img 
                                            src={`http://localhost:5133/${cat.anhDanhMuc}`} 
                                            alt="Ảnh DM" 
                                            className="category-image" 
                                        />
                                    )
                                )}
                            </td>
                            <td>
                                {editingCategory?.maDanhMucCha === cat.maDanhMucCha ? (
                                    <div className="file-upload">
                                        <input type="file" onChange={handleIconChange} />
                                        {previewIcon && (
                                            <img src={previewIcon} alt="Icon Preview" className="icon-preview" />
                                        )}
                                    </div>
                                ) : (
                                    cat.icon && (
                                        <img 
                                            src={`http://localhost:5133/${cat.icon}`} 
                                            alt="Icon DM" 
                                            className="category-icon" 
                                        />
                                    )
                                )}
                            </td>
                            <td>
                                {editingCategory?.maDanhMucCha === cat.maDanhMucCha ? (
                                    <>
                                        <button className="save-btn" onClick={handleUpdate}>
                                            💾 Lưu
                                        </button>
                                        <button className="cancel-btn" onClick={() => setEditingCategory(null)}>
                                            ❌ Hủy
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-btn" onClick={() => handleEdit(cat)}>
                                            ✏️ Sửa
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(cat.maDanhMucCha)}>
                                            🗑️ Xóa
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageParentCategories;