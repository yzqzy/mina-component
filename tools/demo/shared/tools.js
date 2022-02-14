/**
 * @file 工具函数
 * @module pages/shared/tools.js
 */

/**
 * @description 手机号加密处理
 * @param {string} mobile - 手机号
 * @returns {string}
 */
export const mobileSlice = (mobile) => `${mobile.slice(0, 3)}****${mobile.slice(-4)}`;
