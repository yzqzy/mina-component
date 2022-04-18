# 快速上手

### 背景知识

使用 Mina Components 前，请确保你已经学习过微信官方的 [小程序简易教程](https://developers.weixin.qq.com/miniprogram/dev/framework/) 和 [自定义组件介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)。

## 安装

### 步骤一 通过 npm 安装

> 使用 npm 构建前，请先阅读微信官方的 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

```bash
# 通过 npm 安装
npm i mina-components -S --production

# 通过 yarn 安装
yarn add mina-components --production

# 安装 0.x 版本
npm i mina-components -S --production
```

### 步骤二 构建 npm 包

打开微信开发者工具，点击 **工具 -> 构建 npm**，并勾选 **使用 npm 模块** 选项，构建完成后，即可引入组件。

<img style="width: 500px;" src="https://img.yzcdn.cn/public_files/2019/08/15/fa0549210055976cb63798503611ce3d.png" />

### 步骤五 typescript 支持

如果你使用 typescript 开发小程序，还需要做如下操作，以获得顺畅的开发体验。

#### 安装 miniprogram-api-typings

```bash
# 通过 npm 安装
npm i -D miniprogram-api-typings

# 通过 yarn 安装
yarn add -D miniprogram-api-typings
```

#### 在 tsconfig.json 中增加如下配置，以防止 tsc 编译报错。

请将`path/to/node_modules/mina-components`修改为项目的 `node_modules` 中 mina-components 所在的目录。

```json
{
  ...
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "types": ["miniprogram-api-typings"],
    "paths": {
      "mina-components/*": ["path/to/node_modules/mina-components/dist/*"]
    },
    "lib": ["ES6"]
  }
}
```

## 使用

### 引入组件

以 ImagePreview 组件为例，只需要在`app.json`或`index.json`中配置 ImagePreview 对应的路径即可。

所有组件文档中的引入路径均以 npm 安装为例，如果你是通过下载源代码的方式使用 mina-components，请将路径修改为项目中 mina-components 所在的目录。

```json
// 通过 npm 安装
// app.json
"usingComponents": {
  "mina-image-preview": "mina-components/image-preview/index"
}
```

```json
// 通过下载源码使用 es6版本
// app.json
"usingComponents": {
  "mina-image-preview": "path/to/mina-components/dist/image-preview/index"
}
```

```json
// 通过下载源码使用 es5版本
// app.json
"usingComponents": {
  "mina-image-preview": "path/to/mina-components/lib/image-preview/index"
}
```

### 使用组件

引入组件后，可以在 wxml 中直接使用组件

```xml
<mina-image-preview
  id="J-preview"
  catch:onClose="handleClosePreview"
  catch:onChange="handlePreviewChange"
/>
```

## 其他

### 在开发者工具中预览示例小程序

```bash

# 将项目克隆到本地
git clone git@github.com:iheora/mina-components.git

# 安装项目依赖
cd mina-components && npm install

# 执行组件编译
npm run dev

```

接着打开微信开发者工具，导入`example`目录的项目就可以预览示例了。
