import React from "react";
import Board from "./Board";

export default function Game() {

    const status ="Next Player Is X"
    const moves=<li><button>Start The Game</button></li>
    const squares=Array(9).fill(null)
  return (
    <div>
      <div className="Game-Board">
        <Board squares={squares}></Board>
      </div>
      <div className="Game-info">
        <div>{status}</div>
        <div>{moves}</div>
      </div>
    </div>
  );
}
