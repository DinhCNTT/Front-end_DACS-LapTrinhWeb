import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // ✅ Trạng thái thông báo lỗi
    const { setUser, setRole, setFullName } = useContext(AuthContext); // ✅ Lấy setFullName từ context
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset lỗi trước khi đăng nhập

        try {
            const userData = await authService.login(email, password);

            if (!userData || !userData.role) {
                setErrorMessage("Không thể xác định vai trò người dùng!");
                return;
            }

            setUser(userData);
            setRole(userData.role);
            setFullName(userData.fullName); // ✅ Lưu họ tên vào context

            localStorage.setItem("userRole", userData.role);
            localStorage.setItem("userFullName", userData.fullName); // ✅ Lưu họ tên vào localStorage

            // ✅ Điều hướng phù hợp với từng role
            if (userData.role === "Admin") {
                navigate("/admin");
            } else {
                navigate("/market"); // ✅ Giữ điều hướng theo Code 2
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Đăng nhập thất bại!";
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Đăng nhập</h2>

                {/* ✅ Hiển thị lỗi nếu có */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Đăng nhập</button>
                </form>
                <p className="signup-link">Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
            </div>
        </div>
    );
};

export default Login;
