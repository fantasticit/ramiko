import React from 'react';
import cls from 'classnames';
import style from './index.module.scss';

export const Paragraph = ({ icon, title, content }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <img src={icon} alt="icon" />
        <span>{title}</span>
      </div>
      <div className={style.content}>{content}</div>
    </div>
  );
};

Paragraph.defaultProps = {
  icon:
    'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-24/%E9%93%83%E9%93%9B.svg',
  title: '标题',
  content: `1. 进行插件内组件开发；
  2. 注册组件并进行使用；
  `
};

(Paragraph as any).schema = {
  icon: {
    label: '图标链接',
    type: 'img',
    width: 32,
    height: 32
  },
  title: {
    label: '标题',
    type: 'text'
  },
  content: {
    label: '内容',
    type: 'textarea'
  }
};
