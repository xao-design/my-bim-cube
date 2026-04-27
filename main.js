import * as THREE from 'three';

// --- 1. SETUP 3D VIEW ---
const container = document.getElementById('viewer');

// FIX 1: Explicitly tell the browser how big the 3D window should be.
// Without this, GitHub pages sometimes squishes the height to 0 pixels!
container.style.width = '100%';
container.style.height = '100vh';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(3, 3, 5);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting (Makes the teal cube look 3D and not flat)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// --- 2. CREATE THE 3D OBJECT ---
const geometry = new THREE.BoxGeometry(2, 2, 2); // Matches template.ifc start size
const material = new THREE.MeshPhongMaterial({ color: 0x00d1b2 });
const mesh = new THREE.Mesh(geometry, material);

// Move the mesh up so it sits exactly on the floor grid
mesh.position.y = 1; 
scene.add(mesh);

// --- 3. UI LOGIC ---
const slider = document.getElementById('heightSlider');
const valDisplay = document.getElementById('val');
const exportBtn = document.getElementById('exportBtn');

slider.addEventListener('input', (e) => {
    const h = parseFloat(e.target.value);
    
    // FIX 2: Make sure the text on the screen updates dynamically
    if (valDisplay) {
        valDisplay.innerText = h.toFixed(1); 
    }
    
    // Scale the 3D model visually based on the slider
    mesh.scale.y = h / 2; // Divide by original size
    mesh.position.y = h / 2; // Keep it on the floor while it grows
});

// --- 4. THE IFC EXPORT "PATCHER" ---
exportBtn.addEventListener('click', async () => {
    const currentHeight = slider.value;
    
    try {
        // FIX 3: Use a relative path ('./'). This is the magic bullet for GitHub Pages.
        // It tells the browser to look in the current folder, not the root of the whole website.
        const response = await fetch('./template.ifc');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const templateText = await response.text();

        // SEARCH AND REPLACE: 
        // We look for line #37: IFCEXTRUDEDAREASOLID(#38,#42,#46,2.0);
        // And replace the '2.0' with our slider value
        const updatedIfc = templateText.replace(
            /(#37=IFCEXTRUDEDAREASOLID\(#38,#42,#46,)([\d.]+)(\);)/,
            `$1${parseFloat(currentHeight).toFixed(1)}$3`
        );

        // Download the file directly to the user's computer
        const blob = new Blob([updatedIfc], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SmallCo_Product_${currentHeight}m.ifc`;
        link.click();
        
        console.log("IFC Exported successfully!");
    } catch (err) {
        console.error("Export failed:", err);
        alert("Export failed! Check the console for details.");
    }
});

// --- 5. RENDER LOOP & RESIZE HANDLING ---
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize gracefully
window.addEventListener('resize', () => {
    if (container.clientWidth > 0 && container.clientHeight > 0) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
});