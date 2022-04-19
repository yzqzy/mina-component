export default {
  name: 'mina-component',
  build: {
    srcDir: 'packages',
    site: {
      publicPath: '/mina-component/',
    },
  },
  site: {
    versions: [{ label: '0.x', link: '/mina-component/0.x' }],
    title: 'Mina Component',
    description: '小程序组件库',
    logo: 'https://data.yueluo.club/mina/mina.png"',
    simulator: {
      url: 'https://vant-contrib.gitee.io/vant/mobile.html?weapp=1',
      routeMapper: (path) => {
        const map = {
          '/common': '/style',
          '/transition': '/style',
        };
        return `/zh-CN${map[path] || path}`;
      },
      syncPathFromSimulator: false,
    },
    links: [
      {
        logo: 'https://img.yzcdn.cn/vant/vant-o.svg',
        url: 'https://vant-contrib.gitee.io/vant/',
      },
      {
        logo: 'https://b.yzcdn.cn/vant/logo/github.svg',
        url: 'https://github.com/youzan/mina-component',
      },
    ],
    baiduAnalytics: {
      seed: 'ad6b5732c36321f2dafed737ac2da92f',
    },
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
          {
            path: 'changelog',
            title: '更新日志',
          }
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'button',
            title: 'Button 按钮',
          }
        ],
      },
      {
        title: '标注组件',
        items: [
          {
            path: 'calendar',
            title: 'Calendar 日历',
          }
        ],
      },
    ]
  },
};
