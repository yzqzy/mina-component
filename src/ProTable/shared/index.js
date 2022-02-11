/**
 * @file 工具函数
 * @module ProTable/index
 */

/**
 * @description 标准化列
 * @param {Array} originColumns - 原始列
 * @returns {Object}
 */
export const normalizeColumns = (originColumns) => {
  const leftColumns = [];
  const middleColumns = [];

  const columns = originColumns.slice(0);

  while (columns.length) {
    const item = columns.shift();

    if (item.fixed && item.fixed === 'left') {
      leftColumns.push(item);
    } else {
      middleColumns.push(item);
    }
  }

  return {
    leftColumns,
    middleColumns
  };
};

/**
 * @description 计算倍数
 * @param {String} text
 * @returns {Number}
 */
const getMultiiple = (text) => (/^\d+$/.test(text) ? 2 : 1);

/**
 * @description 标准化数据源
 * @param {Object} params
 * @property {Array} params.leftColumns - 左侧固定列
 * @property {Array} params.middleColumns - 正常列
 * @property {Array} params.dataSource - 数据源
 * @property {Number} params.hd - 表头高度
 * @property {Number} params.wordLimit - 数据源
 * @property {Number} params.rowH - 行高
 * @returns {Object}
 */
export const normalizeDataSource = (
  {
    leftColumns = [],
    middleColumns = [],
    dataSource = [],
    hd = 64,
    wordLimit = 8,
    rowH = 0
  }
) => {
  if (!dataSource.length) {
    return {
      height: hd,
      dataSource
    };
  }

  const increase = Math.floor(rowH / 3);

  middleColumns = middleColumns.filter(col => col.tooltip) || [];

  const height = dataSource.reduce((h, item, index) => {
    let maxH = rowH;

    middleColumns.forEach((col) => {
      const { dataIndex, tooltip: { limit } } = col;
      const field = item[dataIndex] || '';

      if (field.length > limit) {
        dataSource[index][dataIndex] = field.substr(0, limit);
        dataSource[index][dataIndex + '_tooltip'] = field;
      }
    }, []);

    leftColumns.forEach(col => {
      let field = item[col.dataIndex] || '';
      let divMultiple = getMultiiple(field);

      if (col.sub) {
        divMultiple = 2;
        field += item[col.sub.dataIndex];
      }

      let multiple = Math.floor(field.length / (wordLimit * divMultiple));

      if (col.extra && col.extra.merge) {
        const mergeArr = Array.isArray(col.extra.merge) ? col.extra.merge : [col.extra.merge];

        mergeArr.forEach(({ dataIndex, limit }) => {
          const mergeField = item[dataIndex];

          if (mergeField) {
            const currMultiple = Math.floor(mergeField.length / (limit * getMultiiple(mergeField)));

            multiple = Math.max(multiple, currMultiple);
          }
        });
      }

      maxH = rowH + increase * multiple;

      dataSource[index]._custom_height = maxH;
    });

    return h + maxH;
  }, rowH - dataSource.length);

  return {
    height,
    list: dataSource
  };
};
