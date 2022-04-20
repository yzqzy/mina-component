"use strict";
/**
 * @file Label - 标注分析
 * @module Label/analysis
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __forceUpdate__ = false;
var callbacks = [];
var mountedCallbacks = [];
var isPlainArray = function (data) { return Array.isArray(data) && data.length; };
var isPlainFunction = function (data) { return typeof data === 'function'; };
var flushCallbacks = function (type) {
    var copies = callbacks.slice(0);
    var mounteCopies = mountedCallbacks.slice(0);
    switch (type) {
        case 'rendered':
            callbacks.length = 0;
            for (var i = 0; i < copies.length; i++) {
                if (isPlainFunction(copies[i])) {
                    copies[i]();
                }
            }
            break;
        case 'mounted':
            mountedCallbacks.length = 0;
            for (var i = 0; i < mounteCopies.length; i++) {
                if (isPlainFunction(mounteCopies[i])) {
                    mounteCopies[i]();
                }
            }
            break;
        default:
            break;
    }
};
var execute = function () { return Promise.resolve().then(function () { return flushCallbacks('rendered'); }); };
var moutedExecute = function () {
    return Promise.resolve().then(function () { return flushCallbacks('mounted'); });
};
(0, component_1.VantComponent)({
    props: {
        /**
         * @property {String} mt - margin top
         * @property {String} mb - margin bottom
         * @property {String} width - 宽度
         * @property {String} height - 高度
         * @property {String} bgColor - 背景颜色
         * @property {Number} scaleMin - 最小缩放倍数
         * @property {Number} scaleMax - 最大缩放倍数
         */
        mt: {
            type: String,
            value: '20rpx',
        },
        mb: {
            type: String,
            value: '20rpx',
        },
        width: {
            type: String,
            value: '100vw',
        },
        height: {
            type: String,
            value: '750rpx',
        },
        bgColor: {
            type: String,
            value: '#fff',
        },
        scaleMin: {
            type: Number,
            default: 0.5,
        },
        scaleMax: {
            type: Number,
            default: 1.5,
        },
        /**
         * @property {Object} colors - 样式配置
         * @property {Array} image - 图片信息
         * @property {Array} labels -标记信息
         */
        colors: {
            type: Object,
            value: {},
        },
        image: {
            type: Object,
            value: {},
        },
        labels: {
            type: Array,
            default: {},
            observer: function (newVal, oldVal) {
                if (isPlainArray(newVal)) {
                    if (__forceUpdate__ || !isPlainArray(oldVal)) {
                        this.init();
                        __forceUpdate__ = false;
                        return;
                    }
                    this.render();
                }
            },
        },
    },
    data: {
        dpr: 0,
        canvasWidth: 0,
        canvasHeight: 0,
        originLabels: [],
        currentLabels: [],
        rendered: false,
        initialMovableArea: {
            left: 0,
            top: 0,
        },
        movableArea: {
            left: 0,
            top: 0,
            scale: 1,
        },
        canvasNodes: {
            image: { canvas: null, ctx: null },
            rect: { canvas: null, ctx: null },
            hljs: { canvas: null, ctx: null },
        },
        basicLayout: {
            width: 0,
            height: 0,
            scale: { x: 0, y: 0 },
            offsetTop: 0,
            offsetLeft: 0,
        },
    },
    methods: {
        init: function () {
            return __awaiter(this, void 0, void 0, function () {
                var pixelRatio;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pixelRatio = wx.getSystemInfoSync().pixelRatio;
                            this.setData({
                                dpr: pixelRatio,
                            });
                            return [4 /*yield*/, this.initLayout()];
                        case 1:
                            _a.sent();
                            this.render();
                            return [2 /*return*/];
                    }
                });
            });
        },
        initLayout: function () {
            return __awaiter(this, void 0, void 0, function () {
                var image;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            image = this.data.image;
                            return [4 /*yield*/, this.computeLayoutSize(image)];
                        case 1:
                            _a.sent();
                            this.drawImageLayout(image);
                            return [4 /*yield*/, this.drawRectLayout()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        render: function () {
            this.setData({
                rendered: false,
            });
            var _a = this.data, labels = _a.labels, canvasNodes = _a.canvasNodes;
            var finalLabels = this.normalizeLabels(labels);
            this.setData({
                originLabels: finalLabels,
            });
            this.drawRectLabels({
                labels: finalLabels,
                canvasNode: canvasNodes.rect,
            });
            this.setData({
                rendered: true,
            }, execute);
        },
        // 计算画布尺寸
        computeLayoutSize: function (image) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, maxWidth, maxHeight, top, left, imageWidth, imageHeight, _b, width, height, scale, offsetLeft, offsetTop;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, (0, tool_1.selectorQuery)('#J-analysis-wrap', this)];
                        case 1:
                            _a = _c.sent(), maxWidth = _a.width, maxHeight = _a.height, top = _a.top, left = _a.left;
                            imageWidth = image.width, imageHeight = image.height;
                            _b = (0, tool_1.computeLayout)(maxWidth, maxHeight, imageWidth, imageHeight), width = _b.width, height = _b.height, scale = _b.scale;
                            offsetLeft = (maxWidth - width) / 2;
                            offsetTop = (maxHeight - height) / 2;
                            this.setData({
                                canvasWidth: width,
                                canvasHeight: height,
                                initialMovableArea: {
                                    left: offsetLeft,
                                    top: offsetTop,
                                },
                                movableArea: {
                                    left: offsetLeft,
                                    top: offsetTop,
                                    scale: 1,
                                },
                                basicLayout: {
                                    width: width,
                                    height: height,
                                    scale: scale,
                                    offsetTop: top,
                                    offsetLeft: left,
                                },
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        // 绘制图片布局
        drawImageLayout: function (image) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, dpr, basicLayout, width, height, _b, canvas, ctx_1, img_1, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.data, dpr = _a.dpr, basicLayout = _a.basicLayout;
                            width = basicLayout.width, height = basicLayout.height;
                            wx.showLoading({
                                title: '图片加载中',
                            });
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, (0, tool_1.drawLayout)({
                                    dpr: dpr,
                                    width: width,
                                    height: height,
                                    selector: '#J-image-canvas',
                                }, this)];
                        case 2:
                            _b = _c.sent(), canvas = _b.canvas, ctx_1 = _b.ctx;
                            this.setData({
                                'canvasNodes.image': { canvas: canvas, ctx: ctx_1 },
                            });
                            img_1 = canvas.createImage();
                            img_1.src = image.image_url;
                            img_1.onload = function () {
                                wx.hideLoading();
                                moutedExecute();
                                ctx_1.drawImage(img_1, 0, 0, width, height);
                            };
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _c.sent();
                            wx.hideLoading();
                            moutedExecute();
                            wx.showToast({
                                title: '图片加载失败',
                            });
                            console.log(error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        // 绘制矩形布局
        drawRectLayout: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, dpr, basicLayout, width, height, rectCanvasAns, hljsCanvasAns, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.data, dpr = _a.dpr, basicLayout = _a.basicLayout;
                            width = basicLayout.width, height = basicLayout.height;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, (0, tool_1.drawLayout)({
                                    dpr: dpr,
                                    width: width,
                                    height: height,
                                    selector: '#J-rect-canvas',
                                }, this)];
                        case 2:
                            rectCanvasAns = _b.sent();
                            this.setData({
                                'canvasNodes.rect': rectCanvasAns,
                            });
                            return [4 /*yield*/, (0, tool_1.drawLayout)({
                                    dpr: dpr,
                                    width: width,
                                    height: height,
                                    selector: '#J-hljs-canvas',
                                }, this)];
                        case 3:
                            hljsCanvasAns = _b.sent();
                            this.setData({
                                'canvasNodes.hljs': hljsCanvasAns,
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _b.sent();
                            console.log(error_2);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        // 标准化数据
        normalizeLabels: function (labels) {
            var _a = this.data, basicLayout = _a.basicLayout, colors = _a.colors;
            var _b = basicLayout.scale, x = _b.x, y = _b.y;
            return (labels || []).map(function (label) {
                var width = label.width, height = label.height, top = label.top, left = label.left;
                return __assign(__assign({}, label), { color: colors[label.status], _left: left / x, _top: top / y, _width: width / x, _height: height / y });
            });
        },
        /**
         * @description 绘制矩形区域
         * @property {array} - labels
         * @property {canvas} - canvasNode
         * @property {function} - beforeDraw
         * @property {function} - drawing
         */
        drawRectLabels: function (options) {
            var labels = options.labels, canvasNode = options.canvasNode, beforeDraw = options.beforeDraw, drawing = options.drawing;
            var ctx = canvasNode.ctx;
            var _a = this.data.basicLayout, width = _a.width, height = _a.height;
            ctx.clearRect(0, 0, width, height);
            beforeDraw && beforeDraw.call(this, ctx);
            var drawingItem = function (label) {
                var _width = label._width, _height = label._height, _top = label._top, _left = label._left, color = label.color;
                ctx.lineWidth = 2;
                ctx.strokeStyle = color;
                if (drawing) {
                    drawing(ctx, label);
                }
                else {
                    ctx.strokeRect(_left, _top, _width, _height);
                }
            };
            if (Array.isArray(labels)) {
                labels.forEach(drawingItem);
                this.setData({
                    currentLabels: labels,
                });
            }
            else {
                console.log('draw rect labels failed.');
            }
        },
        // 触摸区域拖动
        handleMoveableChange: function (e) {
            var _a = e.detail, x = _a.x, y = _a.y;
            var movableArea = this.data.movableArea;
            this.setData({
                movableArea: __assign(__assign({}, movableArea), { left: x, top: y }),
            });
        },
        // 触摸区域缩放
        handleMoveableScaheChange: function (e) {
            var _a = e.detail, scale = _a.scale, x = _a.x, y = _a.y;
            var movableArea = this.data.movableArea;
            this.setData({
                movableArea: __assign(__assign({}, movableArea), { scale: scale, left: x, top: y }),
            });
        },
        // 矩形框点击
        handleRectLabelsClick: function (e) {
            var _a = e.detail, x = _a.x, y = _a.y;
            var _b = this.data, originLabels = _b.originLabels, movableArea = _b.movableArea, basicLayout = _b.basicLayout;
            var top = movableArea.top, left = movableArea.left, scale = movableArea.scale;
            var offsetTop = basicLayout.offsetTop, offsetLeft = basicLayout.offsetLeft;
            var targetX = x - left - offsetLeft;
            var targetY = y - top - offsetTop;
            for (var i = 0; i < originLabels.length; i++) {
                var label = originLabels[i];
                var _top = label._top, _left = label._left, _width = label._width, _height = label._height;
                if (targetX > _left * scale &&
                    targetX < (_left + _width) * scale &&
                    targetY > _top * scale &&
                    targetY < (_top + _height) * scale) {
                    this.triggerEvent('click', __assign(__assign({}, label), { index: i }));
                }
            }
        },
        // 按层筛选
        update: function (options) {
            var _this = this;
            callbacks.push(function () {
                var filterExp = options.filterExp, _a = options.shadow, shadow = _a === void 0 ? false : _a;
                var _b = _this.data, originLabels = _b.originLabels, basicLayout = _b.basicLayout, canvasNodes = _b.canvasNodes;
                var width = basicLayout.width, height = basicLayout.height;
                var labels = originLabels.filter(filterExp);
                var isLayer = shadow || labels.length < originLabels.length;
                var canvasNode = isLayer ? canvasNodes.hljs : canvasNodes.rect;
                var funcOptions = {};
                if (isLayer) {
                    funcOptions = {
                        beforeDraw: function (ctx) {
                            var grad = ctx.createLinearGradient(0, 0, 0, height);
                            grad.addColorStop(0, 'rgba(0, 0, 0, .4)');
                            grad.addColorStop(1, 'rgba(0, 0, 0, .6)');
                            ctx.fillStyle = grad;
                            ctx.fillRect(0, 0, width, height);
                        },
                        drawing: function (ctx, _a) {
                            var _left = _a._left, _top = _a._top, _width = _a._width, _height = _a._height;
                            ctx.clearRect(_left, _top, _width, _height);
                            ctx.strokeRect(_left, _top, _width, _height);
                        },
                    };
                }
                else {
                    funcOptions = {
                        beforeDraw: function () {
                            var canvasNodes = this.data.canvasNodes;
                            canvasNodes.hljs.ctx.clearRect(0, 0, width, height);
                        },
                    };
                }
                _this.drawRectLabels(__assign({ labels: labels, canvasNode: canvasNode }, funcOptions));
            });
            if (this.data.rendered)
                execute();
        },
        // 注册渲染完毕的回调函数
        registerCallbacks: function (fn, options) {
            var mouted = options.mouted, rendered = options.rendered, force = options.force;
            if (mouted) {
                mountedCallbacks.push(fn);
            }
            if (rendered) {
                callbacks.push(fn);
            }
            if (force) {
                __forceUpdate__ = true;
            }
        },
    },
});
