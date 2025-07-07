import { useContext, useState } from "react";
import logo from "../images/trackitLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

import SignUpLogin from "../styles/SignUpLogin";
import LinkStyled from "../styles/LinkStyled";

import { ThreeDots } from 'react-loader-spinner';

export default function Login({setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  function submitAccount(e) {
    e.preventDefault();
    setLoading(true);
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    const body = { email, password };

    axios.post(URL, body)
      .then((res) => {
        setUser(res.data)
        setToken(res.data.token)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/hoje");
      })
      .catch((error) => {
        setLoading(false)
        console.error("Erro ao criar conta:", error);
        if (error.response && error.response.status === 401) {
          alert("Usuário ou senha inválidos");
        } else {
          alert("Algo deu errado! Tente novamente.");
        }
      });
  }

  return (
    <SignUpLogin>
      <img src={logo} />
      <form onSubmit={submitAccount}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="senha"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
                <button type="submit" disabled={loading} style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
          {loading ? (
            <ThreeDots
              height="40"
              width="40"
              color="#FFFFFF"
              ariaLabel="loading"
              backgroundColor="#52B6FF"
            />
          ) : (
            "Entrar"
          )}
        </button>
      </form>
      <LinkStyled to="/cadastro">Não tem uma conta? Cadastre-se!</LinkStyled>
    </SignUpLogin>
  );
}