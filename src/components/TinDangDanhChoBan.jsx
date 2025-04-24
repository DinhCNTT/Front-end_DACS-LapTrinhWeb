import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./TinDangDanhChoBan.css";
import { CategoryContext } from "../context/CategoryContext"; // Import CategoryContext
import { SearchContext } from "../context/SearchContext"; // Import SearchContext
import { Link } from "react-router-dom"; // Import Link

const TinDangDanhChoBan = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(25);

  const { searchTerm } = useContext(SearchContext); // Get search term from context
  const { selectedCategory } = useContext(CategoryContext); // Get selected category from context

  // Fetch posts from API when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5133/api/tindang/get-posts");
        setPosts(response.data); // Store posts in state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Only run on component mount

  // Filter posts by search term (ignores category)
  const filterBySearchTerm = (posts) => {
    return posts.filter((post) =>
      post.tieuDe && post.tieuDe.toLowerCase().includes(searchTerm.toLowerCase()) // Check if tieuDe exists
    );
  };
  // Filter posts by selected category
  const filterByCategory = (posts) => {
    return posts.filter((post) => {
      return selectedCategory
        ? post.danhMucCha && post.danhMucCha.toLowerCase() === selectedCategory.toLowerCase() // Check if category matches
        : true; // If no category selected, don't filter
    });
  };

  // Apply filters: category first, then search term
  const filteredPostsByCategory = filterByCategory(posts);
  const filteredPostsBySearch = filterBySearchTerm(filteredPostsByCategory);

  // Handle "show more" button to display more posts
  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + 25); // Show 25 more posts
  };

  // Format price as currency (VND)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  return (
    <div className="tin-dang-danh-cho-ban">
      <h2>Tin Đăng Dành Cho Bạn</h2>
      <div className="post-list">
        {filteredPostsBySearch.length === 0 ? (
          <p>Không có tin đăng nào.</p>
        ) : (
          filteredPostsBySearch.slice(0, visiblePosts).map((post) => (
            <div key={post.maTinDang} className="post-item">
              <Link to={`/tin-dang/${post.maTinDang}`} className="post-link">
                {/* Display post image */}
                <div className="post-images">
                  {post.images && post.images.length > 0 ? (
                    post.images.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5133${image}`}
                        alt={`Image ${index + 1}`}
                        className="post-image"
                      />
                    ))
                  ) : (
                    <p>Không có ảnh.</p>
                  )}
                </div>

                {/* Display post information */}
                <div className="post-info">
  <h3>{post.tieuDe}</h3>
  <p className="price">{formatCurrency(post.gia)}</p>
  <p className="post-description">Tình trạng: {post.tinhTrang}</p>
  <p className="post-description">{post.tinhThanh}</p>
  {post.coTheThoaThuan && <p className="post-description">Có thể thương lượng</p>}
</div>

              </Link>
            </div>
          ))
        )}
      </div>

      {visiblePosts < filteredPostsBySearch.length && (
        <button className="xem-them-btn" onClick={handleShowMore}>
          Xem thêm
        </button>
      )}
    </div>
  );
};

export default TinDangDanhChoBan;
