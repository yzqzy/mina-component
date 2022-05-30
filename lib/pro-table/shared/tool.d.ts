/**
 * @file 工具函数
 * @module ProTable/shared
 */
/**
 * @description 标准化列
 * @param {Array} originColumns - 原始列
 * @returns {Object}
 */
export declare const normalizeColumns: (originColumns: any) => {
    leftColumns: any[];
    middleColumns: any[];
};
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
export declare const normalizeDataSource: ({ leftColumns, middleColumns, dataSource, hd, wordLimit, rowH, }: {
    leftColumns?: any[] | undefined;
    middleColumns?: any[] | undefined;
    dataSource?: any[] | undefined;
    hd?: number | undefined;
    wordLimit?: number | undefined;
    rowH?: number | undefined;
}) => {
    height: number;
    dataSource: any[];
    list?: undefined;
} | {
    height: any;
    list: any[];
    dataSource?: undefined;
};
