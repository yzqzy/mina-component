/**
 * @file 工具函数
 * @module label/shared/tool
 */

type SelectorElement = {
  width: number;
  height: number;
  top: number;
  left: number;
  node: any;
};

export const selectorQuery = (selector, receiver): Promise<SelectorElement> => {
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

type DrawLayout = {
  canvas: any;
  ctx: any;
};

export const drawLayout = (
  { dpr, width, height, selector },
  receiver
): Promise<DrawLayout> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const ans = await selectorQuery(selector, receiver);

      const { node: canvas } = ans;

      if (!canvas) return;

      const canvasCtx = canvas.getContext('2d');

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvasCtx.scale(dpr, dpr);

      resolve({
        canvas,
        ctx: canvasCtx,
      });
    } catch (error) {
      reject(error);
    }
  });

type Scale = {
  x: number;
  y: number;
};

type ComputeLayout = {
  width: number;
  height: number;
  scale: Scale;
};

export const computeLayout = (
  maxWidth,
  maxHeight,
  width,
  height
): ComputeLayout => {
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

const platforms = {
  android: true,
  ios: true,
  windows: false,
  mac: false,
};

const checkisMobile = () =>
  new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: (result) => {
        resolve(platforms[result.platform] || false);
      },
      // eslint-disable-next-line prefer-promise-reject-errors
      fail: () => reject(false),
    });
  });

const getTempFilePath = (path) =>
  new Promise((resolve, reject) => {
    wx.downloadFile({
      url: path,
      success: (result) => {
        resolve(result.tempFilePath);
      },
      // eslint-disable-next-line prefer-promise-reject-errors
      fail: () => reject(''),
    });
  });

export const getRealPath = async (path) => {
  const isMobile = await checkisMobile();

  if (isMobile) return path;

  const dest = await getTempFilePath(path);

  return dest;
};
