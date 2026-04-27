import * as THREE from 'three';

// --- 1. SETUP 3D VIEW ---
const container = document.getElementById('viewer');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(3, 3, 5);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// --- 2. CREATE THE 3D OBJECT ---
const geometry = new THREE.BoxGeometry(2, 2, 2); // Matches template.ifc start size
const material = new THREE.MeshPhongMaterial({ color: 0x00d1b2 });
const mesh = new THREE.Mesh(geometry, material);
// Move the mesh up so it sits on the ground
mesh.position.y = 1; 
scene.add(mesh);

// --- 3. UI LOGIC ---
const slider = document.getElementById('heightSlider');
const valDisplay = document.getElementById('val');
const exportBtn = document.getElementById('exportBtn');

slider.addEventListener('input', (e) => {
    const h = parseFloat(e.target.value);
    valDisplay.innerText = h;
    
    // Scale the 3D model visually
    mesh.scale.y = h / 2; // Divide by original size
    mesh.position.y = h / 2; // Keep it on the floor
});

// --- 4. THE IFC EXPORT "PATCHER" ---
exportBtn.addEventListener('click', async () => {
    const currentHeight = slider.value;
    
    try {
        // Fetch the template from the /public folder
        const response = await fetch('/template.ifc');
        const templateText = await response.text();

        // SEARCH AND REPLACE: 
        // We look for line #37: IFCEXTRUDEDAREASOLID(#38,#42,#46,2.0);
        // And replace the '2.0' with our slider value
        const updatedIfc = templateText.replace(
            /(#37=IFCEXTRUDEDAREASOLID\(#38,#42,#46,)([\d.]+)(\);)/,
            `$1${parseFloat(currentHeight).toFixed(1)}$3`
        );

        // Download the file
        const blob = new Blob([updatedIfc], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SmallCo_Product_${currentHeight}m.ifc`;
        link.click();
        
        console.log("IFC Exported successfully!");
    } catch (err) {
        console.error("Export failed:", err);
    }
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});