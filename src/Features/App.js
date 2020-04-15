import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import Toggle from "./components/Toggle";
import { useDarkMode } from "../Hooks/useDarkMode";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../Features/Theme";
import GameBoard from "../Features/GameBoard/GameBoard";

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  useEffect(() => {}, [theme]);
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles>
        <div
          style={{
            display: "flex",
            width: "100%",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Toggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            alignItems: "center",
          }}
        >
          <Route exact path="/" component={Home} />
          <Route exact path="/:game" component={GameBoard} />
        </div>
      </GlobalStyles>
    </ThemeProvider>
  );
};

export default App;
