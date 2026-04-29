// scene.js
import * as THREE from 'three';
// 1. Import the OrbitControls tool from the Three.js library
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('viewer');
container.style.width = '100%';
container.style.height = '100vh';

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
// Move the camera back a bit more so we can see the whole grid
camera.position.set(5, 5, 10); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// 2. Attach the OrbitControls to the camera and the screen
const controls = new OrbitControls(camera, renderer.domElement);

// Pro-Tip: Turn on "Damping". It gives the camera a smooth, heavy physics feel 
// when you let go of the mouse, just like professional CAD software.
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

function animate() {
    requestAnimationFrame(animate);
    
    // 3. We must update the controls every single frame for the smooth damping to work
    controls.update(); 
    
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    if (container.clientWidth > 0 && container.clientHeight > 0) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
});