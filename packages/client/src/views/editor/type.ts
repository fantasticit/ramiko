export type Mode = 'edit' | 'preview';

export interface IPageSetting {
  name: string;
  bgcolor: string;
  bgimg: string;
  javascript: string;
}

export const pageSchema = {
  name: {
    title: '名称',
    type: 'text'
  },
  bgcolor: {
    title: '背景色',
    type: 'color'
  },
  bgimg: {
    title: '背景图',
    type: 'img'
  },
  js: {
    title: 'JavaScript',
    desc: '仅保存后生效',
    type: 'textarea'
  }
};

// 组件基本数据
export interface IComponentData {
  id?: number | string; // 组件当前索引
  name: string; // 组件名，用于寻找注册的组价
  defaultProps: Record<string, unknown>; // 组件 defaultProps，可用于复制组件用
  props: Record<string, unknown>; // 组件 props
  schema: Record<string, Record<string, unknown>>; // 组件schema 定义，用于渲染编辑器
}

// 组件数据结构
export interface IComponent extends IComponentData {
  fns: Array<IComponentData>;
}
