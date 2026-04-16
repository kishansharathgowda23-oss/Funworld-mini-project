import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("funworld-auth");
    return saved ? JSON.parse(saved) : { token: "", user: null };
  });

  useEffect(() => {
    localStorage.setItem("funworld-auth", JSON.stringify(auth));
  }, [auth]);

  const login = (payload) => setAuth(payload);
  const logout = () => setAuth({ token: "", user: null });

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

