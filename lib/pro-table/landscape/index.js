"use strict";
/**
 * @file ProTable - 横屏
 * @module ProTable/landscape
 */
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../../common/component");
var tool_1 = require("../shared/tool");
(0, component_1.VantComponent)({
    props: {
        /**
        * @property {Number} mt - margin top
        * @property {Number} mr - margin right
        * @property {Number} rowH - row height
        */
        mt: {
            type: Number,
            value: 0
        },
        mr: {
            type: Number,
            value: 0
        },
        rowH: {
            type: Number,
            value: 45
        },
        /**
        * @property {Array} columns - 列配置
        * @property {Array} dataSource - 数据
        */
        columns: {
            type: Array,
            value: []
        },
        dataSource: {
            type: Array,
            value: [],
            observer: function () {
                this.init();
            }
        },
        /**
        * @property {String} sortField - 排序字段
        * @property {String} sortType - 排序类型 desc、asc
        */
        sortField: {
            type: String,
            value: ''
        },
        sortType: {
            type: String,
            value: 'desc'
        },
        /**
        * @property {Object} order - 排序相关配置
        * @property {Boolean} order.enabled - 启用排序
        * @property {Boolean} order.styleEnabled - 启用排序样式
        * @property {Boolean} order.next - 是否存在下一级
        */
        order: {
            type: Object,
            value: {}
        }
    },
    data: {
        /**
          * @property {Number} safeAreaLeft - 左侧安全边距
          */
        safeAreaLeft: 0,
        /**
        * @property {Array} leftColumns - 左侧固定列
        * @property {Array} middleColumns - 正常列
        */
        leftColumns: [],
        middleColumns: [],
        /**
        * @property {Array} list - 表格数据
        */
        list: []
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function () {
            var left = wx.getSystemInfoSync().safeArea.left;
            this.setData({
                safeAreaLeft: left
            });
            this.initData();
        },
        initData: function () {
            var _a = this.data, columns = _a.columns, dataSource = _a.dataSource, rowH = _a.rowH;
            var _b = (0, tool_1.normalizeColumns)(columns), leftColumns = _b.leftColumns, middleColumns = _b.middleColumns;
            var list = (0, tool_1.normalizeDataSource)({
                leftColumns: leftColumns,
                middleColumns: middleColumns,
                dataSource: dataSource,
                rowH: rowH
            }).list;
            this.setData({
                leftColumns: leftColumns,
                middleColumns: middleColumns,
                list: list
            });
        },
        /**
        * @description 点击表格项
        * @returns {void}
        */
        handleToNext: function (e) {
            var index = e.currentTarget.dataset.index;
            this.triggerEvent('onNext', { index: index });
        },
        /**
        * @description 表格排序
        * @returns {void}
        */
        handleChangeSort: function (e) {
            var _a = e.currentTarget.dataset, sortable = _a.sortable, field = _a.field;
            if (sortable) {
                this.triggerEvent('onChangeSort', { field: field, type: this.data.sortType });
            }
        },
        /**
         * @description 页面触底
         * @returns {void}
         */
        handleLoadMore: function (e) {
            var direction = e.detail.direction;
            if (direction === 'bottom') {
                this.triggerEvent('onLoadMore');
            }
        },
        noop: function () { }
    }
});
