/**
 * @file 数字键盘组件
 * @module NumberKeyboard
 * @author 月落 <yueluo.yang@qq.com>
 */

import { VantComponent } from '../common/component';

type KeyType = '' | 'delete' | 'extra' | 'close';

type KeyConfig = {
  text?: number;
  type?: KeyType;
  color?: string;
  wider?: boolean;
};

const genBasicKeys = () => {
  const keys = Array(9)
    .fill('')
    .map((_, i) => ({ text: i + 1 }));

  return keys;
};

const genCustomKeys = ({ extraKey }) => {
  const keys = genBasicKeys() as KeyConfig[];
  const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];

  if (extraKeys.length === 1) {
    keys.push({ text: 0, wider: true }, { text: extraKeys[0], type: 'extra' });
  } else if (extraKeys.length === 2) {
    keys.push(
      { text: extraKeys[0], type: 'extra' },
      { text: 0 },
      { text: extraKeys[1], type: 'extra' }
    );
  }

  return keys;
};

VantComponent({
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
