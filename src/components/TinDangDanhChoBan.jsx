import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios để lấy dữ liệu từ API
import "./TinDangDanhChoBan.css";

const TinDangDanhChoBan = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(25); // Hiển thị 5 hàng, mỗi hàng 5 tin đăng

  useEffect(() => {
    // Lấy dữ liệu từ API khi component mount
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5133/api/tindang/get-posts");
        setPosts(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi lấy tin đăng:", error);
      }
    };

    fetchPosts();
  }, []); // Chạy một lần khi component mount

  const handleShowMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 25); // Mỗi lần nhấn "Xem thêm" sẽ thêm 25 bài đăng
  };

  return (
    <div className="tin-dang-danh-cho-ban">
      <h2>Tin Đăng Dành Cho Bạn</h2>

      {/* Hiển thị danh sách tin đăng */}
      <div className="post-list">
        {posts.length === 0 ? (
          <p>Không có tin đăng nào.</p>
        ) : (
          posts.slice(0, visiblePosts).map((post) => (  // Chỉ hiển thị số bài đăng theo visiblePosts
            <div key={post.maTinDang} className="post-item">
              {/* Phần hiển thị ảnh tin đăng */}
              <div className="post-images">
                {post.images && post.images.length > 0 ? (
                  post.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={`http://localhost:5133${image}`}  // Chỉ cần kết hợp đúng với phần đường dẫn từ API
                      alt={`Image ${index + 1}`} 
                      className="post-image" 
                    />
                  ))
                ) : (
                  <p>Không có ảnh.</p>
                )}
              </div>

              {/* Phần thông tin tin đăng */}
              <div className="post-info">
                <h3>{post.tieuDe}</h3>
                <p className="post-description">{post.moTa}</p>
                <p className="price">Giá: {post.gia} đ</p>
                <p className="post-description">Tình trạng: {post.tinhTrang}</p>
                <p className="post-description">{post.tinhThanh} - {post.quanHuyen}</p>
                {post.coTheThoaThuan && <p className="post-description">Có thể thương lượng</p>}
                <p className="post-description">Địa chỉ: {post.diaChi}</p>
                <p className="post-description">Người bán: {post.nguoiBan}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Nút "Xem thêm" */}
      {visiblePosts < posts.length && (
        <button className="xem-them-btn" onClick={handleShowMore}>
          Xem thêm
        </button>
      )}
    </div>
  );
};

export default TinDangDanhChoBan;
