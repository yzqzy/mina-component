/**
 * @file 首页
 * @module pages/index
 */

import { NAV_BARS } from './config/index';

Page({
  /**
   * @property {array} navbars - 功能菜单
   */
  data: {
    navbars: NAV_BARS
  },

  /**
   * @description 支持页面分享
   * @returns {void}
   */
  onShareAppMessage() {}
});
