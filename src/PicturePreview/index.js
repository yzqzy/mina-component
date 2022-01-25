/**
 * @file 图片预览组件
 * @module PicturePreview
 * @author 月落 <yueluo.yang@qq.com>
 */

Component({
  /**
   * @property {number} scaleMin - 缩放倍数最小值
   * @property {number} scaleMax - 缩放倍数最大值
   */
  properties: {
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

  observers: {
    currScaleVal(newVal) {
      this.setData({
        moveable: newVal === 1
      });
    }
  },

  methods: {
    /**
     * @description 是否处于预览状态
     * @returns {boolean}
     */
    isPreview() {
      return this.data.showPreview;
    },
    /**
     * @description 开始预览
     * @param {object} options - 预览配置
     * @param {number} options.current - 当前预览下标
     * @param {array} options.urls - 待预览数组
     * @returns {void}
     */
    show({ current, urls }) {
      this.setData({
        current,
        urls,
        showPreview: true
      });
    },
    /**
     * @description 结束预览
     * @returns {void}
     */
    hide() {
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
    update({ current, urls }) {
      const { current: prevCurrent } = this.data;

      this.resetData();

      if (Array.isArray(urls) && urls.length) {
        const curr = Math.min(current || prevCurrent, urls.length);

        this.setData({
          urls,
          current: curr
        });
        return;
      }

      this.onClose();
    },
    /**
     * @description current 更改
     * @returns {void}
     */
    onChange(e) {
      const { current } = e.detail;

      this.setData({ current });
      this.triggerEvent('change', { current });
    },
    /**
     * @description 关闭预览弹窗
     * @returns {void}
     */
    onClose(e) {
      const {
        scaleVal, scaleMax, currScaleVal, lastSt, delayTimer, clicked
      } = this.data;
      const { timeStamp } = e;

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
      if (currScaleVal > 1 || !clicked) return;

      const timer = setTimeout(() => {
        if (this.data.clicked) {
          this.hide();
          this.triggerEvent('close');
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
    resetData(delay = 0) {
      const { currScaleVal } = this.data;

      this.setData({
        scaleVal: currScaleVal,
        clicked: false
      });

      setTimeout(() => {
        this.setData({
          scaleVal: 1,
          currScaleVal: 1
        });

        setTimeout(() => {
          this.setData({
            clicked: true
          });
        }, 300);
      }, delay);
    },
    /**
     * @description 缩放倍数更改
     * @returns {void}
     */
    onScaleChange(e) {
      const { scale } = e.detail;

      this.setData({
        currScaleVal: scale
      });
    },
    /**
     * @description 触摸结束
     * @returns {void}
     */
    onTouchEnd() {
      if (this.data.currScaleVal < 1) {
        this.resetData(100);
      }
    }
  }
});
