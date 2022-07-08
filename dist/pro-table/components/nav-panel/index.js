import { MinaComponent } from '../../../common/component';
MinaComponent({
    props: {
        /**
         * @property {Number} width - 面板宽度
         */
        width: {
            type: Number,
            value: 53,
        },
    },
    mounted() {
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
        handleSwitch() {
            this.triggerEvent('onSwitch');
        },
    },
});
