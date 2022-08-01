import "./App.css";
import { useEffect, useState } from "react";
import PlayerWin from "./Notification.js";
import WinnerScore from "./WinnerScore.js";

function App() {
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
        <div
          className="column"
          id={`col-${id}`}
          onClick={onClick}
          disabled={disabledBoard}
        >
          {col.map((cell, x) => {
            return (
              <span className="cell" key={`cell-${id}-${x}`} value={cell}>
                {cell}
              </span>
            );
          })}
        </div>
      );
    };

    const [gameState, setGameState] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState(Player.one);
    const [winner, setWinner] = useState(null);
    const [winnerUI, setWinnerUI] = useState(false);
    const [disabledBoard, setDisabledBoard] = useState(false);
    const [player1wincount, setPlayer1WinCount] = useState(0);
    const [player2wincount, setPlayer2WinCount] = useState(0);

    useEffect(() => {
      if (winner) {
        if (winner == Player.one) {
          setPlayer1WinCount(player1wincount + 1);
        } else {
          setPlayer2WinCount(player2wincount + 1);
        }
      }
      console.log("in use effect", player1wincount, player2wincount);
    }, [winner]);

    const UpdateWinnerUI = () => {
      console.log("update winner ui");
      setWinner(currentPlayer);
      setWinnerUI(true);
      setDisabledBoard(true);
      console.log(winnerUI, winner, "winner ui n winner");
      console.log("in update winner ui", player1wincount, player2wincount);
    };
    const resetGame = () => {
      setGameState(initialBoard);
      setWinner(null);
      setCurrentPlayer(Player.one);
    };

    const handleClick = (x) => {
      console.log(
        winner,
        "winner in handle click",
        disabledBoard,
        "disabled board "
      );
      winner ? UpdateWinnerUI() : addPiece(x);
    };

    const addPiece = (columnId) => {
      const column = gameState[columnId];
      const piecePosition = column.indexOf(null);
      column[piecePosition] = currentPlayer;
      console.log("current player in addpiece", currentPlayer);
      setGameState({
        ...gameState,
        [columnId]: column,
      });
      checkIfWin(columnId);
    };
    const checkIfWin = () => {
      console.log(currentPlayer, "current player in check if win");
      gameOver(currentPlayer)
        ? UpdateWinnerUI()
        : setCurrentPlayer(
            currentPlayer == Player.one ? Player.two : Player.one
          );
    };

    //check if game is over each time piece is placed
    const gameOver = () => {
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
            console.log("set winner in gameover", winner);
            setWinner(currentPlayer);
            setWinnerUI(true);
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
      console.log(winner, winnerUI);
      return false;
    };

    return (
      <div className="container">
        <PlayerWin
          className="winner"
          winner={winner}
          winnerUI={winnerUI}
          onClick={() => resetGame()}
        />

        <div className="board-container">
          {Object.entries(gameState).map(([key, col], x) => {
            return (
              <GameColumn
                col={col}
                id={x}
                onClick={() => handleClick(x)}
                pointer-events={winner ? "none" : "auto"}
              />
            );
          })}
        </div>
        <WinnerScore
          className="win-score"
          winner={winner}
          player1count={player1wincount}
          player2count={player2wincount}
        />
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        C
        <div class="coin">
          <div class="tails"></div>
          <div class="heads"></div>
        </div>
        NNECT4
      </header>

      <BoardContainer />
    </div>
  );
}

export default App;
