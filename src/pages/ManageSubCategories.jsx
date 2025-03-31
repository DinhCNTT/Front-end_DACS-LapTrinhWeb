import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageSubCategories.css"; // Thêm CSS

const ManageSubCategories = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newName, setNewName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchSubCategories();
    }, []);

    // 📌 Lấy danh sách danh mục con từ API
    const fetchSubCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5133/api/admin/get-subcategories");
            setSubCategories(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục con:", error);
        }
    };

    // 📝 Bắt đầu chỉnh sửa danh mục con
    const handleEdit = (category) => {
        setEditingCategory(category);
        setNewName(category.tenDanhMuc);
    };

    // ✅ Lưu chỉnh sửa danh mục con
    const handleUpdate = async () => {
        if (!newName.trim()) return alert("Tên danh mục không được để trống!");

        try {
            await axios.put(`http://localhost:5133/api/admin/update-subcategory/${editingCategory.maDanhMuc}`, {
                tenDanhMuc: newName,
            });
            setMessage("Cập nhật thành công!");
            setEditingCategory(null);
            fetchSubCategories();
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            setMessage("Lỗi khi cập nhật danh mục!");
        }
    };

    // ❌ Xóa danh mục con
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;

        try {
            await axios.delete(`http://localhost:5133/api/admin/delete-subcategory/${id}`);
            setMessage("Xóa thành công!");
            fetchSubCategories();
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
            setMessage("Lỗi khi xóa danh mục!");
        }
    };

    return (
        <div className="subcategory-page-container">
            <h2>Quản Lý Danh Mục Con</h2>
            {message && <p className="message">{message}</p>}

            <table className="subcategory-table">
                <thead>
                    <tr>
                        <th>Mã Danh Mục</th>
                        <th>Tên Danh Mục</th>
                        <th>Ảnh</th>
                        <th>Icon</th>
                        <th>Danh Mục Cha</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {subCategories.map((cat) => (
                        <tr key={cat.maDanhMuc}>
                            <td>{cat.maDanhMuc}</td>
                            <td>
                                {editingCategory?.maDanhMuc === cat.maDanhMuc ? (
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                ) : (
                                    cat.tenDanhMuc
                                )}
                            </td>
                            <td><img src={cat.anhDanhMuc} alt="Ảnh" className="category-image" /></td>
                            <td><img src={cat.icon} alt="Icon" className="category-icon" /></td>
                            <td>{cat.tenDanhMucCha}</td>
                            <td>
                                {editingCategory?.maDanhMuc === cat.maDanhMuc ? (
                                    <>
                                        <button className="save-btn" onClick={handleUpdate}>💾 Lưu</button>
                                        <button className="cancel-btn" onClick={() => setEditingCategory(null)}>❌ Hủy</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-btn" onClick={() => handleEdit(cat)}>✏️ Sửa</button>
                                        <button className="delete-btn" onClick={() => handleDelete(cat.maDanhMuc)}>🗑️ Xóa</button>
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

export default ManageSubCategories;
