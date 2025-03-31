import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar"; // Đảm bảo import Sidebar

import "./AddEmployee.css";

const AddEmployee = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]); 
  const [role, setRole] = useState("Employee");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5133/api/admin/users")
      .then((res) => {
        const emailList = res.data.map((user) => user.email);
        setEmails(emailList);
      })
      .catch((err) => console.error("Lỗi khi lấy danh sách email", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !phoneNumber || !password) {
      toast.error("⚠️ Vui lòng điền đầy đủ thông tin!", { position: "top-right" });
      return;
    }

    const newEmployee = { fullName, email, phoneNumber, password, role };

    try {
      const token = localStorage.getItem("token"); 
      await axios.post(
        "http://127.0.0.1:5133/api/admin/add-or-update-employee",
        newEmployee,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Thêm nhân viên thành công!", { position: "top-right" });

      // Reset form sau khi thêm thành công
      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setRole("Employee");

    } catch (err) {
      console.error("Lỗi khi thêm nhân viên:", err.response?.data || err.message);
      toast.error(`❌ Lỗi: ${err.response?.data?.message || "Không thể thêm nhân viên!"}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token đăng nhập
    window.location.href = "/login"; // Điều hướng về trang đăng nhập
  };

  return (
    <div className="add-employee-container">
      <Sidebar onLogout={handleLogout} /> {/* ✅ Sidebar có hàm đăng xuất */}
      <h2>Thêm Nhân Viên</h2>
      <form className="add-employee-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Họ và Tên:</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Số Điện Thoại:</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Chọn Email:</label>
            <select value={email} onChange={(e) => setEmail(e.target.value)} required>
              <option value="">-- Chọn Email --</option>
              {emails.map((email, index) => (
                <option key={index} value={email}>{email}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Chức vụ:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mật khẩu:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        <button type="submit" className="add-employee-button">
          Thêm Nhân Viên
        </button>
      </form>

      {/* Component hiển thị thông báo */}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default AddEmployee;
