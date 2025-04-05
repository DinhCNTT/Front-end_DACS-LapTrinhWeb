import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify
import "./EmployeeList.css";
import Sidebar from "./Sidebar"; // Đảm bảo import Sidebar
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  // Hàm lấy danh sách nhân viên từ API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5133/api/admin/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách nhân viên:", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token đăng nhập
    window.location.href = "/login"; // Điều hướng về trang đăng nhập
  };

  // Hàm khóa/mở khóa tài khoản nhân viên
  const toggleLock = async (userId, isLocked) => {
    console.log("🔄 Gửi request:", `/api/admin/toggle-lock/${userId}`);
    try {
      const response = await axios.post(`http://localhost:5133/api/admin/toggle-lock/${userId}`);
      
      // Hiển thị thông báo thành công
      if (!isLocked) {
        toast.success("🔒 Nhân viên đã bị khóa!");
      } else {
        toast.success("✅ Nhân viên đã được mở khóa!");
      }

      fetchEmployees(); // Cập nhật danh sách nhân viên
    } catch (error) {
      toast.error("❌ Lỗi khi thay đổi trạng thái tài khoản!");
      console.error("❌ Lỗi khi thay đổi trạng thái tài khoản:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="employee-container mx-auto p-4 flex flex-col items-center">
      {/* Tiêu đề căn giữa */}
      <h2 className="text-2xl font-bold employee-title text-center mb-4">
        📋 Quản lý Nhân Viên
      </h2>
      {/* Component hiển thị thông báo */}
      <ToastContainer autoClose={3000} />
      <Sidebar onLogout={handleLogout} /> {/* ✅ Sidebar có hàm đăng xuất */}
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã NV</th>
            <th className="border p-2">Họ Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Số điện thoại</th>
            <th className="border p-2">Chức vụ</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{emp.employeeCode || "N/A"}</td>
              <td className="border p-2">{emp.fullName || "Chưa có dữ liệu"}</td>
              <td className="border p-2">{emp.email || "N/A"}</td>
              <td className="border p-2">{emp.phoneNumber || "N/A"}</td>
              <td className="border p-2">{emp.role || "Không rõ"}</td>
              <td className="border p-2">
                {emp.isLocked ? (
                  <span className="text-red-500 font-bold flex items-center justify-center">
                    🔒 Bị khóa
                  </span>
                ) : (
                  <span className="text-green-500 font-bold flex items-center justify-center">
                    ✅ Hoạt động
                  </span>
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => toggleLock(emp.userId, emp.isLocked)}
                  className={`px-3 py-1 text-white rounded transition duration-300 transform hover:scale-105 shadow-md ${
                    emp.isLocked ? "bg-green-500" : "bg-orange-500"
                  }`}
                >
                  {emp.isLocked ? "Mở khóa" : "Khóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
