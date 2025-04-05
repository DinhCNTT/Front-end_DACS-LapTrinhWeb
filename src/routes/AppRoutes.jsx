import { Routes, Route, Navigate } from "react-router-dom";  
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import AddEmployee from "../components/AddEmployee"; 
import Sidebar from "../components/Sidebar";
import EmployeeList from "../components/EmployeeList"; 
import CategoryForm from "../components/CategoryForm"; 
import MarketPage from "../pages/MarketPage"; 
import AddParentCategory from "../components/AddParentCategory"; 
import ManageParentCategories from "../components/ManageParentCategories";
import ManageCategories from "../components/ManageCategories";
import PostForm from "../components/PostForm"; 
import PostTinDang from "../components/PostTinDang";  // Thêm dòng này

// Component bảo vệ quyền truy cập Admin
const AdminRoute = ({ children }) => {
    const { user, role } = useContext(AuthContext);

    if (user === null) {
        return <div>Loading...</div>; // Chờ dữ liệu từ localStorage
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (role !== "Admin") {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-container">
            <Sidebar /> 
            <div className="main-content">{children}</div>
        </div>
    );
};

function AppRoutes() { 
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/market" element={<MarketPage />} /> 

            {/* Bảo vệ trang Admin */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/add-employee" element={<AdminRoute><AddEmployee /></AdminRoute>} /> 
            <Route path="/admin/employees" element={<AdminRoute><EmployeeList /></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><CategoryForm /></AdminRoute>} /> 
            <Route path="/admin/add-parent-category" element={<AdminRoute><AddParentCategory /></AdminRoute>} />
            <Route path="/admin/manage-categories" element={<AdminRoute><ManageParentCategories /></AdminRoute>} />
            <Route path="/admin/manage-subcategories" element={<AdminRoute><ManageCategories /></AdminRoute>} />

            {/* Thêm route cho PostTinDang */}
            <Route path="/post-tin" element={<PostTinDang />} /> {/* Route cho PostTinDang */}
            <Route path="/dang-tin" element={<PostForm />} /> {/* Route cho PostForm */}
        </Routes>
    );
}

export default AppRoutes;
