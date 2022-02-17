/**
 * @file NavPanel - 横屏操作栏
 * @module ProTable/portrait
 */

const { bottom } = wx.getMenuButtonBoundingClientRect();

Component({
  properties: {
    /**
     * @property {Number} width - 面板宽度
     */
    width: {
      type: Number,
      value: 53
    }
  },
  data: {
    /**
     * @property {Number} safeAreaTop - 顶部安全边距
     */
    safeAreaTop: bottom + 10
  },
  methods: {
    /**
     * @description 横屏按钮切换
     */
    handleSwitch() {
      this.triggerEvent('onSwitch');
    }
  }
});
