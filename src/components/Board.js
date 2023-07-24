import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  }
  
  let status = '';
  const winner = calculateWinner(squares);
  if (!winner && !squares.includes(null)) {
    status = "Result: draw";
  } else if (winner) {
    status = `Result: ${winner.winningPlayer} wins`;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  
  const board = [];
  const boardSize = 3;
  for (let i = 0; i < boardSize; i++) {
    const rows = [];
    for (let j = 0; j < boardSize; j++) {
      const index = i * boardSize + j;
      rows.push(<Square key={index} value={squares[index]} isWinning={winner && winner.winningSquares.includes(index)} onSquareClick={() => handleClick(index)} />);
    }
    board.push(<div key={i} className="board-row">{rows}</div>)
  }
  
  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winningPlayer: squares[a],
        winningSquares: [a, b, c]
      };
    }
  }

  return null;
}