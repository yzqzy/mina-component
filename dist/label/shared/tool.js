/**
 * @file 工具函数
 * @module label/shared/tool
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
export const selectorQuery = (selector, receiver) => {
    const query = (receiver || wx).createSelectorQuery();
    return new Promise((resolve, reject) => {
        query
            .select(selector)
            .fields({ node: true, size: true, rect: true })
            .exec((res) => {
            if (Array.isArray(res) && res[0]) {
                resolve(res[0]);
                return;
            }
            reject(new TypeError('no selector.'));
        });
    });
};
export const drawLayout = ({ dpr, width, height, selector }, receiver) => 
// eslint-disable-next-line no-async-promise-executor
new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield selectorQuery(selector, receiver);
        const { node: canvas } = ans;
        const canvasCtx = canvas.getContext('2d');
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvasCtx.scale(dpr, dpr);
        resolve({
            canvas,
            ctx: canvasCtx,
        });
    }
    catch (error) {
        reject(error);
    }
}));
export const computeLayout = (maxWidth, maxHeight, width, height) => {
    const originWidth = width;
    const originHeight = height;
    if (width > maxWidth) {
        // eslint-disable-next-line operator-assignment
        height = (maxWidth / width) * height;
        width = maxWidth;
    }
    if (height > maxHeight) {
        // eslint-disable-next-line operator-assignment
        width = (maxHeight / height) * width;
        height = maxHeight;
    }
    return {
        width,
        height,
        scale: {
            x: originWidth / width,
            y: originHeight / height,
        },
    };
};
