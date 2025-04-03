import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManagePosts.css"; // Đảm bảo bạn đã tạo file CSS này để định dạng giao diện

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);

    // Lấy danh sách tin đăng khi component được mount
    useEffect(() => {
        axios.get('http://localhost:5133/api/admin/get-posts') // Đảm bảo đường dẫn API chính xác
            .then(response => {
                console.log(response.data); // Kiểm tra dữ liệu API
                const data = response.data;
                if (Array.isArray(data)) {
                    setPosts(data); // Lưu tin đăng vào state nếu là mảng
                } else {
                    console.error("Dữ liệu không phải là mảng");
                }
            })
            .catch(error => {
                console.error("Lỗi khi tải tin đăng", error);
            });
    }, []);

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
                                <td className={`manage-posts-status-${post.trangThai}`}>
                                    {post.trangThai === 1
                                        ? "Đã duyệt"
                                        : post.trangThai === 2
                                        ? "Đã từ chối"
                                        : "Chờ duyệt"
                                    }
                                </td> {/* Hiển thị trạng thái */}
                                <td>
                                    <button
                                        className="manage-posts-approve-btn"
                                        onClick={() => handleApprove(post.maTinDang)}
                                        disabled={post.trangThai !== 0}  // Disabled nếu trạng thái không phải là "Chờ duyệt"
                                    >
                                        Duyệt
                                    </button>
                                    <button
                                        className="manage-posts-reject-btn"
                                        onClick={() => handleReject(post.maTinDang)}
                                        disabled={post.trangThai !== 0}  // Disabled nếu trạng thái không phải là "Chờ duyệt"
                                    >
                                        Từ Chối
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="manage-posts-no-data-message">Không có tin đăng nào để hiển thị.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManagePosts;
