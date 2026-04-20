"use client";
import { useState, useEffect, useCallback } from "react";

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diags
];

export default function TicTacToe() {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [wins, setWins] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("tictactoe_wins");
    if (saved) setWins(parseInt(saved, 10));
  }, []);

  const checkWinner = (squares: Array<string | null>) => {
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (!squares.includes(null)) return "DRAW";
    return null;
  };

  const handleCellClick = (index: number) => {
    if (!isPlayerTurn || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    
    const win = checkWinner(newBoard);
    if (win) {
      handleGameOver(win);
    } else {
      setIsPlayerTurn(false);
    }
  };

  const handleGameOver = useCallback((win: string) => {
    setWinner(win);
    if (win === "X") {
      setWins(prev => {
        const newWins = prev + 1;
        localStorage.setItem("tictactoe_wins", newWins.toString());
        return newWins;
      });
    }
  }, []);

  // AI Turn
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
        
        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = [...board];
          newBoard[randomIndex] = "O";
          setBoard(newBoard);
          
          const win = checkWinner(newBoard);
          if (win) {
            handleGameOver(win);
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 600); // Artificial delay to simulate thinking
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner, handleGameOver]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  return (
    <div style={{ padding: 20, background: "#C0C0C0", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'VT323', monospace", userSelect: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 300, fontSize: 24, marginBottom: 20, background: "#000", color: "#00FF00", padding: "4px 12px", border: "2px solid #808080" }}>
        <span>WINS: {wins}</span>
        <span>{isPlayerTurn && !winner ? "YOUR TURN" : (!isPlayerTurn && !winner ? "AI THINKING..." : "GAME OVER")}</span>
      </div>

      <div style={{ position: "relative", width: 300, height: 300, background: "#808080", border: "4px solid #DFDFDF", borderBottomColor: "#404040", borderRightColor: "#404040", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: 4, padding: 4 }}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            style={{
              background: "#C0C0C0",
              border: "3px solid #DFDFDF",
              borderBottomColor: "#404040",
              borderRightColor: "#404040",
              fontSize: 64,
              fontFamily: "sans-serif",
              fontWeight: "bold",
              color: cell === "X" ? "#CC0000" : "#0000CC",
              cursor: (!cell && isPlayerTurn && !winner) ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cell}
          </button>
        ))}

        {winner && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
            <h1 style={{ fontSize: 52, margin: 0, color: winner === "X" ? "#00FF00" : winner === "O" ? "#FF0000" : "#FFCC00" }}>
              {winner === "DRAW" ? "DRAW!" : winner === "X" ? "YOU WIN!" : "AI WINS!"}
            </h1>
            <button onClick={resetGame} style={{ marginTop: 20, fontSize: 24, padding: "8px 24px", background: "#C0C0C0", fontFamily: "'VT323', monospace", cursor: "pointer", border: "2px solid #FFF", color: "black", fontWeight: "bold" }}>PLAY AGAIN</button>
          </div>
        )}
      </div>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>You play as X. The AI plays as O.</p>
    </div>
  );
}
