export default function Square({ value, isWinning, onSquareClick }) {
  return (
    <button className={"square" + (isWinning ? " square--winning" : "")} onClick={onSquareClick}>
      {value}
    </button>
  );
}
