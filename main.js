// main.js
import './scene.js'; 
import './product.js';
import { state } from './state.js'; 
import { downloadIFC } from './exporter.js';

// --- HEIGHT SLIDER ---
const heightSlider = document.getElementById('heightSlider');
const valDisplay = document.getElementById('val');

heightSlider.addEventListener('input', (e) => {
    const h = parseFloat(e.target.value);
    if (valDisplay) valDisplay.innerText = h.toFixed(1);
    state.height = h; // Tell state!
});

// --- BAYS X SLIDER ---
const baysXSlider = document.getElementById('baysXSlider');
const valXDisplay = document.getElementById('valX');

baysXSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    if (valXDisplay) valXDisplay.innerText = val;
    state.baysX = val; // Tell state!
});

// --- BAYS Z SLIDER ---
const baysZSlider = document.getElementById('baysZSlider');
const valZDisplay = document.getElementById('valZ');

baysZSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    if (valZDisplay) valZDisplay.innerText = val;
    state.baysZ = val; // Tell state!
});

// --- EXPORT BUTTON ---
const exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', () => {
    downloadIFC();
});