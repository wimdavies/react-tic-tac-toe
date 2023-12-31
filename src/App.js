import {useState} from "react";
import Board from "./components/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isDescending, setIsDescending] = useState(false);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const GameInfo = () => {
    const moves = history.map((squares, move) => {    
      let description;
  
      if (move === currentMove) {
        description = 'You are at move #' + move;
      } else if (move === 0) {
        description = 'Go to game start';
      } else {
        description = 'Go to move #' + move;
      }
  
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });
    
    const handleSortClick = () => {
      const reversedOrder = !isDescending;
      setIsDescending(reversedOrder);
    }

    return (
      <div className="game-info">
        <button onClick={handleSortClick}>Sort moves in {isDescending ? 'ascending' : 'descending'} order</button>
        <ol start={isDescending ? (moves.length - 1) : 0} reversed={isDescending} >{!isDescending ? moves : moves.reverse()}</ol>
      </div>
    )
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <GameInfo />
    </div>
  );
}
