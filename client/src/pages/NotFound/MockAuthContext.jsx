import React, { useContext } from "react";

const MockAuthContext = React.createContext();

export const useAuth = () => {
  return useContext(MockAuthContext);
};

export const MockAuthProvider = ({ children }) => {
  return (
    <MockAuthContext.Provider value={{ user: null, setUser: () => {} }}>
      {children}
    </MockAuthContext.Provider>
  );
};
