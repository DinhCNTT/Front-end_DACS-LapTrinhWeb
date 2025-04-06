import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManagePosts.css"; // Đảm bảo bạn đã tạo file CSS này để định dạng giao diện

const ManagePosts = () => {
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
                } else {
                    console.error("Dữ liệu không phải là mảng");
                }
            })
            .catch(error => {
                console.error("Lỗi khi tải tin đăng", error);
            });
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
                                <td className={`manage-posts-status-${post.trangThai}`}>
                                    {post.trangThai === 1
                                        ? "Đã duyệt"
                                        : post.trangThai === 2
                                        ? "Đã từ chối"
                                        : "Chờ duyệt"
                                    }
                                </td>
                                <td className="action-column">
                                    <button
                                        className="manage-posts-approve-btn"
                                        onClick={() => handleApprove(post.maTinDang)}
                                        disabled={post.trangThai !== 0}
                                    >
                                        Duyệt
                                    </button>
                                    <button
                                        className="manage-posts-reject-btn"
                                        onClick={() => handleReject(post.maTinDang)}
                                        disabled={post.trangThai !== 0}
                                    >
                                        Từ Chối
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="manage-posts-no-data-message">Không có tin đăng nào để hiển thị.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {/* Phân trang */}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Trước</button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Sau</button>
            </div>
        </div>
    );
};

export default ManagePosts
