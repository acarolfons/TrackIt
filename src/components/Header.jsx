import { useContext } from "react";
import logo from "../images/TrackIt.png";
import { styled } from "styled-components";
import UserContext from "../context/UserContext";

export default function Header() {
  const [user] = useContext(UserContext);
  return (
    <HeaderC>
      <img src={logo} alt="Logo TrackIt" />
      {user && user.image && (
        <img
          src={user.image}
          alt="Foto de perfil"
          style={{ width: "51px", height: "51px", borderRadius: "30px" }}
        />
      )}
    </HeaderC>
  );
}

const HeaderC = styled.div`
  height: 70px;
  width: 100%;
  background-color: #126ba5;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
`;