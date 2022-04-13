/**
 * @constant {Array<Object>} STUDENT_COLUMNS - 表格配置
 */
export const STUDENT_COLUMNS = [
  {
    title: '姓名',
    fixed: 'left',
    align: 'left',
    width: 220,
    dataIndex: 'name'
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
    title: '地址',
    align: 'flex-end',
    dataIndex: 'address',
    width: 180
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
    title: '地址',
    align: 'flex-end',
    dataIndex: 'address',
    width: 180
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
    title: '地址',
    align: 'flex-end',
    dataIndex: 'address',
    width: 180
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
    title: '地址',
    align: 'flex-end',
    dataIndex: 'address',
    width: 180
  },
];

/**
 * @description 手机号加密处理
 * @param {string} mobile - 手机号
 * @returns {string}
 */
export const mobileSlice = (mobile) => `${mobile.slice(0, 3)}****${mobile.slice(-4)}`;
