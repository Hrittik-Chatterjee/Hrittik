"use client";
import { useEffect, useRef, useState } from "react";

export default function DevRun() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Physics constants
  const GRAVITY = 0.6;
  const JUMP_POWER = -10;
  const GROUND_Y = 150;

  // Refs for animation loop decoupled from React state
  const gameState = useRef({
    playerY: GROUND_Y,
    velocityY: 0,
    isJumping: false,
    obstacles: [] as { x: number; y: number; width: number; height: number; speed: number }[],
    score: 0,
    speedMultiplier: 1,
    animationFrame: 0,
    framesAlive: 0,
    playing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("devrun_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      const state = gameState.current;
      if (!state.playing) return;

      // Update Physics
      state.velocityY += GRAVITY;
      state.playerY += state.velocityY;

      if (state.playerY >= GROUND_Y) {
        state.playerY = GROUND_Y;
        state.velocityY = 0;
        state.isJumping = false;
      }

      state.framesAlive++;
      
      // Speed increases slowly
      if (state.framesAlive % 500 === 0) state.speedMultiplier += 0.1;

      // Spawn Obstacles
      if (Math.random() < 0.015 && state.obstacles.length < 3) {
        // Ensure minimum distance from last obstacle
        const lastObs = state.obstacles[state.obstacles.length - 1];
        if (!lastObs || lastObs.x < 400) {
           state.obstacles.push({
             x: 600,
             y: GROUND_Y + 10, // bug on ground
             width: 24,
             height: 24,
             speed: 5 * state.speedMultiplier
           });
        }
      }

      // Update Obstacles & Check Collisions
      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obs = state.obstacles[i];
        obs.x -= obs.speed;
        
        // Remove offscreen
        if (obs.x < -30) {
          state.obstacles.splice(i, 1);
          state.score += 10;
          setCurrentScore(state.score);
        }

        // Collision Hitbox: Player is ~32x32 at (50, playerY)
        const playerHitbox = { x: 50, y: state.playerY - 20, width: 24, height: 24 };
        const obsHitbox = { x: obs.x, y: obs.y - 24, width: obs.width, height: obs.height };

        if (
          playerHitbox.x < obsHitbox.x + obsHitbox.width &&
          playerHitbox.x + playerHitbox.width > obsHitbox.x &&
          playerHitbox.y < obsHitbox.y + obsHitbox.height &&
          playerHitbox.y + playerHitbox.height > obsHitbox.y
        ) {
          // HIT!
          state.playing = false;
          setIsPlaying(false);
          setIsGameOver(true);
          // Check high score
          setHighScore(prev => {
            if (state.score > prev) {
              localStorage.setItem("devrun_highscore", state.score.toString());
              return state.score;
            }
            return prev;
          });
        }
      }

      // Render
      ctx.clearRect(0, 0, 600, 200);

      // Draw Ground
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, GROUND_Y + 5, 600, 2);

      // Draw Player (Developer)
      ctx.font = "32px serif";
      ctx.fillText("👨‍💻", 40, state.playerY + 5);

      // Draw Obstacles (Bugs)
      ctx.font = "24px serif";
      for (const obs of state.obstacles) {
        ctx.fillText("🐛", obs.x, obs.y);
      }

      state.animationFrame = requestAnimationFrame(loop);
    };

    if (isPlaying) {
      gameState.current.animationFrame = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(gameState.current.animationFrame);
  }, [isPlaying]);

  const jump = () => {
    const state = gameState.current;
    if (state.playing && !state.isJumping) {
      state.velocityY = JUMP_POWER;
      state.isJumping = true;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const startGame = () => {
    gameState.current = {
      playerY: GROUND_Y,
      velocityY: 0,
      isJumping: false,
      obstacles: [],
      score: 0,
      speedMultiplier: 1,
      animationFrame: 0,
      framesAlive: 0,
      playing: true,
    };
    setCurrentScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div style={{ padding: 20, background: "#C0C0C0", height: "100%", display: "flex", flexDirection: "column", fontFamily: "'VT323', monospace" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, marginBottom: 10, background: "#000", color: "#00FF00", padding: "4px 12px", border: "2px solid #808080" }}>
        <span>SCORE: {currentScore}</span>
        <span>HI: {highScore}</span>
      </div>
      
      <div style={{ position: "relative", border: "4px solid #808080", background: "#FFFFFF", width: "100%", maxWidth: 600, height: 200, margin: "0 auto", overflow: "hidden", cursor: "pointer" }} onMouseDown={jump}>
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
        
        {!isPlaying && !isGameOver && (
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", color: "white" }}>
            <h1 style={{ fontSize: 36, margin: 0, color: "#00FF00" }}>DEV RUN</h1>
            <p style={{ fontSize: 20, marginBottom: 20 }}>Jump over the software bugs!</p>
            <button onClick={(e) => { e.stopPropagation(); startGame(); }} style={{ fontSize: 24, padding: "8px 24px", cursor: "pointer", fontFamily: "'VT323', monospace", background: "#C0C0C0", border: "2px solid #FFFFFF" }}>START GAME</button>
          </div>
        )}

        {isGameOver && (
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", color: "white" }}>
            <h1 style={{ fontSize: 42, margin: 0, color: "#FF0000" }}>PRODUCTION DOWN</h1>
            <p style={{ fontSize: 24, marginBottom: 20 }}>A bug got into prod! Score: {currentScore}</p>
            <button onClick={(e) => { e.stopPropagation(); startGame(); }} style={{ fontSize: 24, padding: "8px 24px", cursor: "pointer", fontFamily: "'VT323', monospace", background: "#C0C0C0", border: "2px solid #FFFFFF" }}>RESTART SERVER</button>
          </div>
        )}
      </div>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>Press SPACEBAR or click the game screen to JUMP.</p>
    </div>
  );
}
