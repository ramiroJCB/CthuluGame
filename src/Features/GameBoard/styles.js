import styled, { keyframes } from "styled-components";

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
export const Buttons = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.5vw;
  height: 6vh;
  margin: 1vh;
  align-self: center;
  cursor: pointer;
  background: ${({ Theme }) => (Theme === "dark" ? "#639cd9" : "#342056")};
  outline: none;
  color: ${({ Theme }) => (Theme === "dark" ? "black" : "white")};
  border-radius: 999px;
`;
export const PlayerContainer = styled.div`
  margin-top: 2vh;
  align-self: flex-start;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 6.5vh;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
  width: 13vw;
  background: ${({ Theme }) => (Theme === "dark" ? "#5454c5" : "#639cd9")};
  margin: 1vh;
  border-radius: 0.5rem;
`;
export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 27.4vw;
  background: ${({ Theme }) => (Theme === "dark" ? "#5454c5" : "#639cd9")};
  margin: 1vh;
  border-radius: 0.5rem;
`;
export const StatusBar = styled.div`
  display: flex;
  flex-flow: column;
  background: ${({ Theme }) => (Theme === "dark" ? "#5454c5" : "#639cd9")};
  border-style: "groove";
  border-color: ${({ Theme }) => (Theme === "dark" ? "#639cd9" : "#5454c5")};
  width: 12vw;
  height: 60vh;
  border-radius: 0.5rem;
`;
export const Images = styled.img`
  max-width: 10vw;
  height: 10vh;
  src: url(${(props) => props.src});
`;

export const Turns = styled.h2`
  margin: 1vh;
  font-size: 1.5rem;
`;

//Animations
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

//Rotation
export const Rotate = styled.div`
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
`;
//Floating

const float = keyframes`

  50% {
    transform: translate(0, 0.8vh);
  }
`;

export const ImageFloating = styled.img`
  max-width: 10vw;
  height: 10vh;
  margin: 1vh;
  animation: ${float} 3s ease-out infinite;
  src: url(${(props) => props.src});
`;
//SelectedCard

export const SelectedCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
  width: 13vw;
  background: ${({ Theme }) => (Theme === "dark" ? "#5454c5" : "#639cd9")};
  margin: 1vh;
  border-radius: 0.5rem;
  transform: translateY(-10vh);
`;
