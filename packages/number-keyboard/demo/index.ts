import { MinaComponent } from '../../common/component';

MinaComponent({
  data: {
    show: true,
    color: 'blue',
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {},
  },
});
