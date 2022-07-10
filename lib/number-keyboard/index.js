"use strict";
/**
 * @file 数字键盘组件
 * @module NumberKeyboard
 */
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var index_1 = require("./shared/index");
(0, component_1.MinaComponent)({
    /**
     * @property {string} confirmColor - 确认按钮颜色
     * @property {string} confirmText - 确认按钮文本
     * @property {boolean} confirmDisabled - 禁用确认按钮
     * @property {string} extraKey - 扩展 Key
     * @property {number} zIndex - 定位层级
     */
    props: {
        confirmColor: {
            type: String,
            value: 'blue',
        },
        confirmText: {
            type: String,
            value: '确认'
        },
        confirmDisabled: {
            type: Boolean,
            value: false
        },
        extraKey: {
            type: String,
            value: '.',
            observer: function (val) {
                this.setKeys(val);
            }
        }
    },
    /**
     * @property {KeyConfig[]} keys - 按键数组
     */
    data: {
        keys: (0, index_1.genCustomKeys)({
            extraKey: '.',
        })
    },
    methods: {
        // 点击事件处理
        onPress: function (e) {
            var _a = e.currentTarget.dataset, type = _a.type, text = _a.text;
            switch (type) {
                case 'delete':
                    this.triggerEvent('delete');
                    break;
                case 'close':
                    if (!this.data.confirmDisabled) {
                        this.triggerEvent('close');
                    }
                    break;
                default:
                    this.triggerEvent('input', text);
                    break;
            }
        },
        // 设置按键集合
        setKeys: function (value) {
            this.setData({
                keys: (0, index_1.genCustomKeys)({
                    extraKey: value,
                })
            });
        }
    },
});
