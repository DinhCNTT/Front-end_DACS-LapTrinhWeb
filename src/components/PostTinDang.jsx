import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PostTinDang = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [condition, setCondition] = useState("Moi");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [image, setImage] = useState(null);
  const [canNegotiate, setCanNegotiate] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [tinhThanhList, setTinhThanhList] = useState([]);
  const [quanHuyenList, setQuanHuyenList] = useState([]);

  // State cho thông tin xem trước
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("categoryId");
    setCategoryId(id);
    setCategoryName(queryParams.get("categoryName"));
    console.log("Category ID:", id); // In ra giá trị categoryId
  }, [location]);

  useEffect(() => {
    const fetchTinhThanh = async () => {
      try {
        const response = await fetch("http://localhost:5133/api/tindang/tinhthanh");
        if (!response.ok) throw new Error("Không thể tải danh sách tỉnh thành");
        const data = await response.json();
        setTinhThanhList(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tỉnh thành:", error);
      }
    };

    fetchTinhThanh();
  }, []);

  useEffect(() => {
    if (province) {
      const fetchQuanHuyen = async () => {
        try {
          const response = await fetch(`http://localhost:5133/api/tindang/tinhthanh/${province}/quanhuynh`);
          if (!response.ok) throw new Error("Không thể tải danh sách quận huyện");
          const data = await response.json();
          setQuanHuyenList(data);
        } catch (error) {
          console.error("Lỗi khi tải danh sách quận huyện:", error);
        }
      };

      fetchQuanHuyen();
    }
  }, [province]);

  const handlePreview = async () => {
    try {
      if (!categoryId) {
        console.error("categoryId không hợp lệ");
        return;
      }

      // Gửi yêu cầu lấy bài đăng từ API theo MaTinDang
      const response = await axios.get(`http://localhost:5133/api/tindang/get-post/${categoryId}`);
      if (response.data) {
        setPreview(response.data);  // Lưu thông tin bài đăng vào state
      }
    } catch (error) {
      console.error("Lỗi khi lấy bài đăng:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("contactInfo", contactInfo);
    formData.append("condition", condition);
    formData.append("province", province);
    formData.append("district", district);
    formData.append("userId", user.id);
    formData.append("categoryId", categoryId);
    formData.append("categoryName", categoryName);
    formData.append("canNegotiate", canNegotiate);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5133/api/tindang/add-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Sau khi đăng thành công, lưu thông tin bài đăng trả về từ server vào state `preview`
      setStatusMessage("✅ Bài đăng thành công!");
      setPreview(response.data);  // Hiển thị bài đăng ngay sau khi gửi thành công
      alert("Bài đăng thành công!");
    } catch (error) {
      console.error("Lỗi khi đăng tin:", error);
      setStatusMessage("❌ Đăng tin thất bại!");
      alert("Đăng tin thất bại!");
    }
  };

  return (
    <div>
      <h2>Đăng Tin</h2>
      {statusMessage && <p>{statusMessage}</p>}

      {categoryName && (
        <div>
          <h4>Danh mục con đã chọn: {categoryName}</h4>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Thông tin liên hệ</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tình trạng sản phẩm</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)} required>
            <option value="Moi">Mới</option>
            <option value="DaSuDung">Đã Sử Dụng</option>
          </select>
        </div>

        {/* Chọn Tỉnh Thành */}
        <div>
          <label>Tỉnh/Thành</label>
          <select value={province} onChange={(e) => setProvince(e.target.value)} required>
            <option value="">Chọn tỉnh thành</option>
            {tinhThanhList.map((tinh) => (
              <option key={tinh.maTinhThanh} value={tinh.maTinhThanh}>
                {tinh.tenTinhThanh}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn Quận Huyện */}
        <div>
          <label>Quận/Huyện</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} required>
            <option value="">Chọn quận huyện</option>
            {quanHuyenList.map((quan) => (
              <option key={quan.maQuanHuyen} value={quan.maQuanHuyen}>
                {quan.tenQuanHuyen}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn ảnh */}
        <div>
          <label>Ảnh</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        {/* Checkbox "Có thể thương lượng" */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={canNegotiate}
              onChange={(e) => setCanNegotiate(e.target.checked)}
            />
            Có thể thương lượng
          </label>
        </div>

        <button type="button" onClick={handlePreview}>Xem trước</button>
        <button type="submit">Đăng Tin</button>
      </form>

      {/* Hiển thị thông tin xem trước */}
      {preview && (
        <div>
          <h3>Xem Trước</h3>
          <p><strong>Tiêu đề:</strong> {preview.TieuDe}</p>
          <p><strong>Mô tả:</strong> {preview.MoTa}</p>
          <p><strong>Giá:</strong> {preview.Gia}</p>
          <p><strong>Thông tin liên hệ:</strong> {preview.ThongTinLienHe}</p>
          <p><strong>Tình trạng:</strong> {preview.TinhTrang}</p>
          <p><strong>Tỉnh Thành:</strong> {preview.TinhThanh}</p>
          <p><strong>Quận Huyện:</strong> {preview.QuanHuyen}</p>
          <p><strong>Có thể thương lượng:</strong> {preview.CoTheThoaThuan ? "Có" : "Không"}</p>
        </div>
      )}
    </div>
  );
};

export default PostTinDang;
