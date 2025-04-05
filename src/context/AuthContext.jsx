import { createContext, useState, useEffect } from "react";
import authService from "../services/authService";  // Đảm bảo bạn đã có authService với các hàm getUser và logout

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [role, setRole] = useState(() => localStorage.getItem("userRole") || null);
    const [fullName, setFullName] = useState(() => localStorage.getItem("userFullName") || ""); 
    const [token, setToken] = useState(() => localStorage.getItem("token") || null); // ✅ Thêm state token
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy thông tin người dùng từ authService
        const storedUser = authService.getUser();  // Đảm bảo hàm này trả về một object người dùng hợp lệ với id
        if (storedUser) {
            setUser(storedUser);  // Cập nhật user vào context
            setRole(storedUser.role);  // Cập nhật role nếu có
            setFullName(storedUser.fullName || ""); // Cập nhật fullName nếu có
            setToken(localStorage.getItem("token")); // ✅ Lấy token từ localStorage
        }
        setLoading(false);
    }, []);

    const logout = () => {
        authService.logout(); // Đảm bảo logout làm sạch mọi thông tin
        setUser(null);  // Xóa thông tin người dùng
        setRole(null);
        setFullName(""); 
        setToken(null); // ✅ Xóa token
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userFullName");
        localStorage.removeItem("token"); // ✅ Xóa token khỏi localStorage
    };

    if (loading) return <div>Loading...</div>;  // Hiển thị loading trong khi đang xử lý

    return (
        <AuthContext.Provider value={{ user, role, fullName, token, setUser, setRole, setFullName, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
