"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genCustomKeys = void 0;
var genBasicKeys = function () {
    var keys = Array(9)
        .fill('')
        .map(function (_, i) { return ({ text: i + 1 }); });
    return keys;
};
var genCustomKeys = function (_a) {
    var extraKey = _a.extraKey;
    var keys = genBasicKeys();
    var extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
    if (extraKeys.length === 1) {
        keys.push({ text: 0, wider: true }, { text: extraKeys[0], type: 'extra' });
    }
    else if (extraKeys.length === 2) {
        keys.push({ text: extraKeys[0], type: 'extra' }, { text: 0 }, { text: extraKeys[1], type: 'extra' });
    }
    return keys;
};
exports.genCustomKeys = genCustomKeys;
