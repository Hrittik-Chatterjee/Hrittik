"use client";
import { useState, useEffect, useCallback } from "react";

const GRID_SIZE = 20;

type Point = { x: number; y: number };

export default function Snake() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Point>({ x: 0, y: -1 });
  const [nextDir, setNextDir] = useState<Point>({ x: 0, y: -1 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("snake_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const spawnFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y)) break;
    }
    return newFood;
  }, []);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDir({ x: 0, y: -1 });
    setNextDir({ x: 0, y: -1 });
    setScore(0);
    setFood(spawnFood([{ x: 10, y: 10 }]));
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const handleInput = useCallback((dx: number, dy: number) => {
    setNextDir(prev => {
      // Prevent reversing into itself
      if (prev.x === -dx && prev.y === -dy) return prev;
      return { x: dx, y: dy };
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": handleInput(0, -1); e.preventDefault(); break;
        case "ArrowDown": handleInput(0, 1); e.preventDefault(); break;
        case "ArrowLeft": handleInput(-1, 0); e.preventDefault(); break;
        case "ArrowRight": handleInput(1, 0); e.preventDefault(); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput]);

  useEffect(() => {
    if (!isPlaying) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const head = prev[0];
        setDir(nextDir); // lock in the move
        const newHead = { x: head.x + nextDir.x, y: head.y + nextDir.y };

        // Wall Collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE ||
          prev.some((s) => s.x === newHead.x && s.y === newHead.y)
        ) {
          setIsGameOver(true);
          setIsPlaying(false);
          setHighScore((prevHi) => {
             if (score > prevHi) {
               localStorage.setItem("snake_highscore", score.toString());
               return score;
             }
             return prevHi;
          });
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Food Collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const speed = Math.max(50, 150 - score); // Gets faster
    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [isPlaying, nextDir, food, score, spawnFood]);

  return (
    <div style={{ padding: 20, background: "#C0C0C0", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'VT323', monospace" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 400, fontSize: 24, marginBottom: 10, background: "#000", color: "#00FF00", padding: "4px 12px", border: "2px solid #808080" }}>
        <span>SCORE: {score}</span>
        <span>HI: {highScore}</span>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 400, aspectRatio: "1/1", background: "#000", border: "4px solid #808080", boxShadow: "inset 4px 4px rgba(255,255,255,0.2)" }}>
        {/* Render Grid */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "grid", gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}>
          {snake.map((segment, i) => (
            <div key={i} style={{ gridColumnStart: segment.x + 1, gridRowStart: segment.y + 1, background: i === 0 ? "#00FF00" : "#00AA00", border: "1px solid #000" }} />
          ))}
          <div style={{ gridColumnStart: food.x + 1, gridRowStart: food.y + 1, background: "#FF0000", borderRadius: "50%" }} />
        </div>

        {/* Overlays */}
        {!isPlaying && !isGameOver && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
            <h1 style={{ fontSize: 48, color: "#00FF00", margin: 0 }}>SNAKE</h1>
            <button onClick={startGame} style={{ marginTop: 20, fontSize: 24, padding: "8px 24px", background: "#C0C0C0", fontFamily: "'VT323', monospace", cursor: "pointer", border: "2px solid #FFF", color: "black", fontWeight: "bold" }}>START</button>
          </div>
        )}
        
        {isGameOver && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "red" }}>
            <h1 style={{ fontSize: 48, margin: 0 }}>GAME OVER</h1>
            <button onClick={startGame} style={{ marginTop: 20, fontSize: 24, padding: "8px 24px", background: "#C0C0C0", fontFamily: "'VT323', monospace", cursor: "pointer", border: "2px solid #FFF", color: "black", fontWeight: "bold" }}>TRY AGAIN</button>
          </div>
        )}
      </div>

      {/* Mobile D-Pad */}
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(3, 60px)", gridTemplateRows: "repeat(3, 60px)", gap: 10 }}>
        <div />
        <button onClick={() => handleInput(0, -1)} style={{ background: "#808080", border: "4px solid #DFDFDF", borderBottomColor: "#404040", borderRightColor: "#404040", cursor: "pointer" }}>⬆️</button>
        <div />
        <button onClick={() => handleInput(-1, 0)} style={{ background: "#808080", border: "4px solid #DFDFDF", borderBottomColor: "#404040", borderRightColor: "#404040", cursor: "pointer" }}>⬅️</button>
        <div style={{ background: "#404040", borderRadius: "50%" }} />
        <button onClick={() => handleInput(1, 0)} style={{ background: "#808080", border: "4px solid #DFDFDF", borderBottomColor: "#404040", borderRightColor: "#404040", cursor: "pointer" }}>➡️</button>
        <div />
        <button onClick={() => handleInput(0, 1)} style={{ background: "#808080", border: "4px solid #DFDFDF", borderBottomColor: "#404040", borderRightColor: "#404040", cursor: "pointer" }}>⬇️</button>
        <div />
      </div>
    </div>
  );
}
