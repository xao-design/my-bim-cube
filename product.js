// product.js
import * as THREE from 'three';
import { scene } from './scene.js';
import { subscribe, state } from './state.js';
import { getGridIntersections } from './grid.js'; // Hire the Surveyor

// 1. Create a "Folder" (Group) to hold all our generated parts
// This allows us to easily delete the old model when sliders change
const productGroup = new THREE.Group();
scene.add(productGroup);

// 2. Define our Column Material and Base Shape
const colGeometry = new THREE.BoxGeometry(0.2, 1, 0.2); // A slim column, 1m tall base
const colMaterial = new THREE.MeshPhongMaterial({ color: 0x00d1b2 });

// 3. The Rebuild Function
function buildModel() {
    // Clear out the old columns
    productGroup.clear();

    // Get the math from the Surveyor
    const intersections = getGridIntersections();

    // Place a column at every intersection!
    intersections.forEach(pt => {
        const col = new THREE.Mesh(colGeometry, colMaterial);
        
        // Snap to the grid point!
        col.position.set(pt.x, state.height / 2, pt.z);
        
        // Scale to the global height
        col.scale.y = state.height;
        
        productGroup.add(col);
    });
    
    // Optional: Center the whole group in the camera's view
    const totalWidth = state.baysX * state.bayWidthX;
    const totalDepth = state.baysZ * state.bayWidthZ;
    productGroup.position.set(-totalWidth / 2, 0, -totalDepth / 2);
}

// 4. Listen to the Brain. If ANYTHING changes, rebuild the model!
subscribe((property, value) => {
    buildModel();
});

// 5. Build it for the first time when the page loads
buildModel();