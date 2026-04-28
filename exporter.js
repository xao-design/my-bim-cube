export async function downloadIFC(currentHeight) {
    try {
        // Fetch the template (uses relative path for GitHub Pages)
        const response = await fetch('./template.ifc');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const templateText = await response.text();

        // Search and replace the extrusion height
        const updatedIfc = templateText.replace(
            /(#37=IFCEXTRUDEDAREASOLID\(#38,#42,#46,)([\d.]+)(\);)/,
            `$1${parseFloat(currentHeight).toFixed(1)}$3`
        );

        // Trigger the browser download
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
}