import React, { useReducer } from "react";
import Board from "./Board";
const reducer = (state, action) => {
  switch (action.type) {
    case "JUMP":
      return {
        ...state,
        xIsNext: action.payload.step % 2 === 0,
        history: state.history.slice(0, action.payload.step + 1),
      };
    case "MOVE":
      return {
        ...state,
        history: state.history.concat({
          squares: action.payload.squares,
        }),
        xIsNext: !state.xIsNext,
      };

    default:
      return state;
  }
};
export default function Game() {
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  });
  const { xIsNext, history } = state;
  const jumpTo = (step) => {
    dispatch({ type: "JUMP", payload: { step } });
  };
  const handelClick = (i) => {
    // get the last elm from the hist
    const current = history[history.length - 1];
    // geting a copy of the square
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    dispatch({ type: "MOVE", payload: { squares } });
  };
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);

  const status = winner
    ? winner === "D"
      ? "Draw"
      : "winner is " + winner
    : "Next Player Is " + (xIsNext ? "X" : "O");
  const moves = history.map((step, move) => {
    const desc = move ? "Go to #" + move : "start the game";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div>
      <div className="Game-Board">
        <Board
          onClick={(i) => handelClick(i)}
          squares={current.squares}
        ></Board>
      </div>
      <div className="Game-info">
        <div>{status}</div>
        <div>{moves}</div>
      </div>
    </div>
  );
}

const calculateWinner = (squares) => {
  // indicate the way to win haha:)
  const winnerLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let isDraw = true;
  for (let i = 0; i < winnerLine.length; i++) {
    const [a, b, c] = winnerLine[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
    if (!squares[a] || !squares[b] || !squares[c]) {
      isDraw = false;
    }
  }
  if (isDraw) return "D";
  return null;
};
