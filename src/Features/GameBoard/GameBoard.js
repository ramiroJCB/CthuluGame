import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  CardsContainer,
  Card,
  PlayerContainer,
  ProfileCard,
  StatusBar,
  Turns,
  Rotate,
  ImageFloating,
  Buttons,
  SelectedCard,
  Images,
} from "./styles";

import { nextTurn } from "../../Store/actions/Game";

import { Cthulhu, Items, Death } from "./icons";

export default () => {
  // Commun Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const [turnChoice, setTurnChoice] = useState("");

  //Store Hooks
  const state = useSelector((state) => state.Game.game);
  const char = useSelector((state) => state.User.Char);
  const monsterEffect = useSelector((state) => state.Game.monsterEffect);
  //Theme
  const Theme = localStorage.getItem("theme");
  //Alerts
  const [WinAlert, setWinAlert] = useState(false);
  const [defeatAlert, setDefeatAlert] = useState(false);
  const [monsterEffectAlert, setMonsterEffectAlert] = useState(true);

  //Destructurations
  const { gameInfo, playerInfo, monsterInfo, playerCards } = state;
  useEffect(() => {
    //Safety push
    !char && history.push("/");
    if (state) {
      monsterInfo.hp === 0 &&
        setWinAlert(
          <SweetAlert
            warning
            style={{
              background: `${Theme === "dark" ? "#5454c5" : "#639cd9"}`,
            }}
            title={`${playerInfo.name} you wont  make it  to  this point... and if you did you are obviusly a programmer hahah  `}
            onConfirm={() => {
              history.push("/");
              dispatch({
                type: "GAME_DATA",
                payload: "",
              });
            }}
            confirmBtnText="GET HOME"
          />
        );
      gameInfo.currentTurn >= 20 &&
        setDefeatAlert(
          <SweetAlert
            style={{
              background: `${Theme === "dark" ? "#5454c5" : "#639cd9"}`,
            }}
            title={
              <span
                style={{ color: `${Theme === "dark" ? "white" : "#363537"}` }}
              >
                {" "}
                {`${playerInfo.name} well... Now you are a Ghost ,pls reincarnate and  Try Another Game`}
              </span>
            }
            confirmBtnStyle={{
              color: `${Theme === "dark" ? "white" : "#363537"}`,
            }}
            onConfirm={() => {
              history.push("/");
              dispatch({
                type: "GAME_DATA",
                payload: "",
              });
            }}
            confirmBtnText="GET HOME"
          >
            <div>
              <ImageFloating src={Death.ghost} />
            </div>
          </SweetAlert>
        );
    }
    //Monster effect Alert
    monsterEffect.effect &&
      setMonsterEffectAlert(
        <SweetAlert
          style={{
            background: `${Theme === "dark" ? "#5454c5" : "#639cd9"}`,
          }}
          title={
            <span
              style={{ color: `${Theme === "dark" ? "white" : "#363537"}` }}
            >
              {" "}
              {`${monsterInfo.name} has used ${monsterEffect.effect}!`}
            </span>
          }
          onConfirm={() => {
            setMonsterEffectAlert(false);
            dispatch({ type: "MONSTER_EFFECT", payload: "" });
          }}
          confirmBtnStyle={{
            color: `${Theme === "dark" ? "white" : "#363537"}`,
          }}
          confirmBtnText="Play Your Next Card!"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ImageFloating
              src={
                monsterEffect.effect === "DAMAGE"
                  ? Cthulhu.damage
                  : monsterEffect.effect === "SHIELD"
                  ? Cthulhu.shield
                  : monsterEffect.effect === "HEAL"
                  ? Cthulhu.heal
                  : Cthulhu.horror
              }
            />
            <span
              style={{ color: `${Theme === "dark" ? "white" : "#363537"}` }}
            >
              {"VALUE:" + monsterEffect.value}
            </span>
          </div>
        </SweetAlert>
      );
  }, [monsterEffect]);

  return (
    <div style={{ width: "100%" }}>
      {/*Alerts*/}
      {WinAlert}
      {defeatAlert}
      {monsterEffectAlert}
      {state ? (
        <div>
          <PlayerContainer>
            <div style={{ width: "75%" }}>
              <ProfileCard Theme={Theme}>
                <ImageFloating src={char.Char} />
                <span>{playerInfo.name}</span>
                <span>
                  HP: {playerInfo.hp}/{playerInfo.maxHp}
                </span>
                <span>SHIELD: {playerInfo.shield}</span>
              </ProfileCard>
              <ProfileCard Theme={Theme}>
                <ImageFloating src={Cthulhu.img} />{" "}
                <span>{monsterInfo.name}</span>
                <span>
                  HP: {monsterInfo.hp}/{monsterInfo.maxHp}
                </span>
                <span>SHIELD: {monsterInfo.shield}</span>
              </ProfileCard>
            </div>
            <div>
              <StatusBar Theme={Theme}>
                <div
                  style={{
                    height: "10%",
                    background: `${Theme === "dark" ? "#342056" : "#639cd9"}`,
                    display: "flex",
                    justifyContent: "center",
                    borderStyle: "groove",
                    borderColor: `${Theme === "dark" ? "#639cd9" : "#5454c5"}`,
                    paddingTop: 9,
                  }}
                >
                  TURNS
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "80%",
                    background: `${Theme === "dark" ? "#5454c5" : "#639cd9"}`,
                    borderStyle: "groove",
                    borderColor: `${Theme === "dark" ? "#639cd9" : "#5454c5"}`,
                    margin: "2vh 6vh  ",
                  }}
                >
                  <label>Current Turn:</label>
                  <Turns>{gameInfo.currentTurn}</Turns>
                  <label>Max Turn:</label>
                  <Turns>{gameInfo.maxTurns}</Turns>
                  <label>Turns Left:</label>
                  <Turns>{gameInfo.turnsLeft}</Turns>
                </div>
                <Buttons
                  Theme={Theme}
                  onClick={() =>
                    dispatch(nextTurn(turnChoice, monsterInfo.gameId))
                  }
                >
                  Next Turn
                </Buttons>
              </StatusBar>
            </div>
          </PlayerContainer>

          <CardsContainer>
            {playerCards &&
              playerCards.map((card, key) => {
                return turnChoice == card.id ? (
                  <SelectedCard
                    Theme={Theme}
                    onClick={() => setTurnChoice(card.id)}
                    key={`${key}+${card.id}`}
                  >
                    {" "}
                    <Images
                      src={
                        card.effect === "DAMAGE"
                          ? char.weapon
                          : card.effect === "SHIELD"
                          ? Items.shield
                          : Items.heal
                      }
                    />{" "}
                    <span>{card.effect}</span>
                    <span>{card.value}</span>
                  </SelectedCard>
                ) : (
                  <Card
                    Theme={Theme}
                    onClick={() => setTurnChoice(card.id)}
                    key={`${key}+${card.id}`}
                  >
                    {" "}
                    <Images
                      src={
                        card.effect === "DAMAGE"
                          ? char.weapon
                          : card.effect === "SHIELD"
                          ? Items.shield
                          : Items.heal
                      }
                    />{" "}
                    <span>{card.effect}</span>
                    <span>{card.value}</span>
                  </Card>
                );
              })}
          </CardsContainer>
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Chtulhu is in another UNFAIR game , Pleasing wait for your turn to
          lose...
          <Rotate>
            <Images src={Cthulhu.img} />{" "}
          </Rotate>
        </div>
      )}
    </div>
  );
};
