import { createContext, useEffect, useState, useCallback } from "react";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../api/auth.api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMe = useCallback(async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const register = async (payload) => {
    setError(null);
    const res = await registerUser(payload);
    setUser(res.data.user);
    return res.data;
  };

  const login = async (payload) => {
    setError(null);
    const res = await loginUser(payload);
    await fetchMe();
    return res.data;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}