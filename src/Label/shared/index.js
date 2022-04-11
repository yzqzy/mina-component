/**
 * @file 工具函数
 * @module Label/shared
 */

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

export const drawLayout = ({
  dpr, width, height, selector
}, receiver) => new Promise(async (resolve) => {
  const ans = await selectorQuery(selector, receiver);

  const { node: canvas } = ans;
  const canvasCtx = canvas.getContext('2d');

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvasCtx.scale(dpr, dpr);

  resolve({
    canvas,
    ctx: canvasCtx
  });
});

export const computeLayout = (maxWidth, maxHeight, width, height) => {
  const originWidth = width;
  const originHeight = height;

  if (width > maxWidth) {
    // eslint-disable-next-line operator-assignment
    height = maxWidth / width * height;
    width = maxWidth;
  }
  if (height > maxHeight) {
    // eslint-disable-next-line operator-assignment
    width = maxHeight / height * width;
    height = maxHeight;
  }

  return {
    width,
    height,
    scale: {
      x: originWidth / width,
      y: originHeight / height
    }
  };
};
