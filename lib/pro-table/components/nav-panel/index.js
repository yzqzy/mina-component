"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../../../common/component");
(0, component_1.VantComponent)({
    props: {
        /**
         * @property {Number} width - 面板宽度
         */
        width: {
            type: Number,
            value: 53,
        },
    },
    mounted: function () {
        if (wx.getMenuButtonBoundingClientRect) {
            this.safeAreaTop =
                (wx.getMenuButtonBoundingClientRect() || { bottom: 0 }).bottom + 10;
        }
    },
    data: {
        /**
         * @property {Number} safeAreaTop - 顶部安全边距
         */
        safeAreaTop: 0,
    },
    methods: {
        /**
         * @description 横屏按钮切换
         */
        handleSwitch: function () {
            this.triggerEvent('onSwitch');
        },
    },
});
