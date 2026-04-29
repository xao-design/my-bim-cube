// /src/scene/gridRenderer.js
import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { scene } from './scene.js';
import { state, subscribe } from '../core/state.js';
import { calculateCustomGrid } from '../math/gridCalculator.js';

// Create a group so we can easily delete the old grid when a slider moves
const visualGridGroup = new THREE.Group();
scene.add(visualGridGroup);

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00d1b2, opacity: 0.5, transparent: true });

function drawGrid() {
    // 1. Clear the old lines and labels
    visualGridGroup.clear();

    // 2. Get the math!
    const points = calculateCustomGrid(state.widthX, state.depthY);

    // 3. Draw dots and text at every intersection
    points.forEach(pt => {
        // Create the HTML text label
        const div = document.createElement('div');
        div.className = 'grid-label';
        div.textContent = pt.name;

        // Convert HTML into a 3D object
        const label = new CSS2DObject(div);
        label.position.set(pt.x, 0, pt.z);
        
        visualGridGroup.add(label);
        
        // Add a tiny dot at the exact intersection
        const dotGeom = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const dot = new THREE.Mesh(dotGeom, dotMat);
        dot.position.set(pt.x, 0, pt.z);
        visualGridGroup.add(dot);
    });

    // Center the whole visual grid on the screen based on total size
    visualGridGroup.position.set(-state.widthX / 2, 0, -state.depthY / 2);
}

// 4. Listen to the Brain!
subscribe((property) => {
    if (property === 'widthX' || property === 'depthY') {
        drawGrid();
    }
});

// Draw it once when the app starts
drawGrid();