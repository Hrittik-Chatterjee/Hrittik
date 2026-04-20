"use client";
import { useState, useEffect, useCallback } from "react";

const ROWS = 8;
const COLS = 8;
const MINES = 10;

type Cell = {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

export default function Minesweeper() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [isFlagMode, setIsFlagMode] = useState(false); // For mobile users
  const [wins, setWins] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("minesweeper_wins");
    if (saved) setWins(parseInt(saved, 10));
    initGame();
  }, []);

  const initGame = useCallback(() => {
    // 1. Create Empty Grid
    let newGrid: Cell[][] = Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, (_, c) => ({
        row: r,
        col: c,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );

    // 2. Place Mines
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        minesPlaced++;
      }
    }

    // 3. Count Neighbors
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          directions.forEach(([dr, dc]) => {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].isMine) {
              count++;
            }
          });
          newGrid[r][c].neighborMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setVictory(false);
  }, []);

  const revealCell = (r: number, c: number) => {
    if (gameOver || victory || grid[r][c].isRevealed || grid[r][c].isFlagged) return;

    const newGrid = [...grid.map(row => [...row])];
    
    if (newGrid[r][c].isMine) {
      // Game Over: Reveal all mines
      newGrid.forEach(row => row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true;
      }));
      setGrid(newGrid);
      setGameOver(true);
      return;
    }

    // Flood Fill for 0 neighbors
    const floodFill = (row: number, col: number) => {
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS || newGrid[row][col].isRevealed || newGrid[row][col].isFlagged) return;
      
      newGrid[row][col].isRevealed = true;
      
      if (newGrid[row][col].neighborMines === 0) {
        const directions = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];
        directions.forEach(([dr, dc]) => floodFill(row + dr, col + dc));
      }
    };

    floodFill(r, c);
    setGrid(newGrid);
    checkVictory(newGrid);
  };

  const toggleFlag = (e: React.MouseEvent | null, r: number, c: number) => {
    if (e) e.preventDefault(); // prevent context menu
    if (gameOver || victory || grid[r][c].isRevealed) return;

    const newGrid = [...grid.map(row => [...row])];
    newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
    setGrid(newGrid);
  };

  const handleClick = (e: React.MouseEvent, r: number, c: number) => {
    if (isFlagMode) {
      toggleFlag(null, r, c);
    } else {
      revealCell(r, c);
    }
  };

  const checkVictory = (currentGrid: Cell[][]) => {
    let unrevealedSafeCells = 0;
    currentGrid.forEach(row => {
      row.forEach(cell => {
        if (!cell.isMine && !cell.isRevealed) unrevealedSafeCells++;
      });
    });

    if (unrevealedSafeCells === 0) {
      setVictory(true);
      setWins(prev => {
        const newWins = prev + 1;
        localStorage.setItem("minesweeper_wins", newWins.toString());
        return newWins;
      });
    }
  };

  return (
    <div style={{ padding: 20, background: "#C0C0C0", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'VT323', monospace", userSelect: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: 320, fontSize: 24, marginBottom: 10, background: "#000", color: "#00FF00", padding: "4px 12px", border: "2px solid #808080" }}>
        <span>WINS: {wins}</span>
        <button 
          onClick={() => setIsFlagMode(!isFlagMode)} 
          style={{ background: isFlagMode ? "#404040" : "#C0C0C0", color: isFlagMode ? "white" : "black", border: "2px solid", borderColor: isFlagMode ? "#000 #FFF #FFF #000" : "#FFF #000 #000 #FFF", cursor: "pointer", fontFamily: "'VT323', monospace", padding: "0 8px" }}
        >
          {isFlagMode ? "🚩 FLAG MODE" : "👆 TAP MODE"}
        </button>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 320, background: "#808080", border: "4px solid #DFDFDF", borderBottomColor: "#404040", borderRightColor: "#404040", padding: 4 }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 34px)`, gap: 2 }}>
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={(e) => handleClick(e, r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                style={{
                  width: 34, height: 34,
                  flexShrink: 0,
                  background: cell.isRevealed ? "#C0C0C0" : "#DFDFDF",
                  border: "3px solid",
                  borderColor: cell.isRevealed ? "#808080" : "#FFF #808080 #808080 #FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: cell.neighborMines === 1 ? "blue" : cell.neighborMines === 2 ? "green" : cell.neighborMines === 3 ? "red" : "black",
                  cursor: (cell.isRevealed || gameOver || victory) ? "default" : "pointer",
                  padding: 0,
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {cell.isRevealed ? (
                  cell.isMine ? "💣" : cell.neighborMines > 0 ? cell.neighborMines : ""
                ) : (
                  cell.isFlagged ? "🚩" : ""
                )}
              </button>
            ))
          )}
        </div>

        {(gameOver || victory) && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
            <h1 style={{ fontSize: 52, margin: 0, color: victory ? "#00FF00" : "#FF0000", textShadow: "2px 2px #000" }}>
              {victory ? "YOU WIN!" : "BOOM."}
            </h1>
            <button onClick={initGame} style={{ marginTop: 20, fontSize: 24, padding: "8px 24px", background: "#C0C0C0", fontFamily: "'VT323', monospace", cursor: "pointer", border: "2px solid #FFF", color: "black", fontWeight: "bold" }}>PLAY AGAIN</button>
          </div>
        )}
      </div>

      <p style={{ textAlign: "center", maxWidth: 320, marginTop: 20, fontSize: 16, lineHeight: 1.2 }}>Right-Click to Flag mines. On Mobile, toggle 'FLAG MODE' on the top right.</p>
    </div>
  );
}
