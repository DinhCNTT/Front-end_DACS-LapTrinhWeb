import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./QuanLyTin.css";
import TopNavbar from "../components/TopNavbar";

const trangThaiMap = {
  0: "ChoDuyet",
  1: "DaDuyet",
  2: "TuChoi",
};

const QuanLyTin = () => {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("userFullName") || "Người dùng");
  const [activeTab, setActiveTab] = useState("DaDuyet");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axios.get(`http://localhost:5133/api/TinDang/user-info/${userId}`);
        localStorage.setItem("userFullName", res.data.fullName);
        setUserName(res.data.fullName);
      } catch (err) {
        console.error("Không thể lấy tên người dùng:", err);
      }
    };

    if (userId && !localStorage.getItem("userFullName")) {
      fetchUserName();
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5133/api/TinDang/user/${userId}`)
      .then((response) => {
        const postsWithEnum = response.data.map((post) => ({
          ...post,
          trangThaiText: trangThaiMap[post.trangThai],
          images: post.images.map(img =>
            img.startsWith("/images/Posts/") ? img : `/images/Posts/${img}`
          )
        }));
        setPosts(postsWithEnum);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy tin đăng:", error);
      });
  }, [userId]);

  const filteredPosts = posts.filter(
    (p) =>
      p.trangThaiText === activeTab &&
      (p.tieuDe?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.moTa?.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tin này không?")) return;
    try {
      await axios.delete(`http://localhost:5133/api/TinDang/${id}`);
      setPosts((prev) => prev.filter((p) => p.maTinDang !== id));
    } catch (err) {
      console.error("Xóa thất bại:", err);
    }
  };

  const handleViewDetail = (post) => {
    switch (post.trangThaiText) {
      case "DaDuyet":
        navigate(`/xem-tin/${post.maTinDang}`);
        break;
      case "ChoDuyet":
        alert("🕓 Tin của bạn đang chờ duyệt.");
        break;
      case "TuChoi":
        alert("❌ Tin của bạn đã bị từ chối.");
        break;
      default:
        break;
    }
  };

  return (
    <div className="qlt-wrapper">
      <TopNavbar />

      {/* Header chứa user info và thanh tìm kiếm */}
      <div className="qlt-header-bar">
        <div className="qlt-user-info">
          <span className="qlt-user-avatar">👤</span>
          <h2>
            Xin chào, <strong>{userName}</strong> 👋
          </h2>
        </div>
        <div className="qlt-search-wrapper">
          <input
            type="text"
            placeholder="Tìm tin đăng của bạn..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="qlt-search"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="qlt-tabs">
        <button className={`qlt-tab-btn ${activeTab === "DaDuyet" ? "active" : ""}`}
          onClick={() => { setActiveTab("DaDuyet"); setCurrentPage(1); }}>Đang hiển thị</button>
        <button className={`qlt-tab-btn ${activeTab === "ChoDuyet" ? "active" : ""}`}
          onClick={() => { setActiveTab("ChoDuyet"); setCurrentPage(1); }}>Chờ duyệt</button>
        <button className={`qlt-tab-btn ${activeTab === "TuChoi" ? "active" : ""}`}
          onClick={() => { setActiveTab("TuChoi"); setCurrentPage(1); }}>Bị từ chối</button>
      </div>

      {/* Danh sách tin */}
      <div className="qlt-post-list">
        {currentPosts.length === 0 ? (
          <p>Không có tin đăng cho trạng thái này.</p>
        ) : (
          currentPosts.map((post) => (
            <div key={post.maTinDang} className="qlt-post-item" onClick={() => handleViewDetail(post)}>
              {post.images?.length > 0 && (
                <img
                  src={`http://localhost:5133${post.images[0]}`}
                  alt="Ảnh tin đăng"
                  className="qlt-post-image"
                />
              )}
              <div className="qlt-post-content">
                <h3 className="qlt-title">{post.tieuDe}</h3>
                <p>{post.moTa}</p>
                <p><strong className="qlt-price">Giá: {post.gia.toLocaleString()} đ</strong></p>
                <p><strong>Ngày đăng:</strong> {new Date(post.ngayDang).toLocaleDateString()}</p>
                <p><strong>Người bán:</strong> {post.nguoiBan}</p>

                {activeTab === "DaDuyet" && (
                  <div className="qlt-actions">
                    <Link to={`/cap-nhat-tin/${post.maTinDang}`} className="qlt-edit-btn" onClick={(e) => e.stopPropagation()}>
                      ✏️ Cập nhật
                    </Link>
                    <button className="qlt-delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(post.maTinDang); }}>
                      ❌ Xóa
                    </button>
                  </div>
                )}
              </div>

              {/* Icon trạng thái */}
              <div className="qlt-post-status">
                {post.trangThaiText === "ChoDuyet" && <span title="Chờ duyệt">⏳</span>}
                {post.trangThaiText === "DaDuyet" && <span title="Đã duyệt">✅</span>}
                {post.trangThaiText === "TuChoi" && <span title="Bị từ chối">❌</span>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="qlt-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button key={num}
              className={num === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuanLyTin;
