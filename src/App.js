import React, { useState, useEffect, useCallback } from 'react';

import oImage from './assets/pikachu.svg';
import xImage from './assets/charmander.svg';

import './styles.css';

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([]);
  const [gameover, setGameover] = useState(false);

  const players = ['O', 'X'];
  const currentPlayer = players[history.length % 2];

  const calculateWinner = useCallback(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every((square) => square !== null)) {
      return "draw";
    }

    return null;
  }, [squares]);

  useEffect(() => {
    const winner = calculateWinner();
    if (winner) {
      setGameover(true);
    }
  }, [squares, calculateWinner]);

  function handleClick(index) {
    if (gameover || squares[index]) return;

    const newSquares = squares.slice();
    newSquares[index] = currentPlayer;
    const newHistory = history.concat({ index, player: currentPlayer });

    setSquares(newSquares);
    setHistory(newHistory);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setHistory([]);
    setGameover(false);
  }

  const winner = calculateWinner();

  return (
    <div id="root">
      <div className="game">
        <div className="board">
          {squares.map((value, index) => (
            <div className="square" key={index} onClick={() => handleClick(index)}>
              {value === 'O' && <img src={oImage} alt="O" className="player-image" />}
              {value === 'X' && <img src={xImage} alt="X" className="player-image" />}
            </div>
          ))}
        </div>
        <div className="info">
          {gameover && (
            <div>
              <div>{winner === 'draw' ? '平局' : '贏家：'}</div>
              {winner === 'O' ? <img src={oImage} alt="O" className="player-image" /> : winner === 'X' ? <img src={xImage} alt="X" className="player-image" /> : null}
            </div>
          )}
          {!gameover && <div>{`下一位玩家：${currentPlayer}`}</div>}
          <button onClick={handleReset}>重新開始</button>
        </div>
      </div>
    </div>
  );
}

export default Game;
