import { VantComponent} from '../../../common/component';
import { STUDENTS, Student } from './config/student';
import { STUDENT_COLUMNS, mobileSlice } from './config/index';

VantComponent({
 data: {
    /**
    * @property {array} columns - 表格列配置
    * @property {array} dataSource - 表格数据源
    * @property {object} orderOptions - 表格排序相关配置
    */
    columns: STUDENT_COLUMNS,
    dataSource: [] as Student[],

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

  mounted () {
    this.init();
  },

  methods: {
    init() {
      const originStudents = STUDENTS.concat(STUDENTS).concat(STUDENTS).concat(STUDENTS);
      const students = originStudents.map(item => {
        item.hobbiesStr = item.hobbies.join('、');
        item.mobile = mobileSlice(item.mobile);
        return item;
      });

      const {sortField, sortType} = this.data;

      // 原地排序
      students.sort((a, b) => (sortType === 'desc' ? b[sortField] - a[sortField] : a[sortField] - b[sortField]));

      this.setData({
        dataSource: students
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
      const { dataSource } = this.data;

      const sortType = type === 'desc' ? 'asc' : 'desc';

      dataSource.sort((a, b) => (sortType === 'desc' ? b[field] - a[field] : a[field] - b[field]));

      this.setData({
        dataSource,
        sortType
      });
    },

    /**
     * @description 加载更多数据
     * @returns {void}
     */
    handleLoadMoreData() {
      console.log('load more data');

      wx.showToast({
        icon: 'none',
        title: '没有更多数据了'
      });
    },

    /**
     * @description 回退页面
     * @returns {void}
     */
    handleGoBack() {
      wx.redirectTo({
        url: '/pages/protable-protrait/index'
      });
    }
  }
});
