<<<<<<< HEAD
import { createContext, useState, useEffect } from "react";
import authService from "../services/authService";  // Đảm bảo bạn đã có authService với các hàm getUser và logout
=======
import { createContext, useState, useEffect } from "react"; 
import authService from "../services/authService";
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [role, setRole] = useState(() => localStorage.getItem("userRole") || null);
<<<<<<< HEAD
    const [fullName, setFullName] = useState(() => localStorage.getItem("userFullName") || "");
    const [email, setEmail] = useState(() => localStorage.getItem("userEmail") || ""); // Lưu email
    const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem("userPhoneNumber") || ""); // Lưu số điện thoại
    const [token, setToken] = useState(() => localStorage.getItem("token") || null); // ✅ Thêm state token
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy thông tin người dùng từ authService
        const storedUser = authService.getUser(); // Đảm bảo hàm này trả về một object người dùng hợp lệ với id
        if (storedUser) {
            setUser(storedUser); // Cập nhật user vào context
            setRole(storedUser.role); // Cập nhật role nếu có
            setFullName(storedUser.fullName || ""); // Cập nhật fullName nếu có
            setEmail(storedUser.email || ""); // Lưu email
            setPhoneNumber(storedUser.phoneNumber || ""); // Lưu số điện thoại
            setToken(localStorage.getItem("token")); // ✅ Lấy token từ localStorage
=======
    const [fullName, setFullName] = useState(() => localStorage.getItem("userFullName") || ""); // ✅ Thêm state họ tên
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = authService.getUser();
        if (storedUser) {
            setUser(storedUser);
            setRole(storedUser.role);
            setFullName(storedUser.fullName || ""); // ✅ Lưu họ tên từ authService
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
        }
        setLoading(false);
    }, []);

    const logout = () => {
<<<<<<< HEAD
        authService.logout(); // Đảm bảo logout làm sạch mọi thông tin
        setUser(null); // Xóa thông tin người dùng
        setRole(null);
        setFullName("");
        setEmail(""); // Xóa email
        setPhoneNumber(""); // Xóa số điện thoại
        setToken(null); // ✅ Xóa token
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userFullName");
        localStorage.removeItem("userEmail"); // Xóa email khỏi localStorage
        localStorage.removeItem("userPhoneNumber"); // Xóa số điện thoại khỏi localStorage
        localStorage.removeItem("token"); // ✅ Xóa token khỏi localStorage
    };

    if (loading) return <div>Loading...</div>;  // Hiển thị loading trong khi đang xử lý

    return (
        <AuthContext.Provider value={{
            user,
            role,
            fullName,
            email,
            phoneNumber,
            token,
            setUser,
            setRole,
            setFullName,
            setEmail,
            setPhoneNumber,
            setToken,
            logout
        }}>
=======
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
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
            {children}
        </AuthContext.Provider>
    );
};
