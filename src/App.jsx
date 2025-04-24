<<<<<<< HEAD
import { AuthProvider } from "./context/AuthContext"; 
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext"; // import SearchContext
import { CategoryProvider } from "./context/CategoryContext"; // import CategoryContext
=======
import { AuthProvider } from "./context/AuthContext"; // 🔥 Đảm bảo đúng file
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <AuthProvider>
        <SearchProvider>
          <CategoryProvider> {/* ✅ Thêm lớp này bọc AppRoutes */}
            <AppRoutes />
          </CategoryProvider>
        </SearchProvider>
=======
      <AuthProvider> {/* ✅ Phải bọc toàn bộ AppRoutes */}
        <AppRoutes />
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
