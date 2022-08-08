import { createContext, useEffect, useState } from "react";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading:
      JSON.parse(window.localStorage.getItem("authData")) &&
      JSON.parse(window.localStorage.getItem("authData")).data
        ? true
        : false,
    data: JSON.parse(window.localStorage.getItem("authData")) || {
      isAuthenticated: false,
      user: null,
    },
  });

  // update local storage when auth.data changes
  useEffect(() => {
    const data = JSON.stringify(auth.data);
    window.localStorage.setItem("authData", data);
  }, [auth.data]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
