"use strict";
/**
 * @file Label - 图片分割
 * @module Label/partition
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
var component_1 = require("../../common/component");
var tool_1 = require("../shared/tool");
(0, component_1.MinaComponent)({
    props: {
        width: {
            type: String,
            default: '100vw',
        },
        height: {
            type: String,
            default: '750rpx',
        },
        image: {
            type: Object,
            default: {},
        },
        label: {
            type: Object,
            default: {},
            observer: function (newVal) {
                if (newVal && Object.keys(newVal).length)
                    this.init();
            },
        },
    },
    data: {
        canvasWidth: 0,
        canvasHeight: 0,
    },
    methods: {
        init: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // 计算画布尺寸
                        return [4 /*yield*/, this.computeLayoutSize()];
                        case 1:
                            // 计算画布尺寸
                            _a.sent();
                            // 绘制图片
                            this.drawImage();
                            return [2 /*return*/];
                    }
                });
            });
        },
        // 计算画布尺寸
        computeLayoutSize: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, maxWidth, maxHeight, _b, imageWidth, imageHeight, _c, width, height;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, (0, tool_1.selectorQuery)('#J-partition-wrap', this)];
                        case 1:
                            _a = _d.sent(), maxWidth = _a.width, maxHeight = _a.height;
                            _b = this.data.label, imageWidth = _b.width, imageHeight = _b.height;
                            _c = (0, tool_1.computeLayout)(maxWidth, maxHeight, imageWidth, imageHeight), width = _c.width, height = _c.height;
                            this.setData({
                                canvasWidth: width,
                                canvasHeight: height,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        // 切割图片
        drawImage: function () {
            return __awaiter(this, void 0, void 0, function () {
                var pixelRatio, _a, canvasWidth, canvasHeight, image, label, url, top, left, width, height, _b, canvas, ctx, img, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            pixelRatio = wx.getSystemInfoSync().pixelRatio;
                            _a = this.data, canvasWidth = _a.canvasWidth, canvasHeight = _a.canvasHeight, image = _a.image, label = _a.label;
                            url = image.image_url;
                            top = label.top, left = label.left, width = label.width, height = label.height;
                            wx.showLoading({
                                title: '图片加载中',
                            });
                            return [4 /*yield*/, (0, tool_1.drawLayout)({
                                    dpr: pixelRatio,
                                    width: canvasWidth,
                                    height: canvasHeight,
                                    selector: '#J-image-canvas',
                                }, this)];
                        case 1:
                            _b = _d.sent(), canvas = _b.canvas, ctx = _b.ctx;
                            img = canvas.createImage();
                            _c = img;
                            return [4 /*yield*/, (0, tool_1.getRealPath)(url)];
                        case 2:
                            _c.src = _d.sent();
                            img.onload = function () {
                                wx.hideLoading();
                                ctx.drawImage(img, left, top, width, height, 0, 0, canvasWidth, canvasHeight);
                            };
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
