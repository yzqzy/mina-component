"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeys = exports.getDefaultKeys = exports.genCustomKeys = exports.shuffle = void 0;
var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};
exports.shuffle = shuffle;
var genBasicKeys = function (_a) {
    var randomKey = _a.randomKey;
    var keys = Array(9)
        .fill('')
        .map(function (_, i) { return ({ text: i + 1 }); });
    if (randomKey) {
        (0, exports.shuffle)(keys);
    }
    return keys;
};
var genCustomKeys = function (_a) {
    var extraKeys = _a.extraKeys, _b = _a.randomKey, randomKey = _b === void 0 ? false : _b;
    var keys = genBasicKeys({ randomKey: randomKey });
    if (extraKeys.length === 1) {
        keys.push({ text: 0, wider: true }, { text: extraKeys[0], type: 'extra' });
    }
    else if (extraKeys.length === 2) {
        keys.push({ text: extraKeys[0], type: 'extra' }, { text: 0 }, { text: extraKeys[1], type: 'extra' });
    }
    return keys;
};
exports.genCustomKeys = genCustomKeys;
var getDefaultKeys = function (_a) {
    var _b = _a.randomKey, randomKey = _b === void 0 ? false : _b;
    var keys = genBasicKeys({ randomKey: randomKey });
    keys.push({ text: '', type: 'close' }, { text: 0 }, { text: '', type: 'delete' });
    return keys;
};
exports.getDefaultKeys = getDefaultKeys;
var getKeys = function (options) {
    var theme = options.theme, extraKey = options.extraKey, _a = options.randomKey, randomKey = _a === void 0 ? false : _a;
    var extraKeys = extraKey.split(',');
    var config = {
        theme: theme,
        extraKeys: extraKeys,
        randomKey: randomKey
    };
    if (theme === 'default') {
        return (0, exports.getDefaultKeys)(config);
    }
    return (0, exports.genCustomKeys)(config);
};
exports.getKeys = getKeys;
