import { styled } from "styled-components";

const SignUpLogin = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    min-width: 300px;
    min-height:100vh;

    img{
        margin-bottom: 20px;
    }

    form{
        display:flex;
        flex-direction:column;
        gap:10px;
    }

    input{
        width:100%;
        min-width: 300px;
        height:45px;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 16px;

        &::placeholder{
            color: #d4d4d4;
        }
    }

    button{
        dipslay:flex;
        align-items:center;
        justify-content:center;
        height: 45px;
        background-color: #52B6FF;
        border:none;
        border-radius: 5px;
        color: white;
        font-size: 18px;
    }
`
export default SignUpLogin;