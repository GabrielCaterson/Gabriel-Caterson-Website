/*
This is a game where you click the screen and the ball bounces away from where you clicked. 

You have to bounce the ball to the target within the number of clicks that the game allows. 

The game gets harder every five levels. With each increase in difficulty, the number of obstacles and enemies increases by one.

The game starts with two enemies who chase you. 

A random number of obstacles between 2 and 7 will also spawn in.

The player and the enemies should never spawn on the obstacles, and the enemies should spawn at least half the screen away from the player.

The player's ball should lose velocity over time, and should hit zero after 3 seconds.

The player should lose if they are hit by an enemy.

The player wins if they hit the target before their clicks run out.

The player has twice as many clicks as there are obstacles in the level.

*/

import React, { useState, useEffect, useCallback, useRef } from 'react';
import GameBoard from './GameBoard';

const TargetGame = () => {
  const [gameSize, setGameSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [ballPosition, setBallPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [ballVelocity, setBallVelocity] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: window.innerWidth / 2, y: 50 });
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [settings, setSettings] = useState({ isOpen: false, clickTowards: false, difficulty: 'medium' });
  const lastClickTime = useRef(0);
  const initialVelocity = useRef({ x: 0, y: 0 });

  const [level, setLevel] = useState(1);
  const baseEnemyCount = 2; // Always start with 2 enemies

  const ballRadius = 10;
  const targetSize = 20;
  const bounceStrength = 10;
  const friction = 0.98;
  const travelDuration = 3000; // 3 seconds in milliseconds
  const enemySize = 15;
  const enemySpeed = settings.difficulty === 'easy' ? 0.5 : settings.difficulty === 'medium' ? 1 : 1.5;

  const generateObstacles = useCallback(() => {
    const obstacleCount = Math.floor(Math.random() * 6) + 2; // 2 to 7 obstacles
    const newObstacles = [];
    for (let i = 0; i < obstacleCount; i++) {
      let newObstacle;
      do {
        newObstacle = {
          x: Math.random() * (gameSize.width - 100),
          y: Math.random() * (gameSize.height - 100),
          width: Math.random() * 50 + 50,
          height: Math.random() * 50 + 50,
        };
      } while (isOverlapping(newObstacle, newObstacle.width, newObstacles));
      newObstacles.push(newObstacle);
    }
    return newObstacles;
  }, [gameSize]);

  const isOverlapping = (pos, size, obstacles) => {
    return obstacles.some(obstacle => 
      pos.x < obstacle.x + obstacle.width &&
      pos.x + size > obstacle.x &&
      pos.y < obstacle.y + obstacle.height &&
      pos.y + size > obstacle.y
    );
  };

  const generatePosition = useCallback((size, currentObstacles) => {
    let newPos;
    do {
      newPos = {
        x: Math.random() * (gameSize.width - size),
        y: Math.random() * (gameSize.height - size),
      };
    } while (isOverlapping(newPos, size, currentObstacles));
    return newPos;
  }, [gameSize]);

  const generateTarget = useCallback((currentObstacles) => {
    return generatePosition(targetSize, currentObstacles);
  }, [generatePosition, targetSize]);

  const generateBallPosition = useCallback((currentObstacles) => {
    return generatePosition(ballRadius * 2, currentObstacles);
  }, [generatePosition, ballRadius]);

  const generateEnemies = useCallback((count, currentObstacles, playerPos) => {
    const newEnemies = [];
    const minDistance = Math.min(gameSize.width, gameSize.height) / 3; // Minimum spawn distance from player

    for (let i = 0; i < count; i++) {
      let enemyPos;
      let attempts = 0;
      const maxAttempts = 100; // Prevent infinite loop

      do {
        enemyPos = generatePosition(enemySize, currentObstacles);
        const distanceFromPlayer = Math.hypot(enemyPos.x - playerPos.x, enemyPos.y - playerPos.y);
        attempts++;

        if (attempts >= maxAttempts) {
          console.warn('Could not find a suitable spawn position for enemy');
          break;
        }
      } while (
        isOverlapping(enemyPos, enemySize, [...currentObstacles, ...newEnemies]) ||
        Math.hypot(enemyPos.x - playerPos.x, enemyPos.y - playerPos.y) < minDistance
      );

      if (attempts < maxAttempts) {
        newEnemies.push(enemyPos);
      }
    }
    return newEnemies;
  }, [gameSize, generatePosition]);

  useEffect(() => {
    const handleResize = () => {
      setGameSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    
    const initialObstacles = generateObstacles();
    setObstacles(initialObstacles);
    setTargetPosition(generateTarget(initialObstacles));
    setBallPosition(generateBallPosition(initialObstacles));
    setEnemies(generateEnemies(settings.difficulty === 'easy' ? 1 : settings.difficulty === 'medium' ? 2 : 3, initialObstacles, { x: window.innerWidth / 2, y: window.innerHeight / 2 }));

    return () => window.removeEventListener('resize', handleResize);
  }, [generateObstacles, generateTarget, generateBallPosition, generateEnemies, settings.difficulty]);

  const handleClick = useCallback((e) => {
    if (gameOver || settings.isOpen) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Remove the check for clicking on the scoreboard area
    const deltaX = settings.clickTowards ? clickX - ballPosition.x : ballPosition.x - clickX;
    const deltaY = settings.clickTowards ? clickY - ballPosition.y : ballPosition.y - clickY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const newVelocityX = (deltaX / distance) * bounceStrength;
    const newVelocityY = (deltaY / distance) * bounceStrength;

    setBallVelocity({ x: newVelocityX, y: newVelocityY });
    initialVelocity.current = { x: newVelocityX, y: newVelocityY };
    setClickCount(count => count + 1);
    lastClickTime.current = Date.now();
  }, [ballPosition, gameOver, settings.isOpen, settings.clickTowards]);

  const resolveCollision = (pos, vel, obstaclePos, obstacleSize) => {
    const center = { x: pos.x, y: pos.y };
    const closestPoint = {
      x: Math.max(obstaclePos.x, Math.min(center.x, obstaclePos.x + obstacleSize.width)),
      y: Math.max(obstaclePos.y, Math.min(center.y, obstaclePos.y + obstacleSize.height))
    };

    const distance = Math.sqrt(
      Math.pow(center.x - closestPoint.x, 2) + 
      Math.pow(center.y - closestPoint.y, 2)
    );

    if (distance < ballRadius) {
      const normal = {
        x: (center.x - closestPoint.x) / distance,
        y: (center.y - closestPoint.y) / distance
      };

      const dotProduct = vel.x * normal.x + vel.y * normal.y;

      return {
        position: {
          x: closestPoint.x + normal.x * ballRadius,
          y: closestPoint.y + normal.y * ballRadius
        },
        velocity: {
          x: vel.x - 2 * dotProduct * normal.x,
          y: vel.y - 2 * dotProduct * normal.y
        }
      };
    }

    return null;
  };

  const moveEnemies = useCallback((enemies, ballPos, obstacles) => {
    return enemies.map(enemy => {
      const dx = ballPos.x - enemy.x;
      const dy = ballPos.y - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      let newX = enemy.x + (dx / distance) * enemySpeed;
      let newY = enemy.y + (dy / distance) * enemySpeed;

      // Check for collision with obstacles
      const collision = obstacles.some(obstacle => 
        isOverlapping({ x: newX, y: newY }, enemySize, [obstacle])
      );

      if (collision) {
        // If there's a collision, try to find a path around the obstacle
        const possibleMoves = [
          { x: enemy.x + enemySpeed, y: enemy.y },
          { x: enemy.x - enemySpeed, y: enemy.y },
          { x: enemy.x, y: enemy.y + enemySpeed },
          { x: enemy.x, y: enemy.y - enemySpeed },
        ];

        // Filter out moves that would cause collisions
        const validMoves = possibleMoves.filter(move => 
          !isOverlapping(move, enemySize, obstacles)
        );

        if (validMoves.length > 0) {
          // Choose the move that gets closest to the ball
          const bestMove = validMoves.reduce((best, move) => {
            const moveDist = Math.hypot(ballPos.x - move.x, ballPos.y - move.y);
            return moveDist < best.dist ? { move, dist: moveDist } : best;
          }, { dist: Infinity }).move;

          newX = bestMove.x;
          newY = bestMove.y;
        } else {
          // If no valid moves, stay in place
          newX = enemy.x;
          newY = enemy.y;
        }
      }

      // Ensure the enemy stays within the game boundaries
      newX = Math.max(enemySize / 2, Math.min(newX, gameSize.width - enemySize / 2));
      newY = Math.max(enemySize / 2, Math.min(newY, gameSize.height - enemySize / 2));

      return { x: newX, y: newY };
    });
  }, [gameSize]);

  const checkEnemyCollision = useCallback((ballPos, enemies) => {
    return enemies.some(enemy => 
      Math.sqrt(Math.pow(ballPos.x - enemy.x, 2) + Math.pow(ballPos.y - enemy.y, 2)) < (ballRadius + enemySize / 2)
    );
  }, []);

  const calculateEnemyCount = useCallback(() => {
    const levelBonus = Math.floor((level - 1) / 5); // Increase enemy count every 5 levels
    return baseEnemyCount + levelBonus;
  }, [level]);

  const handleTargetHit = useCallback(() => {
    if (clickCount <= obstacles.length * 2) {
      setLevel(currentLevel => {
        const newLevel = currentLevel + 1;
        setHighScore(hs => Math.max(hs, newLevel));
        return newLevel;
      });
    } else {
      setLevel(1);
    }
    const newObstacles = generateObstacles();
    setObstacles(newObstacles);
    setTargetPosition(generateTarget(newObstacles));
    setClickCount(0);
    
    // Respawn enemies at new locations with updated count
    const enemyCount = calculateEnemyCount();
    setEnemies(generateEnemies(
      enemyCount,
      newObstacles,
      ballPosition
    ));
  }, [clickCount, obstacles.length, generateObstacles, generateTarget, generateEnemies, calculateEnemyCount, ballPosition]);

  const updateGame = useCallback(() => {
    if (gameOver || settings.isOpen) return;

    // Move enemies continuously
    setEnemies(currentEnemies => moveEnemies(currentEnemies, ballPosition, obstacles));

    setBallPosition(pos => {
      const timeSinceClick = Date.now() - lastClickTime.current;
      if (timeSinceClick >= travelDuration) {
        return pos; // Stop moving after 3 seconds
      }

      const progress = timeSinceClick / travelDuration;
      const easeOutCubic = 1 - Math.pow(1 - progress, 3); // Easing function for smooth deceleration
      const currentVelocityX = initialVelocity.current.x * (1 - easeOutCubic);
      const currentVelocityY = initialVelocity.current.y * (1 - easeOutCubic);

      let newX = pos.x + currentVelocityX;
      let newY = pos.y + currentVelocityY;

      // Bounce off walls
      if (newX - ballRadius < 0 || newX + ballRadius > gameSize.width) {
        initialVelocity.current.x = -initialVelocity.current.x;
        newX = Math.max(ballRadius, Math.min(newX, gameSize.width - ballRadius));
      }
      if (newY - ballRadius < 0 || newY + ballRadius > gameSize.height) {
        initialVelocity.current.y = -initialVelocity.current.y;
        newY = Math.max(ballRadius, Math.min(newY, gameSize.height - ballRadius));
      }

      // Check for collisions with obstacles
      obstacles.forEach(obstacle => {
        const collision = resolveCollision(
          { x: newX, y: newY },
          initialVelocity.current,
          obstacle,
          { width: obstacle.width, height: obstacle.height }
        );
        if (collision) {
          newX = collision.position.x;
          newY = collision.position.y;
          initialVelocity.current = collision.velocity;
        }
      });

      // Check for collision with target
      if (
        Math.abs(newX - targetPosition.x) < (ballRadius + targetSize / 2) &&
        Math.abs(newY - targetPosition.y) < (ballRadius + targetSize / 2)
      ) {
        handleTargetHit();
      }

      return { x: newX, y: newY };
    });

    // Check for enemy collision after moving enemies and ball
    if (checkEnemyCollision(ballPosition, enemies)) {
      setGameOver(true);
    }

  }, [targetPosition, obstacles, gameSize, clickCount, generateObstacles, generateTarget, generateEnemies, moveEnemies, settings.difficulty, gameOver, settings.isOpen, ballPosition, enemies, handleTargetHit]);

  useEffect(() => {
    const gameLoop = setInterval(updateGame, 16); // ~60 FPS
    return () => clearInterval(gameLoop);
  }, [updateGame]);

  const restartGame = useCallback(() => {
    const initialObstacles = generateObstacles();
    setObstacles(initialObstacles);
    const newBallPosition = generateBallPosition(initialObstacles);
    setBallPosition(newBallPosition);
    setTargetPosition(generateTarget(initialObstacles));
    setLevel(1);
    setEnemies(generateEnemies(
      baseEnemyCount, // Always start with base enemy count when restarting
      initialObstacles,
      newBallPosition
    ));
    setClickCount(0);
    setGameOver(false);
  }, [generateObstacles, generateBallPosition, generateTarget, generateEnemies]);

  const toggleSettings = () => {
    setSettings(s => ({ ...s, isOpen: !s.isOpen }));
  };

  const updateSetting = (key, value) => {
    setSettings(s => ({ ...s, [key]: value }));
  };

  return (
    <div className="game-container w-screen h-screen overflow-hidden relative" onClick={handleClick}>
      <GameBoard
        gameSize={gameSize}
        ballPosition={ballPosition}
        ballRadius={ballRadius}
        targetPosition={targetPosition}
        targetSize={targetSize}
        obstacles={obstacles}
        enemies={enemies}
        enemySize={enemySize}
      />
      <div className="score absolute top-2 left-2 text-2xl font-bold text-slate-700">
        <p>Level: {level}</p>
        <p>Best Level: {highScore}</p>
        <p>Clicks: {clickCount}</p>
        <p>Enemies: {calculateEnemyCount()}</p>
      </div>
      {gameOver && (
        <div className="game-over absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-red-600 text-center">
          <p>Game Over!</p>
          <button 
            onClick={restartGame} 
            className="mt-5 px-5 py-2 text-2xl bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Restart
          </button>
        </div>
      )}
      <button 
        className="settings-button absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={(e) => { e.stopPropagation(); toggleSettings(); }}
      >
        Settings
      </button>
      {settings.isOpen && (
        <div className="settings-menu absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg text-slate-700">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <div className="mb-4">
            <label className="block mb-2">
              <input 
                type="checkbox" 
                checked={settings.clickTowards} 
                onChange={(e) => updateSetting('clickTowards', e.target.checked)}
                className="mr-2"
              />
              Click to move towards
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Difficulty:</label>
            <select 
              value={settings.difficulty} 
              onChange={(e) => updateSetting('difficulty', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={toggleSettings}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default TargetGame;
