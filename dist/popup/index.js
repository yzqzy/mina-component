/**
 * @file 弹层组件
 * @module Popup
 */
import { MinaComponent } from '../common/component';
MinaComponent({
    /**
     * @property {boolean} show - 是否展示
     * @property {string} width - 弹层宽度（direction 为 left、right 生效）
     * @property {string} height - 弹层高度（direction 为 top、bottom 生效）
     * @property {number} zIndex - 定位层级
     * @property {number} delay - 动画延迟时间
     * @property {string} direction - 弹出方向
     * @property {string} bgColor - 背景颜色
     */
    props: {
        show: {
            type: Boolean,
            value: false,
            observer(val) {
                this.showStatusChange(val);
            }
        },
        width: {
            type: String,
            value: '400'
        },
        height: {
            type: String,
            value: '400'
        },
        zIndex: {
            type: Number,
            value: 99
        },
        delay: {
            type: Number,
            value: 30
        },
        direction: {
            type: String,
            value: 'bottom'
        },
        bgColor: {
            type: String,
            value: 'rgba(0, 0, 0, .7)'
        }
    },
    /**
     * @property {boolean} showWrap - 控制外层容器
     * @property {boolean} showBoard - 控制内层容器
     */
    data: {
        showWrap: false,
        showBoard: false
    },
    methods: {
        // 显隐状态切换
        showStatusChange(val) {
            const values = ['showWrap', 'showBoard'];
            (val ? values : values.reverse()).forEach((key, index) => {
                setTimeout(() => {
                    this.setData({
                        [key]: val
                    });
                }, index * this.data.delay);
            });
        },
        // 关闭弹窗
        handleClose() {
            this.triggerEvent('close');
        },
        noop() { }
    }
});
