import React, { useState, useEffect, createContext } from "react";
import { Global } from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setLoading(false);
      return false;
    }

    const userObj = JSON.parse(user);
    const userId = userObj.id;

    try {
      const res = await fetch(`${Global.url}user/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      const data = await res.json();

      const resCounter = await fetch(`${Global.url}user/counters/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      const dataCounter = await resCounter.json();

      setAuth(data.user);
      setCounters(dataCounter);
      setLoading(false);
    } catch (error) { }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, counters, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
