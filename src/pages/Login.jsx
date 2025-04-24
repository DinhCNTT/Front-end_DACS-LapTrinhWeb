import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { AuthContext } from "../context/AuthContext"; // Để sử dụng AuthContext
import authService from "../services/authService"; // Đảm bảo bạn có authService với các hàm getUser và logout
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState(""); // Lưu email người dùng nhập
    const [password, setPassword] = useState(""); // Lưu mật khẩu người dùng nhập
    const [errorMessage, setErrorMessage] = useState(""); // Lưu thông báo lỗi nếu có

    const { setUser, setRole, setFullName, setToken } = useContext(AuthContext); // Để lưu user và token vào context
    const navigate = useNavigate(); // Để điều hướng người dùng sau khi đăng nhập thành công

    const handleLogin = async (e) => {
        e.preventDefault(); // Ngừng hành động mặc định của form

        setErrorMessage(""); // Reset lỗi trước khi gửi yêu cầu đăng nhập

        try {
            const userData = await authService.login(email, password); // Gọi hàm login từ authService

            if (!userData || !userData.token || !userData.role) {
                setErrorMessage("Không thể xác thực tài khoản!"); // Hiển thị lỗi nếu không có token
                return;
            }

            // Lưu thông tin người dùng vào context và localStorage
            setUser(userData); // Lưu thông tin người dùng vào context
            setRole(userData.role);
            setFullName(userData.fullName);
            setToken(userData.token); // Lưu token vào context

            // Lưu ID người dùng vào localStorage
            localStorage.setItem("userId", userData.id);
            localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng vào localStorage
            localStorage.setItem("userRole", userData.role);
            localStorage.setItem("userFullName", userData.fullName);
            localStorage.setItem("token", userData.token); // Lưu token vào localStorage

            // Điều hướng người dùng tới trang thích hợp dựa trên vai trò
            navigate(userData.role === "Admin" ? "/admin" : "/market");
        } catch (error) {
            setErrorMessage("Đăng nhập thất bại!"); // Thông báo lỗi nếu đăng nhập không thành công
=======
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
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Đăng nhập</h2>

<<<<<<< HEAD
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Hiển thị lỗi */}
=======
                {/* ✅ Hiển thị lỗi nếu có */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
<<<<<<< HEAD
                        onChange={(e) => setEmail(e.target.value)} // Lưu email người dùng nhập
=======
                        onChange={(e) => setEmail(e.target.value)}
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
<<<<<<< HEAD
                        onChange={(e) => setPassword(e.target.value)} // Lưu mật khẩu người dùng nhập
=======
                        onChange={(e) => setPassword(e.target.value)}
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
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
