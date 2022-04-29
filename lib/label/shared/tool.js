"use strict";
/**
 * @file 工具函数
 * @module label/shared/tool
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealPath = exports.computeLayout = exports.drawLayout = exports.selectorQuery = void 0;
var selectorQuery = function (selector, receiver) {
    var query = (receiver || wx).createSelectorQuery();
    return new Promise(function (resolve, reject) {
        query
            .select(selector)
            .fields({ node: true, size: true, rect: true })
            .exec(function (res) {
            if (Array.isArray(res) && res[0]) {
                resolve(res[0]);
                return;
            }
            reject(new TypeError('no selector.'));
        });
    });
};
exports.selectorQuery = selectorQuery;
var drawLayout = function (_a, receiver) {
    var dpr = _a.dpr, width = _a.width, height = _a.height, selector = _a.selector;
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var ans, canvas, canvasCtx, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, exports.selectorQuery)(selector, receiver)];
                case 1:
                    ans = _a.sent();
                    canvas = ans.node;
                    if (!canvas)
                        return [2 /*return*/];
                    canvasCtx = canvas.getContext('2d');
                    canvas.width = width * dpr;
                    canvas.height = height * dpr;
                    canvasCtx.scale(dpr, dpr);
                    resolve({
                        canvas: canvas,
                        ctx: canvasCtx,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    reject(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.drawLayout = drawLayout;
var computeLayout = function (maxWidth, maxHeight, width, height) {
    var originWidth = width;
    var originHeight = height;
    if (width > maxWidth) {
        // eslint-disable-next-line operator-assignment
        height = (maxWidth / width) * height;
        width = maxWidth;
    }
    if (height > maxHeight) {
        // eslint-disable-next-line operator-assignment
        width = (maxHeight / height) * width;
        height = maxHeight;
    }
    return {
        width: width,
        height: height,
        scale: {
            x: originWidth / width,
            y: originHeight / height,
        },
    };
};
exports.computeLayout = computeLayout;
var platforms = {
    android: true,
    ios: true,
    windows: false,
    mac: false,
};
var checkisMobile = function () {
    return new Promise(function (resolve, reject) {
        wx.getSystemInfo({
            success: function (result) {
                resolve(platforms[result.platform] || false);
            },
            // eslint-disable-next-line prefer-promise-reject-errors
            fail: function () { return reject(false); },
        });
    });
};
var getTempFilePath = function (path) {
    return new Promise(function (resolve, reject) {
        wx.downloadFile({
            url: path,
            success: function (result) {
                resolve(result.tempFilePath);
            },
            // eslint-disable-next-line prefer-promise-reject-errors
            fail: function () { return reject(''); },
        });
    });
};
var getRealPath = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var isMobile, dest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkisMobile()];
            case 1:
                isMobile = _a.sent();
                if (isMobile)
                    return [2 /*return*/, path];
                return [4 /*yield*/, getTempFilePath(path)];
            case 2:
                dest = _a.sent();
                return [2 /*return*/, dest];
        }
    });
}); };
exports.getRealPath = getRealPath;
