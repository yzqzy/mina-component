import Page from '../../common/page';

Page({
  data: {
    label: {},
  },

  onLoad(options) {
    this.setData({
      label: options,
    });
  },
});
