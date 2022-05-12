import React, { useState } from 'react';
import { Board } from './Board.js';

export const Game = () => {
  const [gameHistory, setGameHistory] = useState([{squares: Array(9).fill(null)}])
  const [step, setStep] = useState(0) 
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = i => {
    const history = gameHistory.slice(0, step + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setGameHistory(history.concat([{squares: squares}]))
    setStep(history.length) 
    setXIsNext(xIsNext => !xIsNext)
    
  }

  const jumpTo = step => {
    setStep(step)
    setXIsNext((step % 2) === 0)
  }

  const calculateWinner = squares => {
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
        return squares[a];
      }
    }
    return null;
  }

  const current = gameHistory[step];
  const winner = calculateWinner(current.squares);

  const moves = gameHistory.map((step, move) => {
    const desc = move ?
      `Go to move # ${move}` :
      `Go to game start`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${(xIsNext ? "X" : "O")}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}