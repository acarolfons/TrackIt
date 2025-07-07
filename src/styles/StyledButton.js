import { styled } from "styled-components";


const StyledButton = styled.button`
  width: 50%;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: none;
  background-color: ${(props) => (props.active ? "#52B6FF" : "white")};
  color: ${(props) => (props.active ? "white" : "#d4d4d4")};
`;


export default StyledButton