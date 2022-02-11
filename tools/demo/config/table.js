/**
 * @file ProTable 配置文件
 * @module config/table
 */

/**
 * @constant {Array<Object>} STUDENT_COLUMNS - 表格配置
 */
export const STUDENT_COLUMNS = [
  {
    title: '姓名',
    fixed: 'left',
    align: 'left',
    width: 260,
    dataIndex: 'name',
    sub: {
      dataIndex: 'mobile',
    }
  },
  {
    title: '性别',
    align: 'flex-end',
    dataIndex: 'age',
  },
  {
    title: '爱好',
    align: 'flex-end',
    dataIndex: 'hobbiesStr',
  }
];
