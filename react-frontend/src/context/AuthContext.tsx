import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state to avoid premature redirection
  console.log(import.meta.env)

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); // Mark as loaded
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/api/login`, {
      email,
      password,
    });

    const receivedToken = response.data.access_token;
    setToken(receivedToken);
    localStorage.setItem("token", receivedToken);
    window.location.href = "/dashboard"; // Redirect after login
  };

  const register = async (username: string, email: string, password: string) => {
    await axios.post(`${API_URL}/api/register`, {
      username,
      email,
      password,
    });
    window.location.href = "/login"; // Redirect after successful registration
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return <div>Loading...</div>; // Prevent rendering until `useEffect` is complete
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
