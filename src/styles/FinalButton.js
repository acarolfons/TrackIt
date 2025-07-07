import { styled } from "styled-components";

const FinalButton = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 65px;
  width: 100vw;
  display: flex;

  button {
    width: 50%;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: none;
    /* background e color vão pelo inline style */
  }
`;

export default FinalButton