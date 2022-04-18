"use strict";
/**
 * @file 图片预览组件
 * @module ImagePreview
 * @author 月落 <yueluo.yang@qq.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
(0, component_1.VantComponent)({
    /**
     * @property {number} scaleMin - 缩放倍数最小值
     * @property {number} scaleMax - 缩放倍数最大值
     */
    props: {
        scaleMin: {
            type: Number,
            value: 0.5
        },
        scaleMax: {
            type: Number,
            value: 1.5
        }
    },
    /**
     * @property {boolean} showPreview - 是否开始预览
     * @property {number} current - 当前下标
     * @property {array} urls - 预览图片数组
     * @property {boolean} clicked - 图片是否可以点击
     * @property {boolean} moveable - swiper 是否可以滚动
     * @property {number} lastSt - 上次点击的时间戳
     * @property {number} scaleVal - 缩放倍数
     * @property {number} currScaleVal - 当前缩放倍数
     * @property {number} delayTimer - 延时器ID
     */
    data: {
        showPreview: false,
        current: 0,
        urls: [],
        clicked: true,
        moveable: true,
        lastSt: 0,
        scaleVal: 1,
        currScaleVal: 1,
        delayTimer: null,
    },
    methods: {
        /**
         * @description 是否处于预览状态
         * @returns {boolean}
         */
        isPreview: function () {
            return this.data.showPreview;
        },
        /**
         * @description 开始预览
         * @param {object} options - 预览配置
         * @param {number} options.current - 当前预览下标
         * @param {array} options.urls - 待预览数组
         * @returns {void}
         */
        show: function (_a) {
            var current = _a.current, urls = _a.urls;
            this.setData({
                current: current,
                urls: urls,
                showPreview: true
            });
        },
        /**
         * @description 结束预览
         * @returns {void}
         */
        hide: function () {
            this.setData({
                showPreview: false
            });
        },
        /**
         * @description 更新预览配置
         * @param {object} options - 预览配置
         * @param {number} options.current - 当前预览下标
         * @param {array} options.urls - 待预览数组
         * @returns {void}
         */
        update: function (_a) {
            var current = _a.current, urls = _a.urls;
            var prevCurrent = this.data.current;
            this.resetData();
            if (Array.isArray(urls) && urls.length) {
                var curr = Math.min(current || prevCurrent, urls.length);
                this.setData({
                    urls: urls,
                    current: curr
                });
                return;
            }
            this.onClose({
                timeStamp: Date.now()
            });
        },
        /**
         * @description current 更改
         * @returns {void}
         */
        onChange: function (e) {
            var current = e.detail.current;
            this.setData({ current: current });
            this.triggerEvent('onChange', { current: current });
        },
        /**
         * @description 关闭预览弹窗
         * @returns {void}
         */
        onClose: function (e) {
            var _this = this;
            var _a = this.data, scaleVal = _a.scaleVal, scaleMax = _a.scaleMax, currScaleVal = _a.currScaleVal, lastSt = _a.lastSt, delayTimer = _a.delayTimer, clicked = _a.clicked;
            var timeStamp = e.timeStamp;
            // 判断双击事件
            if (timeStamp - lastSt < 300) {
                delayTimer && clearTimeout(delayTimer);
                this.setData({
                    scaleVal: scaleVal > 1 ? 1 : scaleMax
                });
                return;
            }
            this.setData({
                lastSt: timeStamp
            });
            // 限制点击
            if (currScaleVal > 1 || !clicked)
                return;
            var timer = setTimeout(function () {
                if (_this.data.clicked) {
                    _this.hide();
                    _this.triggerEvent('onClose');
                }
            }, 300);
            this.setData({
                delayTimer: timer
            });
        },
        /**
         * @description 初始化数据
         * @param {number} delay - 延时时间
         * @returns {void}
         */
        resetData: function (delay) {
            var _this = this;
            if (delay === void 0) { delay = 0; }
            var currScaleVal = this.data.currScaleVal;
            this.setData({
                scaleVal: currScaleVal,
                clicked: false
            });
            setTimeout(function () {
                _this.setData({
                    scaleVal: 1,
                    currScaleVal: 1,
                    moveable: true
                });
                setTimeout(function () {
                    _this.setData({
                        clicked: true
                    });
                }, 300);
            }, delay);
        },
        /**
         * @description 缩放倍数更改
         * @returns {void}
         */
        onScaleChange: function (e) {
            var scale = e.detail.scale;
            this.setData({
                currScaleVal: scale,
                moveable: scale === 1
            });
        },
        /**
         * @description 触摸结束
         * @returns {void}
         */
        onTouchEnd: function () {
            if (this.data.currScaleVal < 1) {
                this.resetData(100);
            }
        }
    },
});
