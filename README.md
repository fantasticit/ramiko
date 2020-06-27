# ramiko

## 预览

页面搭建工具。效果如下：

![](https://user-gold-cdn.xitu.io/2020/6/27/172f446fdeecd539?w=3132&h=1827&f=png&s=1896699)
![](https://user-gold-cdn.xitu.io/2020/6/27/172f4471a7b15c49?w=1044&h=1701&f=png&s=2089302)

可以访问以下链接进行体验。

- 编辑器：https://blog.wipi.tech/ramiko/editor
- demo：https://blog.wipi.tech/ramiko/page/85333d78-ed24-4adf-8d09-b185fddd73fc

## 技术栈

- React.js
- nest.js
- MySQL

## 思路

1. 定义页面数据结构

既然是可视化页面搭建，那么页面必须可以以某种数据结构进行描述。比如：

```js
{
    setting: {}; // 页面设置
    components: [] // 页面使用到的组件
}
```

2. 定义组件数据结构

页面核心是由组件搭建而成的，那么就要定义组件的数据结构。

```js
{
    name: "BaseTitle"
    props: {}
    schema: {}
}
```

组件都是 React 组件，这里保存组件的名称，前端渲染时，通过名字找到组件，进行渲染。

3. 如何进行组件编辑

进行组件编辑，实际上编辑的是组件的 `props`，`props` 改变组件的渲染结果自然改变。为了对 `props` 进行编辑，需要定义 `props` 的描述语言，通过 `props` 描述来进行属性编辑。这里使用如下的 `schema`。

```js
{
    title: "标题"
    type: "text"
}
```

对应组件 `props.title`，通过 `type` 可以决定如何渲染编辑器组件。

4. 丰富功能

比如添加组件拖拽排序功能。

5. 丰富函数

可能光能渲染组件是不够的，也许需要更多的功能包装，比如埋点。这一类函数本质上也是组件。可以通过 `schema` 定义进行 `props` 编辑。举个例子：

