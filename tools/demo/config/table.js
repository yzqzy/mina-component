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
    width: 280,
    dataIndex: 'name',
    sub: {
      dataIndex: 'mobile',
    }
  },
  {
    title: '性别',
    align: 'flex-end',
    dataIndex: 'sex',
    width: 200,
    sortable: true
  },
  {
    title: '年龄',
    align: 'flex-end',
    dataIndex: 'age',
    width: 200,
    sortable: true
  },
  {
    title: '爱好',
    align: 'flex-end',
    dataIndex: 'hobbiesStr',
    width: 200,
    tooltip: {
      show: true,
      limit: 6
    }
  }
];
