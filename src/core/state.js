// /src/core/state.js
const data = {
    height: 2.0,
    widthX: 12.0, // min 12m
    depthY: 6.0   // min 6m
};

const listeners = [];

export function subscribe(callback) {
    listeners.push(callback);
}

export const state = new Proxy(data, {
    set(target, property, value) {
        target[property] = value;
        listeners.forEach(listener => listener(property, value));
        return true;
    }
});