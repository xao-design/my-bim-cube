// main.js
import './src/scene/gridRenderer.js';
import './src/scene/scene.js'; 
import { state, subscribe } from './src/core/state.js'; 
import { calculateCustomGrid } from './src/math/gridCalculator.js';

// --- HEIGHT ---
const heightSlider = document.getElementById('heightSlider');
const valHeight = document.getElementById('valHeight');
heightSlider.addEventListener('input', (e) => {
    state.height = parseFloat(e.target.value);
    if (valHeight) valHeight.innerText = state.height.toFixed(1);
});

// --- TOTAL WIDTH (X) ---
const widthSlider = document.getElementById('widthSlider');
const valWidth = document.getElementById('valWidth');
widthSlider.addEventListener('input', (e) => {
    state.widthX = parseFloat(e.target.value);
    if (valWidth) valWidth.innerText = state.widthX.toFixed(1);
});

// --- TOTAL DEPTH (Y) ---
const depthSlider = document.getElementById('depthSlider');
const valDepth = document.getElementById('valDepth');
depthSlider.addEventListener('input', (e) => {
    state.depthY = parseFloat(e.target.value);
    if (valDepth) valDepth.innerText = state.depthY.toFixed(1);
});


// ---------------------------------------------------------
// 🧪 TEMPORARY DIAGNOSTIC TEST (The "Console Math Checker")
// ---------------------------------------------------------
// We subscribe to the State. Whenever a slider moves, we run the math and log it.
subscribe((property, value) => {
    // Only recalculate if Width or Depth changed (ignore height for the grid)
    if (property === 'widthX' || property === 'depthY') {
        const gridPoints = calculateCustomGrid(state.widthX, state.depthY);
        
        console.clear(); // Keep the console clean
        console.log(`📐 GRID RECALCULATED!`);
        console.log(`Total X: ${state.widthX}m | Total Y: ${state.depthY}m`);
        console.log(`Total Intersections Generated: ${gridPoints.length}`);
        console.table(gridPoints); // .table() creates a beautiful spreadsheet in the console!
    }
});

// Run it once on load so we can see the default 12x6 grid
const initialGrid = calculateCustomGrid(state.widthX, state.depthY);
console.table(initialGrid);