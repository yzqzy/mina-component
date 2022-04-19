import { VantComponent } from '../../../common/component';

import {
  LABELS,
  LABEL_COLORS,
  RECT_COLORS,
  LAYER_MAPPING,
} from './config/index';

let labelAnalysisRef;

VantComponent({
  data: {
    image: LABELS.image,
    labels: LABELS.labels,
    labelColors: LABEL_COLORS,
    rectColors: RECT_COLORS,

    layers: [
      {
        key: 'all',
        label: '汇总',
      },
    ],
    layer: 'all',

    content: '',
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      // 获取标注组件实例
      labelAnalysisRef = this.selectComponent('#J-chart-analysis');
      // 计算层级
      this.computeLayers();
    },

    // 计算层级
    computeLayers() {
      const { labels, layers } = this.data;

      const deep = labels.reduce((pre, cur) => {
        if (pre < cur.layer) {
          pre = cur.layer;
        }
        return pre;
      }, 0);

      for (let i = 1; i <= deep; i++) {
        layers.push({
          key: i + '',
          label: `${LAYER_MAPPING[i]}层`,
        });
      }

      this.setData({
        layers,
      });
    },

    // 矩形框点击
    handleRectClick(e) {
      const { product, layer, index, status } = e.detail;

      const __update__ = () => {
        labelAnalysisRef.update({
          filterExp: (_, idx) => idx === index,
        });
      };

      if (status === 'unknown') {
        __update__();

        this.setData({
          content: '未识别商品',
        });
        return;
      }

      __update__();

      this.setData({
        layer,
        content: product.name,
      });
    },

    // 按层筛选
    handleLayerFilter(e) {
      const { field } = e.currentTarget.dataset;

      let filterFn;

      switch (field) {
        // 汇总
        case 'all':
          filterFn = () => true;
          break;
        // 按层
        default:
          filterFn = (label) =>
            label.status !== 'unknown' && label.layer === Number(field);
          break;
      }

      this.setData({
        layer: field,
        content: '',
      });
      labelAnalysisRef.update({
        filterExp: filterFn,
      });
    },
  },
});
