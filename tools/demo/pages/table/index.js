/**
 * @file ProTable 组件 - 竖屏
 * @module pages/table/index
 */

import { STUDENTS } from '../../config/mock';
import { STUDENT_COLUMNS } from '../../config/table';

Page({
  /**
   * @property {array} columns - 表格列
   * @property {array} list - 表格数据
   */
  data: {
    columns: STUDENT_COLUMNS,
    list: []
  },
  onLoad() {
    this.init();
  },
  init() {
    this.setData({
      list: STUDENTS.map(item => {
        item.hobbiesStr = item.hobbies.join('、');
        return item;
      })
    });
  }
});
