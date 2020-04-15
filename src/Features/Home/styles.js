import styled, { keyframes } from "styled-components";

export const Buttons = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.5vw;
  height: 50px;
  border-color: ${({ Selected, Theme }) =>
    Selected ? (Theme === "dark" ? "#342056" : "#639cd9") : "none"};
  border-width: ${({ Selected }) => (Selected ? "0.9vh" : "none")};
  cursor: pointer;
  background: ${({ Theme }) => (Theme === "dark" ? "#639cd9" : "#342056")};
  outline: none;
  color: ${({ Theme }) => (Theme === "dark" ? "black" : "white")};
  border-radius: 999px;
`;
export const Images = styled.img`
  max-width: 10vw;
  height: 10vh;
  src: url(${(props) => props.src});
`;
export const Input = styled.input`
  margin: 1vh;
  border-radius: 999px;
  width: 15vw;
  padding: 1vh;
  outline: none;
`;
//Animations
const darkGlow = keyframes`  
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #5454c5,
      0 0 60px #5454c5, 0 0 50px #5454c5, 0 0 30px #5454c5, 0 0 30px #5454c5;
  }
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #639cd9, 0 0 40px #639cd9,
        0 0 50px #5454c5, 0 0 60px #5454c5, 0 0 70px #5454c5, 0 0 80px #5454c5;
    }

`;
const Glow = keyframes`
    from {
      text-shadow: 0 0 10px #639cd9, 0 0 20px #639cd9, 0 0 30px #342056,
      0 0 40px #342056, 0 0 50px #342056, 0 0 60px #342056, 0 0 70px #342056;
    }
    to {
      text-shadow: 0 0 20px #639cd9, 0 0 30px #639cd9, 0 0 40px #220e24,
        0 0 40px #220e24, 0 0 50px #220e24, 0 0 60px #220e24, 0 0 70px #220e24;
    }
`;

export const GlowTitle = styled.div`
  font-size: 3.5vh;
  color: ${({ Theme }) => (Theme === "dark" ? "white" : "black")};
  text-align: center;
  animation: ${({ Theme }) => (Theme === "dark" ? Glow : darkGlow)} 1s
    ease-in-out infinite alternate;
  -webkit-animation: ${({ Theme }) => (Theme === "dark" ? Glow : darkGlow)} 1s
    ease-in-out infinite alternate;
  -moz-animation: ${({ Theme }) => (Theme === "dark" ? Glow : darkGlow)} 1s
    ease-in-out infinite alternate;
`;

const float = keyframes`

  50% {
    transform: translate(0, 0.4vh);
  }
`;
export const ImageFloating = styled.img`
  max-width: 10vw;
  height: 10vh;
  animation: ${float} 3s ease-out infinite;
  src: url(${(props) => props.src});
`;
