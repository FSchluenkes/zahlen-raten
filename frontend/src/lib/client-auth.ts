"use client";
import { register, login, logout, refreshToken } from "@/actions/auth";

const handleRegister = async (username: string, password: string) => {
  const result = await register(username, password);
  if (result.error) {
    throw new Error(result.error);
  } else {
    console.log(result.message);
  }
};

const handleLogin = async (username: string, password: string) => {
  const result = await login(username, password);
  if (result.jwt) {
    localStorage.setItem("accessToken", result.jwt["access token"]);
    localStorage.setItem("refreshToken", result.jwt["refresh token"]);
    localStorage.removeItem("game_id");
    localStorage.setItem("username", username);
  } else {
    throw new Error(result.error);
  }
};

const handleRefreshToken = async () => {
  const rt = localStorage.getItem("refreshToken");
  if (rt) {
    const result = await refreshToken(rt);
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
      localStorage.removeItem("game_id");
      localStorage.removeItem("username");
    } else {
      console.error(result.error);
    }
  }
};

export { handleRegister, handleLogin, handleRefreshToken, handleLogout };
