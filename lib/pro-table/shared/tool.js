"use strict";
/**
 * @file 工具函数
 * @module ProTable/shared
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeDataSource = exports.normalizeColumns = void 0;
/**
 * @description 标准化列
 * @param {Array} originColumns - 原始列
 * @returns {Object}
 */
var normalizeColumns = function (originColumns) {
    var leftColumns = [];
    var middleColumns = [];
    var columns = originColumns.slice(0);
    while (columns.length) {
        var item = columns.shift();
        if (item.fixed && item.fixed === 'left') {
            leftColumns.push(item);
        }
        else {
            middleColumns.push(item);
        }
    }
    return {
        leftColumns: leftColumns,
        middleColumns: middleColumns
    };
};
exports.normalizeColumns = normalizeColumns;
/**
 * @description 计算倍数
 * @param {String} text
 * @returns {Number}
 */
var getMultiiple = function (text) { return (/^\d+$/.test(text) ? 2 : 1); };
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
var normalizeDataSource = function (_a) {
    var _b = _a.leftColumns, leftColumns = _b === void 0 ? [] : _b, _c = _a.middleColumns, middleColumns = _c === void 0 ? [] : _c, _d = _a.dataSource, dataSource = _d === void 0 ? [] : _d, _e = _a.hd, hd = _e === void 0 ? 64 : _e, _f = _a.wordLimit, wordLimit = _f === void 0 ? 8 : _f, _g = _a.rowH, rowH = _g === void 0 ? 0 : _g;
    if (!dataSource.length) {
        return {
            height: hd,
            dataSource: dataSource
        };
    }
    var increase = Math.floor(rowH / 3);
    middleColumns = middleColumns.filter(function (col) { return col.tooltip; }) || [];
    var height = dataSource.reduce(function (h, item, index) {
        var maxH = rowH;
        middleColumns.forEach(function (col) {
            var dataIndex = col.dataIndex, limit = col.tooltip.limit;
            var field = item[dataIndex] || '';
            if (field.length > limit) {
                dataSource[index][dataIndex] = field.substr(0, limit);
                dataSource[index][dataIndex + '_tooltip'] = field;
            }
        }, []);
        leftColumns.forEach(function (col) {
            var field = item[col.dataIndex] || '';
            var divMultiple = getMultiiple(field);
            if (col.sub) {
                divMultiple = 2;
                field += item[col.sub.dataIndex];
            }
            var multiple = Math.floor(field.length / (wordLimit * divMultiple));
            if (col.extra && col.extra.merge) {
                var mergeArr = Array.isArray(col.extra.merge) ? col.extra.merge : [col.extra.merge];
                mergeArr.forEach(function (_a) {
                    var dataIndex = _a.dataIndex, limit = _a.limit;
                    var mergeField = item[dataIndex];
                    if (mergeField) {
                        var currMultiple = Math.floor(mergeField.length / (limit * getMultiiple(mergeField)));
                        multiple = Math.max(multiple, currMultiple);
                    }
                });
            }
            maxH = rowH + increase * multiple;
            dataSource[index]._custom_height = maxH;
        });
        return h + maxH;
    }, rowH);
    return {
        height: height,
        list: dataSource
    };
};
exports.normalizeDataSource = normalizeDataSource;
