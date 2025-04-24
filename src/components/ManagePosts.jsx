import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManagePosts.css"; // Đảm bảo bạn đã tạo file CSS này để định dạng giao diện

const ManagePosts = () => {
<<<<<<< HEAD
    const [posts, setPosts] = useState([]);  // Tất cả tin đăng
    const [displayedPosts, setDisplayedPosts] = useState([]);  // Tin đăng hiển thị cho trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
    const [totalPages, setTotalPages] = useState(0);  // Tổng số trang
    const postsPerPage = 4;  // Số tin đăng mỗi trang

    // Lấy danh sách tin đăng khi component được mount
    useEffect(() => {
        axios.get('http://localhost:5133/api/tindang/get-posts-admin') // Đảm bảo đường dẫn API chính xác
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setPosts(data); // Lưu tất cả tin đăng vào state
                    setTotalPages(Math.ceil(data.length / postsPerPage));  // Tính tổng số trang
                    updateDisplayedPosts(data, currentPage);  // Cập nhật tin đăng hiển thị cho trang đầu tiên
=======
    const [posts, setPosts] = useState([]);

    // Lấy danh sách tin đăng khi component được mount
    useEffect(() => {
        axios.get('http://localhost:5133/api/admin/get-posts') // Đảm bảo đường dẫn API chính xác
            .then(response => {
                console.log(response.data); // Kiểm tra dữ liệu API
                const data = response.data;
                if (Array.isArray(data)) {
                    setPosts(data); // Lưu tin đăng vào state nếu là mảng
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                } else {
                    console.error("Dữ liệu không phải là mảng");
                }
            })
            .catch(error => {
                console.error("Lỗi khi tải tin đăng", error);
            });
<<<<<<< HEAD
    }, []); // Chạy khi component mount

    // Cập nhật tin đăng hiển thị cho trang hiện tại
    const updateDisplayedPosts = (posts, currentPage) => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        setDisplayedPosts(posts.slice(startIndex, endIndex));  // Cắt mảng để lấy tin đăng của trang hiện tại
    };

    // Hàm chuyển trang
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);  // Cập nhật trang hiện tại
            updateDisplayedPosts(posts, pageNumber);  // Cập nhật tin đăng hiển thị cho trang mới
        }
    };
