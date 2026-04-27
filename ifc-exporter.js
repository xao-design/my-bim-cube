export async function downloadIFC(currentHeight) {
    // 1. We fetch the "Standard" IFC cube you created
    const response = await fetch('/template.ifc');
    let ifcText = await response.text();

    // 2. The "Genius" Part: Search for the height parameter
    // In many IFC files, the extrusion height looks like: ,5.0);
    // We use a Regular Expression to find and replace it
    const newIfcText = ifcText.replace(/(IFCEXTRUDEDAREASOLID\(.*?,.*?,.*?,)([\d.]+)(\);)/g, `$1${currentHeight}$3`);

    // 3. Trigger the Browser Download
    const blob = new Blob([newIfcText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `custom-product-${currentHeight}m.ifc`;
    link.click();
}