// 1. Boot up the 3D room
import './scene.js'; 

// 2. Hire the Chef and the Delivery Driver
import { updateHeight } from './product.js';
import { downloadIFC } from './exporter.js';

// 3. Find the HTML elements
const slider = document.getElementById('heightSlider');
const valDisplay = document.getElementById('val');
const exportBtn = document.getElementById('exportBtn');

// 4. Tell the Chef what to do when the slider moves
slider.addEventListener('input', (e) => {
    const h = parseFloat(e.target.value);
    
    if (valDisplay) valDisplay.innerText = h.toFixed(1);
    
    // Call the function from product.js
    updateHeight(h); 
});

// 5. Tell the Driver what to do when the button is clicked
exportBtn.addEventListener('click', () => {
    const currentHeight = slider.value;
    
    // Call the function from exporter.js
    downloadIFC(currentHeight);
});