=======
    }, []);
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

    // Duyệt tin đăng
    const handleApprove = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5133/api/admin/approve-post/${id}`);
            alert(response.data.message); // Hiển thị thông báo từ backend
            setPosts(posts.map(post => post.maTinDang === id ? { ...post, trangThai: 1 } : post)); // Cập nhật lại trạng thái tin đăng trong giao diện
        } catch (error) {
            alert("Có lỗi khi duyệt tin đăng!");
            console.error(error);
        }
    };

    // Từ chối tin đăng
    const handleReject = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5133/api/admin/reject-post/${id}`);
            alert(response.data.message); // Hiển thị thông báo từ backend
            setPosts(posts.map(post => post.maTinDang === id ? { ...post, trangThai: 2 } : post)); // Cập nhật lại trạng thái tin đăng trong giao diện
        } catch (error) {
            alert("Có lỗi khi từ chối tin đăng!");
            console.error(error);
        }
    };

    return (
        <div className="manage-posts-container">
            <h2 className="manage-posts-title">Quản Lý Tin Đăng</h2>
            <table className="manage-posts-table">
                <thead>
                    <tr>
<<<<<<< HEAD
                        <th className="id-column">ID</th>
                        <th className="title-column">Tiêu Đề</th>
                        <th className="location-column">Tỉnh Thành</th>
                        <th className="district-column">Quận Huyện</th>
                        <th className="seller-column">Người Bán</th>
                        <th className="date-column">Ngày Đăng</th>
                        <th className="price-column">Giá</th>
                        <th className="description-column">Mô Tả</th>
                        <th className="image-column">Hình Ảnh</th>
                        <th className="status-column">Trạng Thái</th>
                        <th className="action-column">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(displayedPosts) && displayedPosts.length > 0 ? (
                        displayedPosts.map(post => (
                            <tr key={post.maTinDang}>
                                <td className="id-column">{post.maTinDang}</td>
                                <td className="title-column">{post.tieuDe}</td>
                                <td className="location-column">{post.tinhThanh}</td>
                                <td className="district-column">{post.quanHuyen}</td>
                                <td className="seller-column">{post.nguoiBan}</td>
                                <td className="date-column">{new Date(post.ngayDang).toLocaleDateString()}</td>
                                <td className="price-column">{post.gia}</td>
                                <td className="description-column">{post.moTa}</td>
                                <td className="image-column">
                                    {post.hinhAnh && post.hinhAnh.length > 0 ? (
                                        post.hinhAnh.map((imgUrl, index) => (
                                            <img 
                                                key={index} 
                                                src={`http://localhost:5133/${imgUrl}`}  
                                                alt={`Image ${index + 1}`} 
                                                className="post-image"
                                            />
                                        ))
                                    ) : (
                                        <span>Không có ảnh</span>
                                    )}
                                </td>
=======
                        <th>ID</th>
                        <th>Tiêu Đề</th>
                        <th>Tỉnh Thành</th> {/* Cột Tỉnh Thành */}
                        <th>Quận Huyện</th> {/* Cột Quận Huyện */}
                        <th>Người Bán</th> {/* Cột Người Bán */}
                        <th>Ngày Đăng</th> {/* Cột Ngày Đăng */}
                        <th>Trạng Thái</th> {/* Cột Trạng Thái (chuyển xuống trước Thao Tác) */}
                        <th>Thao Tác</th> {/* Cột Thao Tác */}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts.map(post => (
                            <tr key={post.maTinDang}>
                                <td>{post.maTinDang}</td>
                                <td>{post.tieuDe}</td>
                                <td>{post.tinhThanh}</td> {/* Hiển thị tên Tỉnh Thành */}
                                <td>{post.quanHuyen}</td> {/* Hiển thị tên Quận Huyện */}
                                <td>{post.nguoiBan}</td> {/* Hiển thị tên Người Bán */}
                                <td>{new Date(post.ngayDang).toLocaleDateString()}</td> {/* Hiển thị Ngày Đăng */}
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                                <td className={`manage-posts-status-${post.trangThai}`}>
                                    {post.trangThai === 1
                                        ? "Đã duyệt"
                                        : post.trangThai === 2
                                        ? "Đã từ chối"
                                        : "Chờ duyệt"
                                    }
<<<<<<< HEAD
                                </td>
                                <td className="action-column">
                                    <button
                                        className="manage-posts-approve-btn"
                                        onClick={() => handleApprove(post.maTinDang)}
                                        disabled={post.trangThai !== 0}
=======
                                </td> {/* Hiển thị trạng thái */}
                                <td>
                                    <button
                                        className="manage-posts-approve-btn"
                                        onClick={() => handleApprove(post.maTinDang)}
                                        disabled={post.trangThai !== 0}  // Disabled nếu trạng thái không phải là "Chờ duyệt"
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                                    >
                                        Duyệt
                                    </button>
                                    <button
                                        className="manage-posts-reject-btn"
                                        onClick={() => handleReject(post.maTinDang)}
<<<<<<< HEAD
                                        disabled={post.trangThai !== 0}
=======
                                        disabled={post.trangThai !== 0}  // Disabled nếu trạng thái không phải là "Chờ duyệt"
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                                    >
                                        Từ Chối
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
<<<<<<< HEAD
                            <td colSpan="11" className="manage-posts-no-data-message">Không có tin đăng nào để hiển thị.</td>
=======
                            <td colSpan="8" className="manage-posts-no-data-message">Không có tin đăng nào để hiển thị.</td>
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                        </tr>
                    )}
                </tbody>
            </table>
<<<<<<< HEAD
            
            {/* Phân trang */}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Trước</button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Sau</button>
            </div>
=======
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
        </div>
    );
};

<<<<<<< HEAD
export default ManagePosts
=======
export default ManagePosts;
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
