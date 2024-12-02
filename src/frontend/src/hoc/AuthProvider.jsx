import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(localStorage.getItem("isLogin"));

  const signin = (newUser, cb) => {
    setUser(newUser);
    localStorage.setItem("userName", newUser);
    localStorage.setItem("isLogin", true);
     cb();
  }

  const signout = (cb) => {
    setUser(null);
    
    localStorage.clear();
     cb();
  }

  const value = {user, signin, signout};

  return (
      <AuthContext.Provider value={value}>
          {children}
      </AuthContext.Provider>
  )

}