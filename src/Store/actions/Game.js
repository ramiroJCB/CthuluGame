import axios from "axios";

export const NewGame = (name) => async (dispatch) => {
  try {
    //Data with Game ID
    const { data } = await axios.post("http://game.bons.me/api/games", {
      name: name,
    });
    dispatch(Board(data.id));
    dispatch({ type: "GAME_ID", payload: data.id });
  } catch (error) {
    throw new TypeError(`Something went Wrong, ${error.message}`);
  }
};

export const nextTurn = (cardId, gameId) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `http://game.bons.me/api/games/${gameId}/next-turn`,
      {
        card: cardId,
      }
    );

    //game with NEXT-TURN data and MONSTER Effect
    dispatch(Board(data.game.id));
    dispatch({ type: "MONSTER_EFFECT", payload: data.monsterEffect });
  } catch (error) {
    throw new TypeError(`Something went Wrong, ${error.message}`);
  }
};

export const Board = (gameId) => async (dispatch) => {
  try {
    //fetchs
    const playerPromise = await axios.get(
      `http://game.bons.me/api/games/${gameId}/player`
    );
    const monsterPromise = await axios.get(
      `http://game.bons.me/api/games/${gameId}/monster`
    );
    const gamePromise = await axios.get(
      `http://game.bons.me/api/games/${gameId}`
    );

    //playerCards
    const playerCardPromise = await axios.get(
      `http://game.bons.me/api/players/${playerPromise.data.id}/cards`
    );

    //Responses
    const game = gamePromise.data;
    const player = playerPromise.data;
    const monster = monsterPromise.data;
    const playerCards = playerCardPromise.data;

    dispatch({
      type: "GAME_DATA",
      payload: {
        gameInfo: game,
        playerInfo: player,
        monsterInfo: monster,
        //Bug with  applying next without cards, the api Brings cards not selected  before and only one card new
        playerCards:
          playerCards.length > 3
            ? playerCards.slice(playerCards.length - 3)
            : playerCards,
      },
    });
  } catch (error) {
    throw new TypeError(`Something went Wrong, ${error.message}`);
  }
};
