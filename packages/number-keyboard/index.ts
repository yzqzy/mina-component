/**
 * @file 数字键盘组件
 * @module NumberKeyboard
 */

import { MinaComponent } from '../common/component';
import { KeyConfig, getKeys } from './shared/index';

MinaComponent({
  /**
   * @property {string} theme - 键盘主题（default/custom）
   * @property {string} extraKey - 键盘按键扩展
   * @property {boolean} randomKey - 键盘按键乱序
   * @property {string} confirmColor - 确认按钮颜色
   * @property {string} confirmText - 确认按钮文本
   * @property {boolean} confirmDisabled - 禁用确认按钮
   */
  props: {
    theme: {
      type: String,
      value: 'default',
      observer() {
        this.setKeys();
      }
    },
    extraKey: {
      type: String,
      value: '.',
      observer(val) {
        this.setKeys(val);
      }
    },
    randomKey: {
      type: Boolean,
      value: false,
      observer() {
        this.setKeys();
      }
    },
    confirmColor: {
      type: String,
      value: 'blue',
    },
    confirmText: {
      type: String,
      value: '确认'
    },
    confirmDisabled: {
      type: Boolean,
      value: false
    },
  },

  /**
   * @property {KeyConfig[]} keys - 按键数组
   */
  data: {
    keys: [] as KeyConfig[]
  },

  mounted() {
    this.setKeys()
  },

  methods: {
    // 点击事件处理
    onPress(e: any) {
      const { type, text } = e.currentTarget.dataset;

      switch (type) {
        case 'delete':
          this.triggerEvent('delete');
          break;
        case 'close':
          if (!this.data.confirmDisabled) {
            this.triggerEvent('close');
          }
          break;
        default:
          this.triggerEvent('input', text);
          break;
      }
    },
    // 设置按键集合
    setKeys(value?: string) {
      const { theme, extraKey, randomKey } = this.data;

      const keys = getKeys({
        theme,
        extraKey: value || extraKey,
        randomKey
      }) as KeyConfig[];

      this.setData({
        keys
      });
    }
  },
});
