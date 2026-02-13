import api from "@/api/axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      const cached = localStorage.getItem("user");

      if (cached) {
        setUser(JSON.parse(cached));
        setLoading(false);
      }

      try {
        const res = await api.get("/api/auth/me");
        if (res.data.success) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.log(err);
        if (!cached) setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const getData = () => useContext(UserContext);
