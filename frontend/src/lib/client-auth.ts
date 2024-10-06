"use client";
import { register, login, logout, refreshToken } from "@/actions/auth";

const handleRegister = async (username: string, password: string) => {
  const result = await register(username, password);
  if (result.error) {
    console.error(result.error);
  } else {
    console.log(result.message);
  }
};

const handleLogin = async (username: string, password: string) => {
  const result = await login(username, password);
  if (result.jwt) {
    localStorage.setItem("accessToken", result.jwt["access token"]);
    localStorage.setItem("refreshToken", result.jwt["refresh token"]);
  } else {
    console.error(result.error);
  }
};

const handleRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    const result = await refreshToken(refreshToken);
    if (result.jwt) {
      localStorage.setItem("accessToken", result.jwt["access token"]);
      localStorage.setItem("refreshToken", result.jwt["refresh token"]);
      return true;
    } else {
      console.error(result.error);
      return false;
    }
  }
};

const handleLogout = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const result = await logout(accessToken);
    if (!result.error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } else {
      console.error(result.error);
    }
  }
};

export { handleRegister, handleLogin, handleRefreshToken, handleLogout };
