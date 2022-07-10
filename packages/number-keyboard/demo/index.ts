import { MinaComponent } from '../../common/component';

MinaComponent({
  data: {
    inputValue: "",
    confirmDisabled: true
  },

  methods: {
    // 打开弹窗
    handleOpen() {
      this.setData({
        show: true
      });
    },

    // 关闭弹窗
    handleClose() {
      if (this.inputValue >= this.min) {
        this.setData({
          show: false
        });
      }
    },

    // 输入操作
    handleInput(e) {
      const text = e.detail;

      const _value = this.data.inputValue + "";
      const ans = _value + text;

      if (/^\./.test(ans)) return;
      if (_value.length === 1 && _value === '0' && text !== ".") return;
      if (_value.includes(".") && text === ".") return;

      this.setData({
        inputValue: ans
      }, this.checkBtnStatus);
    },

    // 删除操作
    handleDelete() {
      const _value = this.data.inputValue + "";
      const ans = _value.slice(0, _value.length - 1);

      this.setData({
        inputValue: ans
      }, this.checkBtnStatus);
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
  },
});
