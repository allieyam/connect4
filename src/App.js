import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Notification } from "./Notification";

const Player = {
  none: null,
  one: 1,
  two: 2,
};

//create board container
// 7 arrays of 6 blank items, column reverse
const BoardContainer = () => {
  let initialBoard = {};
  for (let c = 0; c < 7; c++) {
    initialBoard[c] = [null, null, null, null, null, null];
  }
  const GameColumn = ({ col, id, onClick }) => {
    console.log(col, id, "column n id");
    return (
      <div className="column" id={`col-${id}`} onClick={onClick}>
        {col.map((cell, x) => {
          return (
            <span className="cell" key={`cell-${id}-${x}`} player={null}>
              {cell}
            </span>
          );
        })}
      </div>
    );
  };

  const [gameState, setGameState] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(Player.none);
  const [winner, setWinner] = useState(null);

  // const updatePlayerUI = (currentPlayer, cell) => {
  //   if (currentPlayer == Player.none) {
  //     renderCell(currentPlayer, cell);
  //     console.log("render cell in update player ui", currentPlayer);
  //     // if (currentPlayer == Player.one) {
  //     //   console.log("update player ui player 1");
  //     //   return (currentPlayer = (cell) => {
  //     //     <span className="Player.one" />;
  //     //   });
  //     // }
  //     // if (currentPlayer == Player.two) {
  //     //   console.log("update player ui player 2");
  //     //   return (cell) => {
  //     //     <span className="Player.two" />;
  //     //   };
  //   } else {
  //     return null;
  //   }
  // };

  const findPlayerForCss = (player) => {
    console.log("find player for css");
    if (player == Player.one) return "player1";
    if (player == Player.two) return "player2";
    if (player == Player.none) return "none";
  };

  // const renderCell = (player, cellIndex) => {
  //   console.log("render cell");
  //   let playerAtCell = findPlayerForCss(player);
  //   return (
  //     <div
  //       className="cell"
  //       key={cellIndex}
  //       data-player={updatePlayerUI(player)}
  //     />
  //   );
  // };
  const updateWinnerUI = (winner) => {
    return <Notification />;
  };

  const checkWin = (columnId) => {
    if (setWinner == null) {
      addPiece(columnId);
    } else {
      updateWinnerUI(setWinner);
    }
  };
  const addPiece = (columnId) => {
    const column = gameState[columnId];
    const piecePosition = column.indexOf(null);
    column[piecePosition] = currentPlayer;
    setGameState({
      ...gameState,
      [columnId]: column,
    });
    // updatePlayerUI(currentPlayer, column[piecePosition]);
    setCurrentPlayer(currentPlayer == Player.one ? Player.two : Player.one);
  };

  //check if game is over each time piece is placed
  const gameOver = (currentPlayer) => {
    let column;
    //column check
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 6 - 3; r++) {
        if (
          gameState[c][r] != null &&
          gameState[c][r] == gameState[c][r + 1] &&
          gameState[c][r + 1] == gameState[c][r + 2] &&
          gameState[c][r + 2] == gameState[c][r + 3]
        ) {
          return true;
        }
      }
    }
    //vertical check
    for (let c = 0; c < 7 - 3; c++) {
      for (let r = 0; r < 6; r++) {
        if (
          gameState[c][r] != null &&
          gameState[c][r] == gameState[c + 1][r] &&
          gameState[c + 1][r] == gameState[c + 2][r] &&
          gameState[c + 2][r] == gameState[c + 3][r]
        ) {
          return true;
        }
      }
    }

    //diagonal check
    for (let c = 0; c < 7 - 3; c++) {
      for (let r = 0; r < 6; r++) {
        if (
          gameState[c][r] != null &&
          gameState[c][r] == gameState[c + 1][r + 1] &&
          gameState[c + 1][r + 1] == gameState[c + 2][r + 2] &&
          gameState[c + 2][r + 2] == gameState[c + 3][r + 3]
        ) {
          return true;
        }
      }
    }
    //anti-diagonal check
    for (let c = 0; c < 7 - 3; c++) {
      for (let r = 0; r < 6; r++) {
        if (
          gameState[c][r] != null &&
          gameState[c][r] == gameState[c + 1][r - 1] &&
          gameState[c + 1][r - 1] == gameState[c + 2][r - 2] &&
          gameState[c + 2][r - 2] == gameState[c + 3][r - 3]
        ) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="container">
      <div className="board-container">
        {" "}
        {Object.entries(gameState).map(([key, col], x) => {
          return <GameColumn col={col} id={x} onClick={() => checkWin(x)} />;
        })}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        C
        <div class="coin">
          <div class="tails"></div>
          <div class="heads"></div>
        </div>
        NNECT 4
      </header>
      <BoardContainer />
    </div>
  );
}

export default App;
