import axios from "axios";

const API_URL = "http://localhost:5133/api/auth";

// Đăng ký tài khoản
const register = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Đăng ký thất bại:", error.response?.data || error.message);
        throw error;
    }
};

// Đăng nhập và lưu token
const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("userRole", response.data.role); // Lưu role
        }
        return response.data;
    } catch (error) {
        console.error("Đăng nhập thất bại:", error.response?.data || error.message);
        throw error;
    }
};

// Đăng xuất, xóa token
const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
};

// Lấy thông tin người dùng từ localStorage
const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
        console.error("Lỗi khi lấy user từ localStorage:", error);
        return null;
    }
};

// Kiểm tra quyền Admin
const isAdmin = () => {
    const user = getUser();
    return user?.role === "Admin";
};

// Kiểm tra quyền Nhân viên
const isStaff = () => {
    const user = getUser();
    return user?.role === "Staff";
};

// Kiểm tra người dùng đã đăng nhập chưa
const isAuthenticated = () => {
    const user = getUser();
    return !!user;
};

export default { register, login, logout, getUser, isAdmin, isStaff, isAuthenticated };
