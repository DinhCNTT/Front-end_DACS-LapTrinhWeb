import { AuthProvider } from "./context/AuthContext"; // 🔥 Đảm bảo đúng file
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* ✅ Phải bọc toàn bộ AppRoutes */}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
