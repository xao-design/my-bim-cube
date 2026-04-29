// state.js

// 1. The actual data holding our absolute truth
// state.js
const data = {
    height: 2.0,
    baysX: 2,
    bayWidthX: 3.0, // We will control this now!
    baysZ: 1,
    bayWidthZ: 4.0  // And this!
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