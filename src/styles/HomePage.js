import { styled } from "styled-components";

const HomePage = styled.div`
  background-color: #f2f2f2;
  width: 100vw;
  min-height: 100vh;
  padding:90px 20px;

  & .Info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom:10px;

    h1 {
      color: #126ba5;
      font-size: 20px;
      font-weight: 400;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;

      font-size: 20px;
      justify-content: center;
      width: 40px;
      height: 35px;
      border-radius: 5px;
      border: none;
      background-color: #52b6ff;
    }
  }

  .Box {

      p {
        font-size: 15px;
        color: #666666;
      }
  }
`;

export default HomePage;