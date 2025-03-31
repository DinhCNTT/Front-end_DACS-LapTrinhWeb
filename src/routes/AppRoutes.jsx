import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import AddEmployee from "../components/AddEmployee"; 
import Sidebar from "../components/Sidebar";
import EmployeeList from "../components/EmployeeList"; // Thêm dòng này
import AddCategory from "../components/AddCategory";
import AddParentCategory from "../components/AddParentCategory";
import ManageSubCategories from "../pages/ManageSubCategories"; // Thêm dòng này
// Component bảo vệ quyền truy cập
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

            {/* Bảo vệ trang Admin */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/add-employee" element={<AdminRoute><AddEmployee /></AdminRoute>} /> 
            <Route path="/admin/employees" element={<AdminRoute><EmployeeList /></AdminRoute>} />
            <Route path="/admin/add-category" element={<AdminRoute><AddCategory /></AdminRoute>} />
            <Route path="/admin/add-parent-category" element={<AdminRoute><AddParentCategory /></AdminRoute>} />
            <Route path="/admin/manage-subcategories" element={<AdminRoute><ManageSubCategories /></AdminRoute>} />


             
        </Routes>
    );
}

export default AppRoutes;
