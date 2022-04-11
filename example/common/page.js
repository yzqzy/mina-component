export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: 'Mina Components 组件库演示'
      };
    },
    ...options
  });
}
