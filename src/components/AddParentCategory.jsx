<<<<<<< HEAD
import { useState, useEffect } from "react"; 
import axios from "axios";
=======
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
import "./AddParentCategory.css";

const AddParentCategory = () => {
    const [tenDanhMucCha, setTenDanhMucCha] = useState("");
<<<<<<< HEAD
    const [anhDanhMucCha, setAnhDanhMucCha] = useState(null); // For image
    const [icon, setIcon] = useState(null); // For icon
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
=======
    const [anhDanhMuc, setAnhDanhMuc] = useState(null);
    const [icon, setIcon] = useState(null);
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewIcon, setPreviewIcon] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [isNameDuplicate, setIsNameDuplicate] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5133/api/admin/get-parent-categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục cha:", error);
<<<<<<< HEAD
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tenDanhMucCha.trim()) return alert("Vui lòng nhập tên danh mục!");

        const formData = new FormData();
        formData.append("tenDanhMucCha", tenDanhMucCha);
        if (anhDanhMucCha) formData.append("anhDanhMucCha", anhDanhMucCha);
        if (icon) formData.append("icon", icon);

        try {
            const res = await axios.post("http://localhost:5133/api/admin/add-parent-category", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage(res.data.message);
            setTenDanhMucCha("");
            setAnhDanhMucCha(null); // Reset image
            setIcon(null); // Reset icon
            fetchCategories();
        } catch (error) {
            setMessage(error.response?.data || "Lỗi khi thêm danh mục cha!");
=======
            toast.error("Lỗi khi tải danh sách danh mục cha");
        }
    };

    const checkCategoryExists = async (name) => {
        if (!name.trim()) return false;
        setIsChecking(true);
        try {
            const exists = categories.some(cat => 
                cat.tenDanhMucCha.toLowerCase() === name.toLowerCase()
            );
            setIsNameDuplicate(exists);
            return exists;
        } catch (error) {
            console.error("Lỗi khi kiểm tra danh mục:", error);
            return false;
        } finally {
            setIsChecking(false);
        }
    };

    const handleNameChange = async (e) => {
        const name = e.target.value;
        setTenDanhMucCha(name);
        await checkCategoryExists(name);
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

    const isFormValid = () => {
        return tenDanhMucCha.trim() && anhDanhMuc && icon && !isNameDuplicate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowErrors(true);
        
        if (!isFormValid()) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const formData = new FormData();
        formData.append("tenDanhMucCha", tenDanhMucCha);
        formData.append("anhDanhMuc", anhDanhMuc);
        formData.append("icon", icon);

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
            setIsNameDuplicate(false);
            setShowErrors(false);
            await fetchCategories();
        } catch (error) {
            console.error("Lỗi khi thêm danh mục cha:", error);
            toast.error(error.response?.data?.message || "Lỗi khi thêm danh mục cha!");
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
        }
    };

    return (
        <div className="parent-category-page-container">
            <h2 className="parent-category-title">Thêm Danh Mục Cha</h2>

<<<<<<< HEAD
            <form className="parent-category-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="tenDanhMucCha">Tên Danh Mục Cha:</label>
                    <input
                        id="tenDanhMucCha"
                        type="text"
                        placeholder="Nhập tên danh mục cha"
                        value={tenDanhMucCha}
                        onChange={(e) => setTenDanhMucCha(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="anhDanhMucCha">Chọn Ảnh Danh Mục:</label>
                    <input
                        id="anhDanhMucCha"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAnhDanhMucCha(e.target.files[0])}
                        placeholder="Chọn ảnh danh mục"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="icon">Chọn Icon:</label>
                    <input
                        id="icon"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setIcon(e.target.files[0])}
                        placeholder="Chọn icon"
                    />
                </div>

                <button className="parent-category-submit-button" type="submit">Thêm</button>
            </form>

            {message && <p className="parent-category-message">{message}</p>}
=======
            <form className="parent-category-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nhập tên danh mục cha"
                        value={tenDanhMucCha}
                        onChange={handleNameChange}
                        className={showErrors && !tenDanhMucCha.trim() ? 'error-field' : ''}
                        required
                    />
                    {isChecking && <span className="checking-message">Đang kiểm tra...</span>}
                    {isNameDuplicate && (
                        <span className="error-message">Tên danh mục đã tồn tại!</span>
                    )}
                    {showErrors && !tenDanhMucCha.trim() && (
                        <span className="error-message">Vui lòng nhập tên danh mục</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Ảnh danh mục:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className={showErrors && !anhDanhMuc ? 'error-field' : ''}
                        required
                    />
                    {previewImage && (
                        <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="image-preview"
                        />
                    )}
                    {showErrors && !anhDanhMuc && (
                        <span className="error-message">Vui lòng chọn ảnh</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Icon:</label>
                    <input
                        type="file"
                        onChange={handleIconChange}
                        accept="image/*"
                        className={showErrors && !icon ? 'error-field' : ''}
                        required
                    />
                    {previewIcon && (
                        <img 
                            src={previewIcon} 
                            alt="Icon Preview" 
                            className="icon-preview"
                        />
                    )}
                    {showErrors && !icon && (
                        <span className="error-message">Vui lòng chọn icon</span>
                    )}
                </div>

                <button 
                    className={`parent-category-submit-button ${!isFormValid() ? 'disabled-button' : ''}`}
                    type="submit"
                    disabled={!isFormValid() || isChecking}
                >
                    Thêm
                </button>
            </form>

            <ToastContainer autoClose={3000} />
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

            <div className="parent-category-list">
                <h3>Danh Mục Cha</h3>
                <ul>
                    {categories.map((cat) => (
<<<<<<< HEAD
                        <li key={cat.maDanhMucCha}>{cat.tenDanhMucCha}</li>
=======
                        <li key={cat.maDanhMucCha}>
                            <div className="category-item">
                                <span>{cat.tenDanhMucCha}</span>
                                {cat.anhDanhMuc && (
                                    <img 
                                        src={`http://localhost:5133/${cat.anhDanhMuc}`} 
                                        alt={cat.tenDanhMucCha}
                                        className="add-parent-category-image"
                                    />
                                )}
                                {cat.icon && (
                                    <img 
                                        src={`http://localhost:5133/${cat.icon}`} 
                                        alt={`${cat.tenDanhMucCha} icon`}
                                        className="add-parent-category-icon"
                                    />
                                )}
                            </div>
                        </li>
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                    ))}
                </ul>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default AddParentCategory;
=======
export default AddParentCategory;
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
