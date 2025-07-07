import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import logo from "../images/trackitLogo.png";

import SignUpLogin from "../styles/SignUpLogin";
import LinkStyled from "../styles/LinkStyled";

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate();

    function createAccount(e){
        e.preventDefault()

        if (!email || !password || !name || !image) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        const body = {email, password, name, image};

        axios.post(URL, body)
        .then((response) => {
            console.log("Conta criada com sucesso:", response.data);
            navigate("/");
        })
        .catch((error) => {
            console.error("Erro ao criar conta:", error);
            if (error.response && error.response.status === 409) {
                alert("Usuário já existente!");
            } else {
                alert("Algo deu errado! Tente novamente.");
            }
        })
    }



    return(
        <SignUpLogin>
            <img src={logo}/>
            <form onSubmit={createAccount}>
                <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type="password" placeholder="senha" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <input type="text" placeholder="nome" value={name} onChange={(e)=>setName(e.target.value)}></input>
                <input type="text" placeholder="imagem" value={image} onChange={(e)=>setImage(e.target.value)}></input>

                <button type="submit">Cadastrar</button>
            </form>
            <LinkStyled to="/">Já tem uma conta? Faça login!</LinkStyled>
        </SignUpLogin>
    );
}