import { MinaComponent } from "../../common/component";

type Item = {
  value: string;
  label: string;
}

const OPTIONS: Item[] = [
  {
    value: 'top',
    label: '顶部弹出'
  },
  {
    value: 'bottom',
    label: '底部弹出'
  },
  {
    value: 'left',
    label: '左侧弹出'
  },
  {
    value: 'right',
    label: '右侧弹出'
  }
]

MinaComponent({
  data: {
    show: false,
    direction: "bottom",
    text: "",
    options: OPTIONS
  },

  methods: {
    handlePress(e) {
      const { value } = e.currentTarget.dataset;

      this.setData({
        direction: value,
        text: value.toUpperCase()
      });

      setTimeout(() => {
        this.setData({
          show: true
        });
      }, 300)
    },
    handleClose() {
      this.setData({
        show: false
      });
    }
  }
})
