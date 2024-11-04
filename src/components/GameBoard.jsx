export default function GameBoard({onSelectSquare, board}) {
  return <>
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button className="cell" onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                  <p className="cell-button">
                    {playerSymbol}
                  </p>
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  </>
}