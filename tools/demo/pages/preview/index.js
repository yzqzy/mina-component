/**
 * @file 预览组件使用
 * @module pages/preview/index
 * @author 月落 <yueluo.yang@qq.com>
 */

Page({
  /**
   * @property {array} imgs - 图片列表
   */
  data: {
    imgs: [
      {
        url: 'https://data.yueluo.club/yueluo.png'
      },
      {
        url: 'https://data.yueluo.club/leetcode.png'
      },
      {
        url: 'https://data.yueluo.club/es6.jpg'
      }
    ]
  },

  // 预览组件引用
  previewRef: null,

  onLoad() {
    this.init();
  },

  async init() {
  },

  /**
   * @description 预览单张图片
   * @returns {void}
   */
  handlePreviewSingle(e) {
    const { index } = e.currentTarget.dataset;

    console.log(index);
  },

  /**
   * @description 关闭预览组件
   * @returns {void}
   */
  handleClosePreview() {
    console.log('close');
  },

  /**
   * @description 预览组件下标改变
   * @returns {void}
   */
  handlePreviewChange({ current }) {
    console.log(current);
  }
});
