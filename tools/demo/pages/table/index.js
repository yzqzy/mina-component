/**
 * @file ProTable 组件 - 竖屏
 * @module pages/table/index
 */

import { STUDENTS } from '../../config/mock';
import { STUDENT_COLUMNS } from '../../config/table';
import { mobileSlice } from '../../shared/tools';

Page({
  /**
   * @property {array} columns - 表格列
   * @property {array} dataSource - 表格数据源
   */
  data: {
    columns: STUDENT_COLUMNS,
    dataSource: [],

    orderOptions: {
      enabled: true,
      // styleEnabled: true,
      // next: true
    }
  },
  onLoad() {
    this.init();
  },
  init() {
    this.setData({
      dataSource: STUDENTS.map(item => {
        item.hobbiesStr = item.hobbies.join('、');
        item.mobile = mobileSlice(item.mobile);
        return item;
      })
    });
  }
});
