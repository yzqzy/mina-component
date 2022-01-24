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

  /**
   * @description 预览单张图片
   * @param {object} e - 事件对象
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
   */
  handlePreviewChange({ current }) {
    console.log(current);
  }
});
