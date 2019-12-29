"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIfProperty(object, property) {
    if (object && typeof object === 'object') {
        const val = object[property];
        return Array.isArray(val) ? val : val;
    }
    return null;
}
function* flatterator(array, props) {
    let found = false;
    if (array) {
        array = makeArrayFromValue(array);
        const stack = array.slice();
        let item = null;
        /* eslint-disable-next-line no-cond-assign , require-atomic-updates */
        while (item = stack.shift()) {
            found = false;
            if (props) {
                props = makeArrayFromValue(props);
                for (const prop of props) {
                    let propVal = getIfProperty(item, prop);
                    if (propVal) {
                        found = true;
                        yield* flatterator(propVal, props);
                    }
                }
            }
            if (!found) {
                yield item;
            }
        }
    }
}
exports.flatterator = flatterator;
function makeArrayFromValue(val) {
    if (!Array.isArray(val)) {
        return [val];
    }
    return val;
}
