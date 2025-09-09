import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // const handleSelectSquare = (rowIndex, colIndex) => {
  //   setGameBoard((prevGameBoard) => {
  //     const updateBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
  //     updateBoard[rowIndex][colIndex] = activePlayer;
  //     return updateBoard;
  //   });
  //   onSelectSquare();
  // };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <ol key={rowIndex}>
          {row.map((palyerSymbol, colIndex) => (
            <li key={colIndex}>
              <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={palyerSymbol !== null}>
                {palyerSymbol}
              </button>
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
}
export default GameBoard;
