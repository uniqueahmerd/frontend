// // import React, { createContext, useContext, useState } from "react";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   const login = () => setIsAuthenticated(true);
// //   const logout = () => setIsAuthenticated(false);

// //   return (
// //     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);

// //tepmp

// import React, { createContext, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // Always authenticated for development
//   const isAuthenticated = true;

//   const login = () => {};
//   const logout = () => {};

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
