import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('authToken');
      if (storageData) {
        try {
          const data = await api.validateToken(storageData);
          if (data.user) {
            setUser(data.user);
          }
        } catch (error) {
          alert(error);
        }
      }
    };
    validateToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await api.login(email, password);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
        return true;
      }
      return false;
    } catch (error) {
      alert(error);
      return false;
    }
  };

  const register = async (name: string, username: string, email: string, password: string) => {
    try {
      const data = await api.register(name, username, email, password);
      if (data.token) {
        return true;
      }
      return false;
    } catch (error) {
      alert(error);
      return false;
    }
  };

  const getAuctions = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const data = await api.getAuctions(token);
      if (data)
        return data;

      return false;
    } catch (error) {
      alert(error);
      return false;
    }
  };

  const signout = async () => {
    setUser(null);
    setToken('');
  };

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, signout, getAuctions }}>
      {children}
    </AuthContext.Provider>
  );
};
