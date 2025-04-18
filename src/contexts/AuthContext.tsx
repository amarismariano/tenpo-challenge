import React, { createContext, useContext, useState, useEffect } from "react";
import { isValidEmail } from "../utils/validation";
import { useToast } from "./ToastContext";
import storage from "../utils/storage";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = storage.getToken();
    return !!token;
  });
  const { showToast } = useToast();

  useEffect(() => {
    const token = storage.getToken();
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      showToast("Please enter both email and password", "error");
      return { success: false, error: "Email and password are required" };
    }

    if (!isValidEmail(email)) {
      showToast("Please enter a valid email address", "error");
      return {
        success: false,
        error: "Please enter a valid email address (e.g., user@gmail.com)",
      };
    }

    // For testing purposes, any valid email and password will work
    const token = btoa(`${email}:${password}`);
    storage.setToken(token);
    setIsAuthenticated(true);
    showToast("Welcome back! You've successfully logged in 🚀", "success");
    return { success: true };
  };

  const logout = () => {
    // Clear all user data
    storage.clearAll();
    setIsAuthenticated(false);
    showToast(
      "You've been logged out successfully. See you soon! 👋",
      "success"
    );
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
