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
import { polygonCollision, circlePolygonCollision } from './collisionUtils';
import ClicksRemaining from './ClicksRemaining';
import GameBoard from './GameBoard';
import Cookies from 'js-cookie';

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
  const targetSize = 30;
  const bounceStrength = 10;
  const friction = 0.98;
  const travelDuration = 3000; // 3 seconds in milliseconds
  const enemySize = 15;
  const enemySpeed = settings.difficulty === 'easy' ? 0.5 : settings.difficulty === 'medium' ? 1 : 1.5;

  const [maxClicks, setMaxClicks] = useState(0);

  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const savedHighScore = Cookies.get('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    const hasConsent = Cookies.get('cookieConsent');
    setCookieConsent(hasConsent === 'true');
  }, []);

  const isOverlapping = (pos, size, obstacles) => {
    const ballLeft = pos.x;
    const ballRight = pos.x + size;
    const ballTop = pos.y;
    const ballBottom = pos.y + size;

    for (const obstacle of obstacles) {
      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + obstacle.width;
      const obstacleTop = obstacle.y;
      const obstacleBottom = obstacle.y + obstacle.height;

      if (
        ballLeft < obstacleRight &&
        ballRight > obstacleLeft &&
        ballTop < obstacleBottom &&
        ballBottom > obstacleTop
      ) {
        console.log(`Collision detected! Ball position: (${pos.x}, ${pos.y}), size: ${size}`);
        console.log('Colliding obstacle:', obstacle);
        return true;
      }
    }

    return false;
  };

  const generateObstacles = useCallback(() => {
    const obstacleCount = Math.floor(Math.random() * 6) + 2; // 2 to 7 obstacles
    const newObstacles = [];
    const minDistance = ballRadius * 3; // 1.5x the width (diameter) of the ball

    for (let i = 0; i < obstacleCount; i++) {
      let newObstacle;
      let attempts = 0;
      const maxAttempts = 100; // Prevent infinite loop

      do {
        const x = Math.random() * (gameSize.width - 100);
        const y = Math.random() * (gameSize.height - 100);
        const width = Math.random() * 100 + 50;  // Random width between 50 and 150
        const height = Math.random() * 100 + 50; // Random height between 50 and 150
        const isRounded = Math.random() < 0.5; // 50% chance of being rounded

        newObstacle = {
          type: 'rectangle',
          x, y,
          width,
          height,
          zIndex: 20,
          isRounded
        };

        attempts++;
        if (attempts >= maxAttempts) {
          console.warn('Max attempts reached for obstacle generation. Skipping this obstacle.');
          break;
        }
      } while (newObstacles.some(obstacle => checkObstacleCollision(newObstacle, obstacle, minDistance)));

      if (attempts < maxAttempts) {
        newObstacles.push(newObstacle);
      }
    }
    return newObstacles;
  }, [gameSize, ballRadius]);

  const checkObstacleCollision = (obstacle1, obstacle2, minDistance) => {
    const centerX1 = obstacle1.x + obstacle1.width / 2;
    const centerY1 = obstacle1.y + obstacle1.height / 2;
    const centerX2 = obstacle2.x + obstacle2.width / 2;
    const centerY2 = obstacle2.y + obstacle2.height / 2;

    const distanceX = Math.abs(centerX1 - centerX2);
    const distanceY = Math.abs(centerY1 - centerY2);

    const minDistanceX = (obstacle1.width + obstacle2.width) / 2 + minDistance;
    const minDistanceY = (obstacle1.height + obstacle2.height) / 2 + minDistance;

    return distanceX < minDistanceX && distanceY < minDistanceY;
  };

  const generatePosition = useCallback((size, currentObstacles) => {
    let newPos;
    const borderPadding = 10; // Minimum distance from the border
    do {
      newPos = {
        x: Math.random() * (gameSize.width - size - 2 * borderPadding) + borderPadding,
        y: Math.random() * (gameSize.height - size - 2 * borderPadding) + borderPadding,
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
    setMaxClicks(initialObstacles.length * 2);
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

  const moveEnemies = useCallback((enemies, ballPos, obstacles, time) => {
    const borderPadding = 10;
    const repulsionRange = enemySize * 6;
    const attractionStrength = 1;
    const repulsionStrength = 4;
    const obstacleAvoidanceWeight = 1.5;
    const trappedThreshold = enemySize * 3;
    const stuckThreshold = 10; // Minimum movement distance in pixels
    const stuckTime = 3000; // Time in milliseconds to consider an enemy stuck
    const pushStrength = enemySpeed * 2; // Strength of the random push

    return enemies.map(enemy => {
      let forceX = 0;
      let forceY = 0;

      // Check if enemy is stuck
      if (!enemy.lastPosition || !enemy.lastMoveTime) {
        enemy.lastPosition = { x: enemy.x, y: enemy.y };
        enemy.lastMoveTime = time;
      }

      const timeSinceLastMove = time - enemy.lastMoveTime;
      const distanceMoved = Math.hypot(enemy.x - enemy.lastPosition.x, enemy.y - enemy.lastPosition.y);

      if (distanceMoved >= stuckThreshold) {
        enemy.lastPosition = { x: enemy.x, y: enemy.y };
        enemy.lastMoveTime = time;
      } else if (timeSinceLastMove >= stuckTime) {
        // Enemy is stuck, apply random push away from nearest obstacle
        const nearestObstacle = obstacles.reduce((nearest, obstacle) => {
          const dist = Math.hypot(
            enemy.x - (obstacle.x + obstacle.width/2),
            enemy.y - (obstacle.y + obstacle.height/2)
          );
          return dist < nearest.dist ? { obstacle, dist } : nearest;
        }, { obstacle: null, dist: Infinity }).obstacle;

        if (nearestObstacle) {
          const pushAngle = Math.atan2(
            enemy.y - (nearestObstacle.y + nearestObstacle.height/2),
            enemy.x - (nearestObstacle.x + nearestObstacle.width/2)
          ) + (Math.random() - 0.5) * Math.PI; // Add some randomness to the angle

          forceX = Math.cos(pushAngle) * pushStrength;
          forceY = Math.sin(pushAngle) * pushStrength;

          enemy.lastPosition = { x: enemy.x, y: enemy.y };
          enemy.lastMoveTime = time;
        }
      } else {
        // Regular movement logic
        const dx = ballPos.x - enemy.x;
        const dy = ballPos.y - enemy.y;
        const distToBall = Math.sqrt(dx * dx + dy * dy);
        forceX += (dx / distToBall) * attractionStrength;
        forceY += (dy / distToBall) * attractionStrength;

        obstacles.forEach(obstacle => {
          const obstacleCenter = {
            x: obstacle.x + obstacle.width / 2,
            y: obstacle.y + obstacle.height / 2
          };
          const obstacleRadius = Math.sqrt(obstacle.width * obstacle.width + obstacle.height * obstacle.height) / 2;
          const distToObstacle = Math.hypot(enemy.x - obstacleCenter.x, enemy.y - obstacleCenter.y);
          
          if (distToObstacle < repulsionRange + obstacleRadius) {
            const repulsionX = enemy.x - obstacleCenter.x;
            const repulsionY = enemy.y - obstacleCenter.y;
            const repulsionDist = Math.sqrt(repulsionX * repulsionX + repulsionY * repulsionY);
            const repulsionFactor = Math.pow(1 - (repulsionDist / (repulsionRange + obstacleRadius)), 2);
            forceX += (repulsionX / repulsionDist) * repulsionStrength * repulsionFactor;
            forceY += (repulsionY / repulsionDist) * repulsionStrength * repulsionFactor;
          }
        });

        forceX *= obstacleAvoidanceWeight;
        forceY *= obstacleAvoidanceWeight;
      }

      // Normalize force vector
      const forceMagnitude = Math.sqrt(forceX * forceX + forceY * forceY);
      if (forceMagnitude > 0) {
        forceX = (forceX / forceMagnitude) * enemySpeed;
        forceY = (forceY / forceMagnitude) * enemySpeed;
      }

      let newX = enemy.x + forceX;
      let newY = enemy.y + forceY;

      // Ensure the enemy stays within the game boundaries with padding
      newX = Math.max(borderPadding, Math.min(newX, gameSize.width - borderPadding));
      newY = Math.max(borderPadding, Math.min(newY, gameSize.height - borderPadding));

      // Final collision check and resolution
      obstacles.forEach(obstacle => {
        if (circleRectCollision(newX, newY, enemySize / 2, obstacle)) {
          const resolution = resolveCircleRectCollision(newX, newY, enemySize / 2, obstacle);
          newX = resolution.x;
          newY = resolution.y;
        }
      });

      return { ...enemy, x: newX, y: newY };
    });
  }, [gameSize, enemySize, enemySpeed]);

  // Helper function to check collision between a circle and a rectangle
  const circleRectCollision = (circleX, circleY, circleRadius, rect) => {
    const closestX = Math.max(rect.x, Math.min(circleX, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circleY, rect.y + rect.height));
    const distanceX = circleX - closestX;
    const distanceY = circleY - closestY;
    const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    return distanceSquared < (circleRadius * circleRadius);
  };

  // Helper function to resolve collision between a circle and a rectangle
  const resolveCircleRectCollision = (circleX, circleY, circleRadius, rect) => {
    const closestX = Math.max(rect.x, Math.min(circleX, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circleY, rect.y + rect.height));
    const distanceX = circleX - closestX;
    const distanceY = circleY - closestY;
    const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    
    if (distance < circleRadius) {
      const pushX = (distanceX / distance) * (circleRadius - distance);
      const pushY = (distanceY / distance) * (circleRadius - distance);
      return { x: circleX + pushX, y: circleY + pushY };
    }
    
    return { x: circleX, y: circleY };
  };

  const checkEnemyCollision = useCallback((ballPos, enemies) => {
    return enemies.some(enemy => 
      Math.sqrt(Math.pow(ballPos.x - enemy.x, 2) + Math.pow(ballPos.y - enemy.y, 2)) < (ballRadius + enemySize / 2)
    );
  }, []);

  const calculateEnemyCount = useCallback(() => {
    const levelBonus = Math.floor((level - 1) / 5); // Increase enemy count every 5 levels
    return baseEnemyCount + levelBonus;
  }, [level]);

  const isInTopLeftCorner = useCallback((pos) => {
    const cornerThreshold = 50; // Adjust this value as needed
    return pos.x < cornerThreshold && pos.y < cornerThreshold;
  }, []);

  const initializeRound = useCallback(() => {
    const initialObstacles = generateObstacles();
    setObstacles(initialObstacles);
    setMaxClicks(initialObstacles.length * 2);

    let newBallPosition, newTargetPosition, newEnemies;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      newBallPosition = generateBallPosition(initialObstacles);
      newTargetPosition = generateTarget(initialObstacles);
      newEnemies = generateEnemies(
        calculateEnemyCount(),
        initialObstacles,
        newBallPosition
      );

      attempts++;
      if (attempts >= maxAttempts) {
        console.warn('Max attempts reached. Proceeding with current positions.');
        break;
      }
    } while (
      isInTopLeftCorner(newBallPosition) ||
      newEnemies.some(enemy => isInTopLeftCorner(enemy))
    );

    setBallPosition(newBallPosition);
    setTargetPosition(newTargetPosition);
    setEnemies(newEnemies);
    setClickCount(0);
  }, [generateObstacles, generateBallPosition, generateTarget, generateEnemies, calculateEnemyCount, isInTopLeftCorner]);

  useEffect(() => {
    initializeRound();
  }, [initializeRound]);

  const handleTargetHit = useCallback(() => {
    setLevel(currentLevel => {
      const newLevel = currentLevel + 1;
      setHighScore(prevHighScore => {
        const newHighScore = Math.max(prevHighScore, newLevel);
        if (cookieConsent) {
          Cookies.set('highScore', newHighScore.toString(), { expires: 365 });
        }
        return newHighScore;
      });
      return newLevel;
    });

    initializeRound();
  }, [initializeRound, cookieConsent]);

  const updateGame = useCallback(() => {
    if (gameOver || settings.isOpen) return;

    // Move enemies continuously
    setEnemies(currentEnemies => moveEnemies(currentEnemies, ballPosition, obstacles, Date.now()));

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

    // Check if clicks remaining is zero
    if (clickCount >= maxClicks) {
      setGameOver(true);
    }

  }, [targetPosition, obstacles, gameSize, clickCount, generateObstacles, generateTarget, generateEnemies, moveEnemies, settings.difficulty, gameOver, settings.isOpen, ballPosition, enemies, handleTargetHit, maxClicks]);

  useEffect(() => {
    const gameLoop = setInterval(updateGame, 16); // ~60 FPS
    return () => clearInterval(gameLoop);
  }, [updateGame]);

  const restartGame = useCallback(() => {
    setLevel(1);
    initializeRound();
    setGameOver(false);
  }, [initializeRound]);

  const toggleSettings = () => {
    setSettings(s => ({ ...s, isOpen: !s.isOpen }));
  };

  const updateSetting = (key, value) => {
    setSettings(s => ({ ...s, [key]: value }));
  };

  const moveBall = (dx, dy) => {
    setBallPosition(prevBall => {
      const newPos = {
        x: prevBall.x + dx,
        y: prevBall.y + dy
      };

      console.log(`Attempting to move ball to (${newPos.x}, ${newPos.y})`);
      
      if (isOverlapping(newPos, ballRadius * 2, obstacles)) {
        console.log('Movement prevented due to collision');
        return prevBall;
      }

      console.log('Ball moved successfully');
      return newPos;
    });
  };

  const handleCookieConsent = () => {
    setCookieConsent(true);
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    Cookies.set('highScore', highScore, { expires: 365 });
  };

  return (
    <div className="game-container w-screen h-screen overflow-hidden relative bg-white select-none" onClick={handleClick}>
      <div className="background absolute inset-0 bg-white z-[-10]"></div>
      <ClicksRemaining clicksLeft={maxClicks - clickCount} />
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
      <div className="score absolute top-2 left-2 text-2xl font-bold text-slate-700 z-10 pointer-events-none user-select-none">
        <p>Level: {level}</p>
        <p>Best Level: {highScore}</p>
      </div>
      {gameOver && (
        <div className="game-over absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-red-600 text-center z-20">
          <p className="pointer-events-none user-select-none">Game Over!</p>
          <p className="text-2xl mt-2 pointer-events-none user-select-none">
            {clickCount >= maxClicks ? "You ran out of clicks!" : "You were caught by an enemy!"}
          </p>
          <button 
            onClick={(e) => { e.stopPropagation(); restartGame(); }}
            className="mt-5 px-5 py-2 text-2xl bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Restart
          </button>
        </div>
      )}
      <button 
        className="settings-button absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded z-20"
        onClick={(e) => { e.stopPropagation(); toggleSettings(); }}
      >
        Settings
      </button>
      {settings.isOpen && (
        <div className="settings-menu absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg text-slate-700 z-20">
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
      {!cookieConsent && (
        <div className="cookie-consent absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center">
          <p className="mb-2">This site uses cookies to save your high score. Do you consent to the use of cookies?</p>
          <button 
            onClick={(e) => { e.stopPropagation(); handleCookieConsent(); }}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors"
          >
            Accept
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setCookieConsent(false); }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default TargetGame;
