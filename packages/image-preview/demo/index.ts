import { MinaComponent } from '../../common/component';

let previewRef;

MinaComponent({
  data: {
    imgs: [
      {
        id: 1,
        url: 'https://img.yueluo.club/blog/git.jpg',
      },
      {
        id: 2,
        url: 'https://img.yueluo.club/blog/leetcode.png',
      },
      {
        id: 3,
        url: 'https://img.yueluo.club/blog/es6.jpg',
      },
    ],

    current: 0,

    selected: 'base', // base、slot

    imgsHelper: {
      1: {
        focus: true,
      },
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      previewRef = this.selectComponent('#J-preview');
    },

    /**
     * @description 预览单张图片
     * @returns {void}
     */
    handlePreviewSingle(e) {
      const { index, field } = e.currentTarget.dataset;
      const urls = this.data.imgs.map((item) => item.url);

      previewRef.show({
        current: index,
        urls,
      });
      this.setData({
        current: index,
        selected: field,
      });
    },

    /**
     * @description 关闭预览组件
     * @returns {void}
     */
    handleClosePreview() {
      previewRef.hide();
    },

    /**
     * @description 预览组件下标改变
     * @returns {void}
     */
    handlePreviewChange(e) {
      const { current } = e.detail;

      this.setData({
        current,
      });
    },

    /**
     * @description 修改收藏状态
     * @returns {void}
     */
    hanleSwitchFocusStatus(e) {
      const { current } = e.currentTarget.dataset;
      const { imgsHelper } = this.data;

      if (!imgsHelper[current]) {
        imgsHelper[current] = { focus: false };
      }

      const { focus } = imgsHelper[current];
      const content = focus
        ? '您确认取消收藏该图片吗？'
        : '您确认收藏该图片吗？';

      wx.showModal({
        content,
        confirmColor: '#457EFC',
        confirmText: '确定',
        cancelColor: '#999999',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              [`imgsHelper[${current}]`]: {
                focus: !focus,
              },
            });
          }
        },
      });
    },
  },
});
