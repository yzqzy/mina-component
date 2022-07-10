/**
 * @file 数字键盘组件
 * @module NumberKeyboard
 */
import { MinaComponent } from '../common/component';
import { genCustomKeys } from './shared/index';
MinaComponent({
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
            observer(val) {
                this.setKeys(val);
            }
        }
    },
    /**
     * @property {KeyConfig[]} keys - 按键数组
     */
    data: {
        keys: genCustomKeys({
            extraKey: '.',
        })
    },
    methods: {
        // 点击事件处理
        onPress(e) {
            const { type, text } = e.currentTarget.dataset;
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
        setKeys(value) {
            this.setData({
                keys: genCustomKeys({
                    extraKey: value,
                })
            });
        }
    },
});
