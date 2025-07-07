import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
  }

  body {
  font-family: 'Lexend Deca', sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;
  }
`;
export default GlobalStyle