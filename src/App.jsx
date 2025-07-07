import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import { useState } from "react";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Today from "./pages/Today";
import UserContext from "./context/UserContext";
import AuthContext from "./context/AuthContext";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));


  return (
    <AuthContext.Provider value={[token, setToken]}>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />}></Route>
            <Route path="/cadastro" element={<SignUp />}></Route>
            <Route path="/habitos" element={<Home token={token} />}></Route>
            <Route path="/hoje" element={<Today />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}