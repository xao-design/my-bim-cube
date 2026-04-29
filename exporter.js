// exporter.js
import { state } from './src/core/state.js';
import * as WebIFC from 'web-ifc';

// 1. Boot up the C++ WebAssembly Engine
const ifcApi = new WebIFC.IfcAPI();

// Tell it where to find the WASM files we just copied
ifcApi.SetWasmPath(import.meta.env.BASE_URL + 'wasm/');

// We want to initialize this in the background immediately
let isEngineReady = false;
ifcApi.Init().then(() => {
    isEngineReady = true;
    console.log("Web-IFC Engine is locked and loaded!");
});

export async function downloadIFC() {
    if (!isEngineReady) {
        alert("The IFC Engine is still loading, please wait a second!");
        return;
    }

    try {
        console.log("Downloading base template...");
        const response = await fetch('./template.ifc');
        const buffer = await response.arrayBuffer();
        
        // Convert the file into a format the C++ engine understands (Uint8Array)
        const data = new Uint8Array(buffer);
        
        // 2. Open the model properly in memory!
        const modelID = ifcApi.OpenModel(data);
        console.log(`Model opened successfully. ID: ${modelID}`);

        // --- FUTURE MAGIC GOES HERE ---
        // In the next step, we will use the API to loop through state.baysX 
        // and physically inject new IfcColumns into the model right here!
        // ------------------------------

        // 3. Export the modified model back to a file
        const exportedData = ifcApi.SaveModel(modelID);
        
        // 4. Close the model to free up computer memory (NO MEMORY LEAKS!)
        ifcApi.CloseModel(modelID);

        // 5. Download it to the user's computer
        const blob = new Blob([exportedData], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Parametric_Grid_${state.baysX}x${state.baysZ}.ifc`;
        link.click();
        
        console.log("True IFC Exported successfully!");
    } catch (err) {
        console.error("Export failed:", err);
        alert("Export failed! Check the console for details.");
    }
}