// state.js

// 1. The actual data holding our absolute truth
const data = {
    height: 2.0,
    baysX: 2,       // Number of spaces in the X direction
    bayWidthX: 3.0, // How wide each space is (meters)
    baysZ: 1,       // Number of spaces in the Z direction
    bayWidthZ: 4.0  // How deep each space is (meters)
};

// 2. A list of people listening to the loudspeaker
const listeners = [];

export function subscribe(callback) {
    listeners.push(callback);
}

// 3. The Proxy (The Security Guard)
export const state = new Proxy(data, {
    set(target, property, value) {
        target[property] = value; // Update the data
        
        // Announce the change over the loudspeaker to anyone listening
        listeners.forEach(listener => listener(property, value));
        
        return true; // Tell JavaScript the update was successful
    }
});