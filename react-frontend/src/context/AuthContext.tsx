import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
      email,
      password,
    });

    const receivedToken = response.data.access_token;
    setToken(receivedToken);
    localStorage.setItem("token", receivedToken);
  };

  const register = async (username: string, email: string, password: string) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
      username,
      email,
      password,
    });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

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
