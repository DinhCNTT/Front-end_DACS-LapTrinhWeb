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

            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/add-employee" element={<AdminRoute><AddEmployee /></AdminRoute>} /> 
            <Route path="/admin/employees" element={<AdminRoute><EmployeeList /></AdminRoute>} />
            <Route path="/admin/add-category" element={<AdminRoute><AddCategory /></AdminRoute>} />
            <Route path="/admin/add-parent-category" element={<AdminRoute><AddParentCategory /></AdminRoute>} />
            <Route 
              path="/admin/manage-categories" 
              element={<AdminRoute><ManageParentCategories /></AdminRoute>} 
            />
        </Routes>
    );
}

export default AppRoutes;