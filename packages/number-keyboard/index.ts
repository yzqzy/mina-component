/**
 * @file 数字键盘组件
 * @module NumberKeyboard
 */

import { MinaComponent } from '../common/component';
import { genCustomKeys } from './shared/index';

MinaComponent({
  /**
   * @property {boolean} show - 是否展示
   * @property {string} color - 确认按钮颜色
   */
  props: {
    show: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: 'blue',
    },
  },

  /**
   * @property {KeyConfig[]} keys - 按键数组
   */
  data: {
    keys: genCustomKeys({
      extraKey: '.',
    }),
  },

  methods: {},
});
