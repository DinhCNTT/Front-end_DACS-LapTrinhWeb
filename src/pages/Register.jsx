import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Số điện thoại
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra số điện thoại: 10-11 số
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("❌ Số điện thoại không hợp lệ! Vui lòng nhập 10-11 số.");
      return;
    }
    
    // Ràng buộc email phải thuộc domain Gmail
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      alert("❌ Email phải là địa chỉ Gmail (ví dụ: example@gmail.com).");
      return;
    }

    // Kiểm tra mật khẩu: ít nhất 8 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc biệt
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("❌ Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
      return;
    }

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      alert("❌ Mật khẩu xác nhận không khớp.");
      return;
    }
    
    const userData = { fullName, phoneNumber, email, password, confirmPassword };

    try {
      const response = await fetch("http://localhost:5133/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Đăng ký thất bại!");

      alert("✅ Đăng ký thành công! Hãy đăng nhập lại.");
      navigate("/login");

    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="register-box">
        <h2>Đăng ký tài khoản</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email (gmail)"
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
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <p className="terms">
            Khi đăng ký, bạn đồng ý với <a href="#">Điều khoản sử dụng</a> và <a href="#">Chính sách bảo mật</a>.
          </p>

          <button type="submit">Đăng ký</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;