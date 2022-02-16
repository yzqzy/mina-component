/**
 * @file ProTable - 横屏
 * @module ProTable/landscape
 */

import { normalizeColumns, normalizeDataSource } from '../shared';

const { safeArea: { left } } = wx.getSystemInfoSync();

Component({
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
    * @property {String} sortField - 排序字段
    * @property {String} sortType - 排序类型 desc、asc
    */
    sortField: {
      type: String,
      value: ''
    },
    sortType: {
      type: String,
      value: 'desc'
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
     * @property {Number} safeAreaLeft - 左侧安全边距
     */
    safeAreaLeft: left,

    /**
    * @property {Array} leftColumns - 左侧固定列
    * @property {Array} middleColumns - 正常列
    */
    leftColumns: [],
    middleColumns: [],

    /**
    * @property {Array} list - 表格数据
    */
    list: []
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

      const { list } = normalizeDataSource({
        leftColumns,
        middleColumns,
        dataSource,
        rowH
      });

      this.setData({
        leftColumns,
        middleColumns,
        list
      });
    },

    /**
    * @description 点击表格项
    * @returns {void}
    */
    handleToNext(e) {
      const { index } = e.currentTarget.dataset;

      this.triggerEvent('onNext', { index });
    },

    /**
    * @description 表格排序
    * @returns {void}
    */
    handleChangeSort(e) {
      const { sortable, field } = e.currentTarget.dataset;

      if (sortable) {
        this.triggerEvent('onChangeSort', { field, type: this.data.sortType });
      }
    },

    /**
     * @description 页面触底
     * @returns {void}
     */
    handleLoadMore(e) {
      const { direction } = e.detail;

      if (direction === 'bottom') {
        this.triggerEvent('onLoadMore');
      }
    },

    noop() {}
  }
});
