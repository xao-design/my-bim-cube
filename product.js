import * as THREE from 'three';
import { scene } from './scene.js'; // Bring in the room we just designed

// 1. Create the geometry and material
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 0x00d1b2 });
const mesh = new THREE.Mesh(geometry, material);

// 2. Position it on the ground and add it to the room
mesh.position.y = 1; 
scene.add(mesh);

// 3. Export a tool that changes the product
export function updateHeight(h) {
    mesh.scale.y = h / 2;    // Scale it
    mesh.position.y = h / 2; // Keep it on the floor
}