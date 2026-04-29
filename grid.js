// grid.js
import { state } from './src/core/state.js';

// This function translates abstract bays into absolute 3D coordinates
export function getGridIntersections() {
    const points = [];
    
    // Loop through X grid lines (Bays + 1 = Number of Grid Lines)
    for (let i = 0; i <= state.baysX; i++) {
        // Loop through Z grid lines
        for (let j = 0; j <= state.baysZ; j++) {
            
            const xPos = i * state.bayWidthX;
            const zPos = j * state.bayWidthZ;
            
            // Save the coordinate and give it a BIM-style Name (e.g., X1-Z0)
            points.push({ 
                name: `X${i}-Z${j}`, 
                x: xPos, 
                z: zPos 
            });
        }
    }
    return points;
}