import { createContext, useState, useEffect } from "react"; 
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [role, setRole] = useState(() => localStorage.getItem("userRole") || null);
    const [fullName, setFullName] = useState(() => localStorage.getItem("userFullName") || ""); // ✅ Thêm state họ tên
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = authService.getUser();
        if (storedUser) {
            setUser(storedUser);
            setRole(storedUser.role);
            setFullName(storedUser.fullName || ""); // ✅ Lưu họ tên từ authService
        }
        setLoading(false);
    }, []);

    const logout = () => {
        authService.logout();
        setUser(null);
        setRole(null);
        setFullName(""); // ✅ Xóa họ tên khi logout
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userFullName"); // ✅ Xóa họ tên khỏi localStorage
    };

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, role, fullName, setUser, setRole, setFullName, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
