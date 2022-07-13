import { MinaComponent } from '../../common/component';

const OPTIONS = [
  {
    value: 'normal',
    label: '基础键盘'
  },
  {
    value: 'random',
    label: '随机数字键盘'
  },
  {
    value: 'custom',
    label: '带右侧栏键盘'
  },
  {
    value: 'multi',
    label: '多按键键盘'
  }
]

MinaComponent({
  data: {
    theme: 'default',
    extraKey: '.',
    randomKey: false,

    inputValue: '',
    confirmDisabled: true,
    options: OPTIONS
  },

  methods: {
    handlePress(e) {
      const { value } = e.detail

      let key = '';
      let random = false;
      let theme = 'default';

      switch (value) {
        case 'normal':
          key = '.';
          break;
        case 'random':
          random = true;
          break;
        case 'custom':
          key = '.';
          theme = 'custom';
          break;
        case 'multi':
          theme = 'custom';
          key = '00,.';
          break;
        default:
          break;
      }

      this.setData({
        theme,
        extraKey: key,
        randomKey: random
      }, this.handleOpen);
    },

    // 打开弹窗
    handleOpen() {
      this.setData({
        show: true
      });
    },

    // 关闭弹窗
    handleClose() {
      this.setData({
        show: false
      });
    },

    // 输入操作
    handleInput(e) {
      const text = e.detail;

      const _value = this.data.inputValue + '';
      const ans = _value + text;

      if (/^\./.test(ans)) return;
      if (_value.length === 1 && _value === '0' && text !== '.') return;
      if (_value.includes('.') && text === '.') return;

      this.setData(
        {
          inputValue: ans
        },
        this.checkBtnStatus
      );
    },

    // 删除操作
    handleDelete() {
      const _value = this.data.inputValue + '';
      const ans = _value.slice(0, _value.length - 1);

      this.setData(
        {
          inputValue: ans
        },
        this.checkBtnStatus
      );
    },

    // 确认操作
    handleConfirm() {
      this.setData({
        show: false
      });
    },

    // 检测确认按钮是否可用
    checkBtnStatus() {
      const _value = this.data.inputValue;

      this.setData({
        confirmDisabled: _value === '' || /\.$/.test(_value)
      });
    }
  }
});
