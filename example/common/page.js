export default function (options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: 'Mina Component 组件库演示',
      };
    },
    ...options,
  });
}
