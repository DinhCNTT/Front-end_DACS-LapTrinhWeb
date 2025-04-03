import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import AddEmployee from "../components/AddEmployee"; 
import Sidebar from "../components/Sidebar";
import EmployeeList from "../components/EmployeeList";
import AddCategory from "../components/AddCategory";
import AddParentCategory from "../components/AddParentCategory";
import ManageParentCategories from "../pages/ManageParentCategories";
import ManageCategories from "../pages/ManageCategories";
import MarketPage from "../pages/MarketPage"; // ✅ Import trang MarketPage
import PostForm from "../components/PostForm"; // Import PostForm component
import ManagePosts from "../components/ManagePosts"; // Import thêm ManagePosts component (quản lý tin đăng)
const AdminRoute = ({ children }) => {
    const { user, role } = useContext(AuthContext);

    if (user === null) {
        return <div>Loading...</div>;
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
            <Route path="/dang-tin" element={<PostForm />} /> 

            {/* Bảo vệ trang Admin */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/add-employee" element={<AdminRoute><AddEmployee /></AdminRoute>} /> 
            <Route path="/admin/employees" element={<AdminRoute><EmployeeList /></AdminRoute>} />
            <Route path="/admin/add-category" element={<AdminRoute><AddCategory /></AdminRoute>} />
            <Route path="/admin/add-parent-category" element={<AdminRoute><AddParentCategory /></AdminRoute>} />
            <Route 
              path="/admin/manage-categories" 
              element={<AdminRoute><ManageParentCategories /></AdminRoute>} 
            />
            <Route path="/admin/manage-subcategories" element={<AdminRoute><ManageCategories /></AdminRoute>} />
            <Route path="/admin/manage-posts" element={<AdminRoute><ManagePosts /></AdminRoute>} /> {/* Quản lý tin đăng */}
        </Routes>      
    );
}

export default AppRoutes;