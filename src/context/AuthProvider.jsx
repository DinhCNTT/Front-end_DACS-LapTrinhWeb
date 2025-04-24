<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from "react";
=======
import { createContext, useContext, useState } from "react";
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("userRole");
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setRole(userData.role);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userRole", userData.role);
=======
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
  };

  const logout = () => {
    setUser(null);
<<<<<<< HEAD
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
=======
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
>>>>>>> 8c86d9ae2cd85622f4768b7c9338b9a03f6bc534
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
