/**
 * @description 格式化参数
 * @param {object} data
 * @returns {string}
 */
export const formatParams = (data) => {
  let str = '';

  Object.keys(data).forEach((k) => {
    const value = data[k];

    if (value || (!value && typeof value === 'number')) {
      str += `${k}=${data[k]}&`;
    }
  });

  return str.replace(/&$/, '');
};
