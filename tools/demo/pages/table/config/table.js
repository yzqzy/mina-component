/**
 * @file ProTable 配置文件
 * @module config/table
 */

/**
 * @constant {Array<Object>} STUDENT_COLUMNS1 - 表格配置
 */
export const STUDENT_COLUMNS1 = [
  {
    title: '姓名',
    fixed: 'left',
    align: 'left',
    width: 280,
    dataIndex: 'name'
  },
  {
    title: '性别',
    align: 'flex-end',
    dataIndex: 'sex',
    width: 140,
  },
  {
    title: '年龄',
    align: 'flex-end',
    dataIndex: 'age',
    width: 140
  },
  {
    title: '地址',
    align: 'flex-end',
    dataIndex: 'address',
    width: 190
  },
];

/**
 * @constant {Array<Object>} STUDENT_COLUMNS2 - 表格配置
 */
export const STUDENT_COLUMNS2 = [
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
    width: 150,
  },
  {
    title: '年龄',
    align: 'flex-end',
    dataIndex: 'age',
    width: 150,
    sortable: true
  },
  {
    title: '爱好',
    align: 'flex-end',
    dataIndex: 'hobbiesStr',
    width: 240,
    tooltip: {
      show: true,
      limit: 5
    }
  },
  {
    title: '地址',
    align: 'flex-end',
    dataIndex: 'address',
    width: 180
  },
];
