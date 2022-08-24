# next.js + nest.js 构建页面可视化编辑器 -- Ramiko

## 前言

最近看了不少关于 h5 页面制作工具。端午闲来无事，决定尝试下一个页面搭建工具。效果如下：

![](https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-28/QQ20200628-105408-HD.gif)
![](https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/ramiko-ditor.png)
![](https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/ramiko-page.png)

gif 录制效果不佳，可以访问以下链接进行体验。

- Github：[传送门](https://github.com/fantasticit/ramiko)
- 编辑器：[传送门](http://124.221.147.83:4002/editor)

## 技术栈

- next.js：前端模块化开发
- sass: 配合使用 css modules
- nest.js：服务端语言
- MySQL：数据存储

## 整体架构

![](https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-28/ramiko-jiagou.png)

前端开发组件库，完善组件类型，编辑器读取组件完成页面搭建，将页面数据发送至服务端保存。
访问页面，从服务端拉取页面数据，前端渲染页面即可。

## 编辑器设计

![编辑器整体结构图](https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-28/ramiko.png)

```shell
.
|____index.tsx
|____plugins               ## 组件库管理
|____Editor.tsx            ## 编辑器
|____type.ts               ## 类型定义
|____components
| |____Pannel              ## 左侧组件面板
| |____Preview             ## 中间预览面板
| |____Editor              ## 组件编辑器实现
| | |____index.tsx
| | |____PropsEditor
| | | |____index.tsx
| | | |____components
| | | | |____SwitchEditor
| | | | |____RadioEditor
| | | | |____ImgEditor
| | | | |____ColorEditor
| | | | |____TextEditor
| | | | |____TextareaEditor
| | | | |____NumberEditor
| | | |____renderEditorItem.tsx
| | | |____UnionEditor.tsx
| | |____FunctionEditor
| | |____SettingEditor
|____renderPage.tsx
```

## 数据结构

### 定义页面数据结构

既然是可视化页面搭建，那么页面必须可以以某种数据结构进行描述。比如：

```js
{
  setting: {
  } // 页面设置
  components: []; // 页面使用到的组件
}
```

### 定义组件数据结构

页面核心是由组件搭建而成的，那么就要定义组件的数据结构。

```tsx
import React from 'react';

export const Title = ({ title, style }) => {
  return <h1>{title}</h1>;
};

Title.defaultProps = {
  title: '标题'
};

Title.schema = {
  title: {
    title: '标题',
    type: 'text'
  }
};
```

核心可以抽象为：

```js
{
  name: 'Title'; // 对应组件名
  props: {
  }
  schema: {
  }
}
```

#### `name`

不可能把组件源代码保存到服务端，所以这里只保存组件的名称，前端渲染时，根据该名称找到对应组件渲染即可（类似 Vue.js 的动态组件）

#### `props`

React 组件的 props，这里使用 `defaultProps` 赋值默认值

#### `schema`

对应 `props` 各个属性的描述，用于编辑器针对进行渲染。进行组件编辑，实际上编辑的是组件的 `props`，`props` 改变组件的渲染结果自然改变。为了对 `props` 进行编辑，需要定义 `props` 的描述语言，通过 `props` 描述来进行属性编辑。这里使用如下的 `schema`。

```js
{
  title: '标题';
  type: 'text';
}
```

对应组件 `props.title`，通过 `type` 可以决定如何渲染编辑器组件。

## 无渲染组件

可能光能渲染组件是不够的，也许需要更多的功能包装，比如埋点。这一类函数本质上也是组件。可以通过 `schema` 定义进行 `props` 编辑。举个例子：

```js
import React from 'react';

export const Tracking = ({ op, pageSn, pageElSn, children }) => {
  const onClick = () => {
    alert('埋点测试：' + op + '_' + pageSn + '_' + pageElSn);
  };

  return <div onClick={onClick}>{children}</div>;
};

Tracking.defaultProps = {
  op: 'click',
  pageSn: null,
  pageElSn: null
};

Tracking.schema = {
  op: {
    title: '曝光方式',
    type: 'radio',
    options: ['click', 'pv']
  },
  pageSn: {
    title: '页面编号',
    type: 'number'
  },
  pageElSn: {
    title: '元素编号',
    type: 'number'
  }
};
```

## 丰富完善

1. 丰富组件库
2. 优化编辑器：比如添加组件拖拽功能。

## 项目启动

Github：[传送门](https://github.com/fantasticit/ramiko)

在 `client` 和 `server` 分别执行 `yarn dev` 即可。
