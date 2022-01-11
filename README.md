# mina-components

微信小程序自定义组件。

## 目录结构

```
|--miniprogram_dev // 开发环境构建目录
|--miniprogram_dist // 生产环境构建目录
|--src // 源码
|   |--components // 通用自定义组件
|
|--test // 测试用例
|--tools // 构建相关代码
|   |--demo // demo 小程序目录，开发环境下会被拷贝生成到 miniprogram_dev 目录中
|   |--config.js // 构建相关配置文件
|
|--gulpfile.js
```

## 已支持组件

### 表格组件（ProTable）

...

## 相关命令

* 执行测试用例：

```
npm run test
```

* 执行测试用例并进入 node inspect 调试：

```
npm run test-debug
```

* 检测覆盖率：

```
npm run coverage
```

* 清空 miniprogram_dist 目录：

```
npm run clean
```

* 清空 miniprogam_dev 目录：

```
npm run clean-dev
```
