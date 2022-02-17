/**
 * @file ProTable 组件 - 竖屏
 * @module pages/table/index
 */

import { STUDENTS } from '../../config/mock';
import { STUDENT_COLUMNS1, STUDENT_COLUMNS2 } from './config/table';
import { mobileSlice } from '../../shared/tools';

Page({
  data: {
    /**
     * @property {array} columns1 - 表格列配置
     * @property {array} columns2 - 表格列配置
     * @property {array} dataSource1 - 表格数据源
     * @property {array} dataSource2 - 表格数据源
     * @property {object} orderOptions - 表格排序相关配置
     */
    columns1: STUDENT_COLUMNS1,
    columns2: STUDENT_COLUMNS2,
    dataSource1: [],
    dataSource2: [],

    /**
     * @property {object} orderOptions - 表格排序相关配置
     */
    orderOptions: {
      enabled: true,
      // styleEnabled: true,
      // next: true
    },

    /**
     * @property {string} sortField - 排序字段
     * @property {string} sortType - 排序类型
     */
    sortField: 'age',
    sortType: 'desc'
  },

  onLoad() {
    this.init();
  },

  init() {
    const students = STUDENTS.map(item => {
      item.hobbiesStr = item.hobbies.join('、');
      item.mobile = mobileSlice(item.mobile);
      return item;
    });

    const {sortField, sortType} = this.data;

    // 原地排序
    students.sort((a, b) => (sortType === 'desc' ? b[sortField] - a[sortField] : a[sortField] - b[sortField]));

    this.setData({
      dataSource1: students,
      dataSource2: students
    });
  },

  /**
   * @description 点击表格行
   * @returns {void}
   */
  handleToNext(e) {
    const { index } = e.detail;

    console.log(index);
  },

  /**
   * @description 表格排序
   * @returns {void}
   */
  handleChangeSort(e) {
    const { field, type } = e.detail;
    const { dataSource2 } = this.data;

    const sortType = type === 'desc' ? 'asc' : 'desc';

    dataSource2.sort((a, b) => (sortType === 'desc' ? b[field] - a[field] : a[field] - b[field]));

    this.setData({
      dataSource2,
      sortType
    });
  },

  /**
   * @description 跳转至横屏页面
   * @returns {void}
   */
  handleToLandScapePage() {
    wx.navigateTo({
      url: '/pages/tableLandScape/index'
    });
  }
});
