export type Mode = 'edit' | 'preview';

// 组件基本数据
export interface IComponentData {
  name: string; // 组件名，用于寻找注册的组价
  props: Record<string, unknown>; // 组件 props
  schema: Record<string, Record<string, unknown>>; // 组件schema 定义，用于渲染编辑器
}

// 组件数据结构
export interface IComponent extends IComponentData {
  fns: Array<IComponentData>;
}
