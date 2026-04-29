// /src/scene/scene.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 1. Import the new HTML Renderer
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

const container = document.getElementById('viewer');

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(10, 15, 15);

// 2. Setup the WebGL (3D) Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// 3. Setup the CSS2D (Text) Renderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(container.clientWidth, container.clientHeight);
labelRenderer.domElement.style.position = 'absolute'; // Float over the 3D canvas
labelRenderer.domElement.style.top = '0px';
container.appendChild(labelRenderer.domElement);

// 4. OrbitControls (Attach to the HTML overlay now, since it's on top!)
const controls = new OrbitControls(camera, labelRenderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Add a simple ground plane so we can see the grid better
const gridHelper = new THREE.GridHelper(100, 100, 0x444444, 0x333333);
gridHelper.position.y = -0.01; // Drop it slightly so our custom lines sit on top
scene.add(gridHelper);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera); // Render the text every frame!
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    labelRenderer.setSize(container.clientWidth, container.clientHeight);
});