import { act, useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurn);

  const handleSelectSquare = (rowIndex, colIndex) => {
    // setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
    setGameTurn((prev) => {
      const currentPlayer = deriveActivePlayer(prev);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prev,
      ];

      return updatedTurns;
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" activePlayer={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" activePlayer={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurn} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
