/**
 * @file ProTable - 竖屏
 * @module ProTable/portrait
 */

import { normalizeColumns, normalizeDataSource } from '../shared';

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    /**
     * @property {Number} mt - margin top
     * @property {Number} mr - margin right
     * @property {Number} rowH - row height
     */
    mt: {
      type: Number,
      value: 0
    },
    mr: {
      type: Number,
      value: 0
    },
    rowH: {
      type: Number,
      value: 45
    },

    /**
     * @property {Array} columns - 列配置
     * @property {Array} dataSource - 数据
     */
    columns: {
      type: Array,
      value: []
    },
    dataSource: {
      type: Array,
      value: []
    },

    /**
     * @property {Object} order - 排序相关配置
     * @property {Boolean} order.enabled - 启用排序
     * @property {Boolean} order.styleEnabled - 启用排序样式
     * @property {Boolean} order.next - 是否存在下一级
     */
    order: {
      type: Object,
      value: {}
    }
  },
  data: {
    /**
     * @property {Number} height - 表格高度
     */
    height: 0,

    /**
     * @property {Array} leftColumns - 左侧固定列
     * @property {Array} middleColumns - 正常列
     */
    leftColumns: [],
    middleColumns: [],

    /**
     * @property {Array} list - 表格数据
     */
    list: [],

    /**
     * @property {Object} tooltip - 工具提示
     */
    tooltip: {
      show: false,
      text: ''
    }
  },
  observers: {
    dataSource() {
      this.init();
    }
  },
  lifetimes: {
    attached() {
      this.init();
    }
  },
  methods: {
    init() {
      this.initData();
    },
    initData() {
      const { columns, dataSource, rowH } = this.data;
      const { leftColumns, middleColumns } = normalizeColumns(columns);

      const { height, list } = normalizeDataSource({
        leftColumns,
        middleColumns,
        dataSource,
        rowH
      });

      this.setData({
        leftColumns,
        middleColumns,
        height,
        list
      });
    }
  }
});