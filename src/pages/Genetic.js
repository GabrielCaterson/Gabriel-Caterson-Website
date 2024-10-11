import React, { useState, useEffect, useRef } from 'react';

const Genetic = React.memo(() => {
  console.log('Genetic component rendered');

  const [blobs, setBlobs] = useState([]);
  const [generation, setGeneration] = useState(0);
  const [scores, setScores] = useState({ red: 0, green: 0, blue: 0 });
  const canvasRef = useRef(null);

  // Define simulation parameters
  const populationSize = 60;
  const canvasWidth = 800;
  const canvasHeight = 600;
  const baseEvolutionPoints = 10;
  const factions = ['red', 'green', 'blue'];

  // Initialize population
  useEffect(() => {
    console.log('Genetic component mounted');
    const initialBlobs = Array.from({ length: populationSize }, () => createBlob());
    setBlobs(initialBlobs);

    return () => {
      console.log('Genetic component unmounted');
      // Add any cleanup code here if necessary
    };
  }, []);

  // Create a new blob with random attributes
  const createBlob = (faction = null) => {
    const chosenFaction = faction || factions[Math.floor(Math.random() * factions.length)];
    const factionSize = blobs.filter(blob => blob.faction === chosenFaction).length;
    const extraPoints = Math.max(0, 10 - Math.floor(factionSize / (populationSize / factions.length) * 10));
    const totalPoints = baseEvolutionPoints + extraPoints;

    const speedPoints = Math.floor(Math.random() * totalPoints);
    const energyPoints = totalPoints - speedPoints;

    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      speed: 1 + speedPoints * 0.4,
      energy: 50 + energyPoints * 8,
      faction: chosenFaction,
      direction: Math.random() * Math.PI * 2,
      kills: 0,
      age: 0,
    };
  };

  // Update blob positions and handle interactions
  const updateBlobs = () => {
    setBlobs(prevBlobs => {
      const newBlobs = prevBlobs.map(blob => {
        // Move blob
        const newX = (blob.x + Math.cos(blob.direction) * blob.speed + canvasWidth) % canvasWidth;
        const newY = (blob.y + Math.sin(blob.direction) * blob.speed + canvasHeight) % canvasHeight;
        
        // Decrease energy and increase age
        const newEnergy = blob.energy - 0.1;
        const newAge = blob.age + 1;
        
        // Change direction occasionally and aim for enemies
        let newDirection = blob.direction;
        if (Math.random() < 0.05) {
          const nearestEnemy = findNearestEnemy(blob, newBlobs);
          if (nearestEnemy) {
            newDirection = Math.atan2(nearestEnemy.y - blob.y, nearestEnemy.x - blob.x);
          } else {
            newDirection = Math.random() * Math.PI * 2;
          }
        }
        
        return { ...blob, x: newX, y: newY, energy: newEnergy, direction: newDirection, age: newAge };
      });

      // Handle blob interactions
      const newScores = { ...scores };
      for (let i = 0; i < newBlobs.length; i++) {
        for (let j = i + 1; j < newBlobs.length; j++) {
          const blob1 = newBlobs[i];
          const blob2 = newBlobs[j];
          if (blob1.faction !== blob2.faction) {
            const distance = Math.hypot(blob1.x - blob2.x, blob1.y - blob2.y);
            if (distance < 20) {  // Assuming all blobs have the same size
              const angle1 = Math.atan2(blob2.y - blob1.y, blob2.x - blob1.x);
              const angle2 = Math.atan2(blob1.y - blob2.y, blob1.x - blob2.x);
              const angleDiff1 = Math.abs(normalizeAngle(angle1 - blob1.direction));
              const angleDiff2 = Math.abs(normalizeAngle(angle2 - blob2.direction));
              
              if (angleDiff1 < Math.PI / 2 && angleDiff2 > Math.PI / 2) {
                blob1.kills += 1;
                blob2.energy = 0;
                newScores[blob1.faction]++;
              } else if (angleDiff2 < Math.PI / 2 && angleDiff1 > Math.PI / 2) {
                blob2.kills += 1;
                blob1.energy = 0;
                newScores[blob2.faction]++;
              }
            }
          }
        }
      }
      setScores(newScores);

      // Remove dead blobs and create new ones
      const survivors = newBlobs.filter(blob => blob.energy > 0);
      const newPopulation = [
        ...survivors,
        ...Array.from({ length: populationSize - survivors.length }, () => {
          const faction = factions.reduce((a, b) => 
            survivors.filter(blob => blob.faction === a).length <= survivors.filter(blob => blob.faction === b).length ? a : b
          );
          if (survivors.filter(blob => blob.faction === faction).length >= 2) {
            return breedBlobs(
              survivors.filter(blob => blob.faction === faction)[Math.floor(Math.random() * survivors.filter(blob => blob.faction === faction).length)],
              survivors.filter(blob => blob.faction === faction)[Math.floor(Math.random() * survivors.filter(blob => blob.faction === faction).length)]
            );
          } else {
            return createBlob(faction);
          }
        }),
      ];

      return newPopulation;
    });

    setGeneration(gen => gen + 1);
  };

  // Breed two parent blobs to create a child blob
  const breedBlobs = (parent1, parent2) => {
    const childBlob = createBlob(parent1.faction);
    childBlob.speed = (parent1.speed + parent2.speed) / 2 + (Math.random() - 0.5) * 0.5;
    childBlob.energy = (parent1.energy + parent2.energy) / 2 + (Math.random() - 0.5) * 10;
    return childBlob;
  };

  // Find the nearest enemy blob
  const findNearestEnemy = (blob, allBlobs) => {
    return allBlobs
      .filter(b => b.faction !== blob.faction)
      .reduce((nearest, current) => {
        const distanceToCurrent = Math.hypot(current.x - blob.x, current.y - blob.y);
        const distanceToNearest = nearest ? Math.hypot(nearest.x - blob.x, nearest.y - blob.y) : Infinity;
        return distanceToCurrent < distanceToNearest ? current : nearest;
      }, null);
  };

  // Normalize angle to be between -PI and PI
  const normalizeAngle = (angle) => {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
  };

  // Animation loop
  useEffect(() => {
    const interval = setInterval(updateBlobs, 50);
    return () => clearInterval(interval);
  }, []);

  // Draw blobs on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    blobs.forEach(blob => {
      // Draw blob body
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = blob.faction;
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw direction indicator (front)
      const frontX = blob.x + Math.cos(blob.direction) * 15;
      const frontY = blob.y + Math.sin(blob.direction) * 15;
      ctx.beginPath();
      ctx.arc(frontX, frontY, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      // Draw back indicator
      const backX = blob.x - Math.cos(blob.direction) * 15;
      const backY = blob.y - Math.sin(blob.direction) * 15;
      ctx.beginPath();
      ctx.arc(backX, backY, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();
    });
  }, [blobs]);

  return (
    <div>
      <h1>Blob Faction Battle</h1>
      <p>Generation: {generation}</p>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '1px solid black' }} />
      <h2>Scoreboard</h2>
      <ul>
        {Object.entries(scores).map(([faction, score]) => (
          <li key={faction} style={{color: faction}}>
            {faction}: {score}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Genetic;