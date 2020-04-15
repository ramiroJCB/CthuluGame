import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//
import { Races, Weapons } from "./Icons";
//
import { NewGame } from "../../Store/actions/Game";
//
import { GlowTitle, ImageFloating, Buttons, Input, Images } from "./styles";
import Axios from "axios";

export default () => {
  //Comun Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  //Character Hooks
  const [selectedRace, setSelectedRace] = useState(0);
  const [selectedChar, setSelectedChar] = useState("");
  const [input, setInput] = useState("");
  //Theme...
  const Theme = localStorage.getItem("theme");

  const getRandonName = async () => {
    const namePromise = await Axios.get(
      "https://cors-anywhere.herokuapp.com/http://api.namefake.com/"
    );
    const responde = await namePromise.data;
    setInput(responde.name);
  };
  const CharacterCustom = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <>
            <h2>Availbale Race Weapons </h2>
          </>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {Weapons[selectedChar.Race].map((Weapon, key) => {
              return selectedChar.weaponId === key ? (
                <ImageFloating key={`${key}`} src={Weapon} />
              ) : (
                <Images
                  key={`${key}`}
                  onClick={() =>
                    setSelectedChar({
                      ...selectedChar,
                      weapon: Weapon,
                      weaponId: key,
                    })
                  }
                  src={Weapon}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <div style={{ height: "90vh", width: "auto" }}>
      <GlowTitle Theme={localStorage.getItem("theme")}>
        Welcome to Cthulhu's Almost Impossible Game
      </GlowTitle>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* ----->Character Selection <-----*/}

        <div>
          <div
            style={{
              display: "flex",
              margin: "7vh",
              flexFlow: "wrap column",
              alignItems: "center",
            }}
          >
            {" "}
            <h1>Choose Your Race Please</h1>{" "}
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {Races &&
              Races.map((race, key) => {
                return (
                  <Fragment key={`${key}+${race.race}`}>
                    <Buttons
                      Selected={key === selectedRace}
                      Theme={Theme}
                      onClick={() => {
                        setSelectedRace(key);
                      }}
                    >
                      {" "}
                      {race.race}
                    </Buttons>
                  </Fragment>
                );
              })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "55vw",
            }}
          >
            {Races[selectedRace].characters.map((chars, key) => (
              <div
                onClick={() =>
                  setSelectedChar({
                    id: key,
                    Race: Races[selectedRace].race,
                    Char: Races[selectedRace].characters[key],
                  })
                }
                key={`${key}`}
                style={{
                  maxWidth: "80%",
                  margin: "1vh",
                  padding: 0,
                }}
              >
                {selectedChar.id === key &&
                selectedChar.Race === Races[selectedRace].race ? (
                  <ImageFloating src={chars} />
                ) : (
                  <Images src={chars} />
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              margin: "7vh",
              flexFlow: "wrap ",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedChar && CharacterCustom()}
          </div>
        </div>
        <div>
          {/* ----->Name Selection <-----*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                margin: "7vh",
                flexFlow: "wrap column",
                alignItems: "center",
              }}
            >
              {" "}
              <h1>Choose Your Name</h1>{" "}
            </div>
            <Input
              onChange={({ target }) => setInput(target.value)}
              type="text"
              id="fname"
              name="fname"
              placeholder="Name Pls.."
              value={input}
            />

            <Buttons Theme={Theme} onClick={() => getRandonName()}>
              Name Generator
            </Buttons>
            {selectedChar.Char && (
              <div>
                {/*-----> Your Character <----*/}
                <div
                  style={{
                    display: "flex",
                    margin: "3vh",
                    flexFlow: "wrap column",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <h1>Your Character</h1>{" "}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ImageFloating src={selectedChar.Char} />

                  {selectedChar.weapon && (
                    <ImageFloating src={selectedChar.weapon} />
                  )}
                </div>
              </div>
            )}
            {selectedChar.Char && selectedChar.weapon && input && (
              <Buttons
                Theme={Theme}
                disabled={input.length === "" || !selectedChar}
                onClick={() => {
                  history.push("game");
                  dispatch(NewGame(input));
                  dispatch({ type: "USER_DATA", payload: selectedChar });
                }}
              >
                Play!
              </Buttons>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
