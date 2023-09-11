import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../config/axios-config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      // SET LOGIN STATUS TO TRUE
      setIsLoggedIn(true);
      // GET REQUEST FOR USER INFORMATION
      api
        .get("profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error retrieving user information", error);

          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // LOG OUT FUNCTION
  const logout = () => {
    Cookies.remove("token");

    setIsLoggedIn(false);
    setUser(null);
  };

  // LOG IN FUNCTION
  const login = async (email, password) => {
    try {
      const response = await api.post(`/login`, { email, password });

      if (response.status === 200) {
        console.log("Success");
        setIsLoggedIn(true);
      } else {
        console.error("login failed");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const fetchUserData = () => {
    const token = Cookies.get("token");
    if (token) {
      // SET LOGIN STATUS TO TRUE
      setIsLoggedIn(true);
      // GET REQUEST FOR USER INFORMATION
      api
        .get("profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error retrieving user information", error);

          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, logout, login, fetchUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
