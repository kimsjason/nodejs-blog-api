import { createContext, useEffect, useState } from "react";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null });

  // initial render - update state if auth data exists in localstorage
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("isAuthenticated"));
    if (data)
      setAuth({
        loading: false,
        data: data,
      });
  }, []);

  // update local storage when auth.data changes
  useEffect(() => {
    const data = JSON.stringify(auth.data);
    window.localStorage.setItem("isAuthenticated", data);
  }, [auth.data]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
