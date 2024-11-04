import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combinations.js"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"

const PLAYERS = {
  x: 'Player 1',
  o: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'x';
  if (gameTurns.length > 0 && gameTurns[0].player === 'x')
    currentPlayer = 'o';
  return currentPlayer;
}

function dervieGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD].map(array => [...array]);

  for(const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for(const combinations of WINNING_COMBINATIONS ) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
    const thirdSqueareSymbol = gameBoard[combinations[2].row][combinations[2].column]
    if(
      firstSquareSymbol
      && firstSquareSymbol === secondSquareSymbol
      && firstSquareSymbol === thirdSqueareSymbol) {
        winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = dervieGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer},
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player
          initialName={PLAYERS.x}
          symbol="x"
          isActive={activePlayer === 'x'}
          onChangeName={handlePlayerNameChange}
        />
        <Player
          initialName={PLAYERS.o}
          symbol="o"
          isActive={activePlayer === 'o'}
          onChangeName={handlePlayerNameChange}
        />
      </ol>
      {(winner || hasDraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>

    <Log turns={gameTurns}/>
  </main>
}

export default App
