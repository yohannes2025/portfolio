// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { toast } from "react-toastify";
import type { User, RegisterData, ProfileUpdateData } from "../types";

const API_URL = API_BASE_URL;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/profile/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/users/login/`, {
        username,
        password,
      });
      const { access, refresh } = response.data.tokens;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setUser(response.data.user);
      toast.success("Login successful!");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error) &&
        typeof error.response?.data?.message === "string"
        ? error.response.data.message
        : "Login failed";
      toast.error(message);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register/`, data);
      const { access, refresh } = response.data.tokens;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setUser(response.data.user);
      toast.success("Registration successful! Please verify your email.");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error) &&
        typeof error.response?.data?.message === "string"
        ? error.response.data.message
        : "Registration failed";
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout/`, {
        refresh: localStorage.getItem("refresh_token"),
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
      toast.info("Logged out successfully");
    }
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    try {
      const response = await axios.put(`${API_URL}/users/profile/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error) &&
        typeof error.response?.data?.message === "string"
        ? error.response.data.message
        : "Update failed";
      toast.error(message);
      throw error;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      await axios.post(
        `${API_URL}/users/change-password/`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
      toast.success("Password changed successfully!");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error) &&
        typeof error.response?.data?.message === "string"
        ? error.response.data.message
        : "Password change failed";
      toast.error(message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
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
