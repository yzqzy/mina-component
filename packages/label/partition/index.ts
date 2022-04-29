/**
 * @file Label - 图片分割
 * @module Label/partition
 */

import { VantComponent } from '../../common/component';

import {
  selectorQuery,
  computeLayout,
  drawLayout,
  getRealPath,
} from '../shared/tool';

VantComponent({
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
      observer(newVal) {
        if (newVal && Object.keys(newVal).length) this.init();
      },
    },
  },

  data: {
    canvasWidth: 0,
    canvasHeight: 0,
  },

  methods: {
    async init() {
      // 计算画布尺寸
      await this.computeLayoutSize();
      // 绘制图片
      this.drawImage();
    },

    // 计算画布尺寸
    async computeLayoutSize() {
      const { width: maxWidth, height: maxHeight } = await selectorQuery(
        '#J-partition-wrap',
        this
      );
      const { width: imageWidth, height: imageHeight } = this.data.label;

      const { width, height } = computeLayout(
        maxWidth,
        maxHeight,
        imageWidth,
        imageHeight
      );

      this.setData({
        canvasWidth: width,
        canvasHeight: height,
      });
    },

    // 切割图片
    async drawImage() {
      const { pixelRatio } = wx.getSystemInfoSync();

      const { canvasWidth, canvasHeight, image, label } = this.data;
      const { image_url: url } = image;
      const { top, left, width, height } = label;

      wx.showLoading({
        title: '图片加载中',
      });

      const { canvas, ctx } = await drawLayout(
        {
          dpr: pixelRatio,
          width: canvasWidth,
          height: canvasHeight,
          selector: '#J-image-canvas',
        },
        this
      );

      const img = canvas.createImage();

      img.src = await getRealPath(url);

      img.onload = () => {
        wx.hideLoading();

        ctx.drawImage(
          img,
          left,
          top,
          width,
          height,
          0,
          0,
          canvasWidth,
          canvasHeight
        );
      };
    },
  },
});
