// Helper function to calculate the dot product of two vectors
const dotProduct = (v1, v2) => v1.x * v2.x + v1.y * v2.y;

// Helper function to calculate the cross product of two vectors
const crossProduct = (v1, v2) => v1.x * v2.y - v1.y * v2.x;

// Function to check if a point is inside a polygon
const isPointInPolygon = (point, polygon) => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    
    const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

// Function to check collision between two polygons
export const polygonCollision = (poly1, poly2) => {
  // Check if any point of poly1 is inside poly2
  for (const point of poly1.points) {
    if (isPointInPolygon(point, poly2.points)) {
      return true;
    }
  }
  
  // Check if any point of poly2 is inside poly1
  for (const point of poly2.points) {
    if (isPointInPolygon(point, poly1.points)) {
      return true;
    }
  }
  
  // Check for edge intersections
  for (let i = 0; i < poly1.points.length; i++) {
    for (let j = 0; j < poly2.points.length; j++) {
      const p1 = poly1.points[i];
      const p2 = poly1.points[(i + 1) % poly1.points.length];
      const q1 = poly2.points[j];
      const q2 = poly2.points[(j + 1) % poly2.points.length];
      
      if (lineIntersection(p1, p2, q1, q2)) {
        return true;
      }
    }
  }
  
  return false;
};

// Function to check if two line segments intersect
const lineIntersection = (p1, p2, q1, q2) => {
  const d = crossProduct({x: p2.x - p1.x, y: p2.y - p1.y}, {x: q2.x - q1.x, y: q2.y - q1.y});
  if (d === 0) return false;
  
  const t = crossProduct({x: q1.x - p1.x, y: q1.y - p1.y}, {x: q2.x - q1.x, y: q2.y - q1.y}) / d;
  const u = crossProduct({x: q1.x - p1.x, y: q1.y - p1.y}, {x: p2.x - p1.x, y: p2.y - p1.y}) / d;
  
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
};

// Function to check collision between a circle and a polygon
export const circlePolygonCollision = (circle, polygon) => {
  // Check if the circle's center is inside the polygon
  if (isPointInPolygon({x: circle.x, y: circle.y}, polygon.points)) {
    return true;
  }
  
  // Check if any polygon edge intersects with the circle
  for (let i = 0; i < polygon.points.length; i++) {
    const p1 = polygon.points[i];
    const p2 = polygon.points[(i + 1) % polygon.points.length];
    
    const closestPoint = closestPointOnLineSegment(circle, p1, p2);
    const distance = Math.hypot(closestPoint.x - circle.x, closestPoint.y - circle.y);
    
    if (distance <= circle.radius) {
      return true;
    }
  }
  
  return false;
};

// Helper function to find the closest point on a line segment to a point
const closestPointOnLineSegment = (point, lineStart, lineEnd) => {
  const lineVec = {x: lineEnd.x - lineStart.x, y: lineEnd.y - lineStart.y};
  const pointVec = {x: point.x - lineStart.x, y: point.y - lineStart.y};
  
  const lineLengthSquared = lineVec.x * lineVec.x + lineVec.y * lineVec.y;
  const t = Math.max(0, Math.min(1, dotProduct(pointVec, lineVec) / lineLengthSquared));
  
  return {
    x: lineStart.x + t * lineVec.x,
    y: lineStart.y + t * lineVec.y
  };
};

