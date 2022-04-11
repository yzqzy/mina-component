/**
 * @file 标注组件
 * @module pages/label
 */

import { LABELS, RECT_COLORS } from '../../config/label';

Page({
  data: {
    image: LABELS.image,
    labels: LABELS.labels,
    rectColors: RECT_COLORS,
  },
  methods: {
    // 矩形框点击
    handleRectClick(label) {
      const {
        product, layer, index, status
      } = label;

      console.log(product, layer, index, status);
    },
  },
});
