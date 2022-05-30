/**
 * @file Label - 图片分割
 * @module Label/partition
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VantComponent } from '../../common/component';
import { selectorQuery, computeLayout, drawLayout } from '../shared/tool';
VantComponent({
    props: {
        width: {
            type: String,
            default: '100vw',
        },
        height: {
            type: String,
            default: '750rpx',
        },
        image: {
            type: Object,
            default: {},
        },
        label: {
            type: Object,
            default: {},
            observer(newVal) {
                if (newVal && Object.keys(newVal).length)
                    this.init();
            },
        },
    },
    data: {
        canvasWidth: 0,
        canvasHeight: 0,
    },
    methods: {
        init() {
            return __awaiter(this, void 0, void 0, function* () {
                // 计算画布尺寸
                yield this.computeLayoutSize();
                // 绘制图片
                this.drawImage();
            });
        },
        // 计算画布尺寸
        computeLayoutSize() {
            return __awaiter(this, void 0, void 0, function* () {
                const { width: maxWidth, height: maxHeight } = yield selectorQuery('#J-partition-wrap', this);
                const { width: imageWidth, height: imageHeight } = this.data.label;
                const { width, height } = computeLayout(maxWidth, maxHeight, imageWidth, imageHeight);
                this.setData({
                    canvasWidth: width,
                    canvasHeight: height,
                });
            });
        },
        // 切割图片
        drawImage() {
            return __awaiter(this, void 0, void 0, function* () {
                const { pixelRatio } = wx.getSystemInfoSync();
                const { canvasWidth, canvasHeight, image, label } = this.data;
                const { image_url: url } = image;
                const { top, left, width, height } = label;
                wx.showLoading({
                    title: '图片加载中',
                });
                const { canvas, ctx } = yield drawLayout({
                    dpr: pixelRatio,
                    width: canvasWidth,
                    height: canvasHeight,
                    selector: '#J-image-canvas',
                }, this);
                const img = canvas.createImage();
                img.src = url;
                img.onload = () => {
                    wx.hideLoading();
                    ctx.drawImage(img, left, top, width, height, 0, 0, canvasWidth, canvasHeight);
                };
            });
        },
    },
});
