import React, { useEffect, useState } from "react";
import "./game1.css";

const styles = {
  border: "1px solid black",
  height: "60px",
  width: "60px",
  fontSize: "20px",
  cursor: "pointer",
};

function Square({ value, idx, handleClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "win" : ""}`}
      style={{
        ...styles,
        backgroundColor: isWinning ? "lightgreen" : "white",
      }}
      onClick={() => handleClick(idx)}
    >
      {value}
    </button>
  );
}

function checkWinner(arr) {
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of patterns) {
    if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) {
      return { winner: arr[a], line: [a, b, c] };
    }
  }

  return null;
}

function Game1() {
  const [arr, setArr] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winLine, setWinLine] = useState(null);

  function handleChange(idx) {
    if (arr[idx] || winner) return;

    const newArr = [...arr];
    newArr[idx] = player;
    setArr(newArr);

    setPlayer(player === "X" ? "O" : "X");
  }

  // ✅ Check winner
  useEffect(() => {
    const result = checkWinner(arr);

    if (result) {
      setWinner(result.winner);
      setWinLine(result.line);
    } else if (!arr.includes(null)) {
      setWinner("Draw");
    }
  }, [arr]);

  function restartGame() {
    setArr(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
    setWinLine(null);
  }

  return (
    <div className="game-container">
      <div style={{ textAlign: "center" }}>
        <h1>Tic Tac Toe</h1>

        {!winner && <h2>Current Player: {player}</h2>}

        {winner && (
          <h2>
            {winner === "Draw" ? "😅 It's a Draw!" : `🎉 Winner: ${winner}`}
          </h2>
        )}

        <div className="boxes">
          {arr.map((val, idx) => (
            <Square
              key={idx}
              value={val}
              idx={idx}
              handleClick={handleChange}
              isWinning={winLine && winLine.includes(idx)}
            />
          ))}
          {console.log(winLine)}
          {winLine && <div className={`line line-${winLine.join("")}`}></div>}
        </div>

        <br />

        <button onClick={restartGame}>Restart 🔄</button>
      </div>
    </div>
  );
}

export default Game1;
