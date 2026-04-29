// /src/math/gridCalculator.js

export function calculateCustomGrid(totalX, totalY) {
    // --- U-AXIS (Width / X) ---
    const Ex = totalX / 2;
    const B = Ex / 3;

    // We use a dictionary (Object) so we can keep the letters mapped to the math
    const uAxis = {
        'A': 0,
        'B': B,
        'C': B + B,
        'D': Ex - 2,
        'E': Ex,
        'F': Ex + 2,
        'G': Ex + B,
        'H': Ex + B + B,
        'I': totalX
    };

    // --- V-AXIS (Depth / Z) ---
    const Ey = totalY / 2; // Assuming E for the Y axis means the center of Y
    const vAxis = {
        '0': 0,
        '1': Ey - 3,
        '2': Ey - 2.2,
        '3': Ey - 0.5,
        '4': Ey,
        '5': Ey + 0.5,
        '6': Ey + 2.2,
        '7': Ey + 3,
        '8': totalY
    };

    // --- COMBINE INTO INTERSECTIONS ---
    const points = [];
    
    // Loop through every U and V combination
    for (const [uName, uVal] of Object.entries(uAxis)) {
        for (const [vName, vVal] of Object.entries(vAxis)) {
            points.push({
                name: `${uName}${vName}`, // e.g., "A0", "B7"
                x: uVal,
                z: vVal 
            });
        }
    }
    
    return points;
}