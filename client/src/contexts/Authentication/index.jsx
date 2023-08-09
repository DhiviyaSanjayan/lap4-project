import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState("One With The CORS");
  const goTo = useNavigate();

  useEffect(() => {
    const getUserDataByToken = async () => {
      const token = localStorage.getItem("token");
      //if token is undefined, user must also be null
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const { status, data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/users/details`,
          config
        );
        
        if (status === 200) {
          setUser(data);
        } else {
          //if token exists but the fetch request returns anything other than a 200 status code the token is invalid or the token never existed in the db at all
          alert("Your session has expired");
          localStorage.removeItem("token");
          setTimeout(() => goTo("/login"), 2000);
        }
      } catch (error) {
        console.log(error)
      }
    };

    getUserDataByToken();
  }, [localStorage.getItem("token")]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
