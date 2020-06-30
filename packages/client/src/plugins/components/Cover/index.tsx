import React from 'react';
import cls from 'classnames';
import {
  paddingCss,
  paddingCssSchema,
  marginCss,
  marginCssSchema,
  fontCss,
  fontCssSchema,
  transformStyle
} from '@/views/editor';
import style from './index.module.scss';

export const Cover = ({ link, imgUrl, text, style: commonStyle }) => {
  return (
    <div
      className={cls({
        [style.wrapper]: true
      })}
      style={transformStyle(commonStyle)}
    >
      <a href={link}>
        <img src={imgUrl} alt={imgUrl} />
      </a>
      {text ? <p>{text}</p> : null}
    </div>
  );
};

Cover.defaultProps = {
  isFull: false,
  imgUrl:
    'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
  link: '',
  text: '',
  style: {
    margin: marginCss,
    padding: paddingCss,
    font: fontCss
  }
};

(Cover as any).schema = {
  imgUrl: {
    title: '图片链接',
    type: 'img',
    width: 686,
    height: 180
  },
  link: {
    title: '跳转链接',
    type: 'text'
  },
  text: {
    title: '配文',
    desc: '不填不显示',
    type: 'text'
  },
  style: {
    type: 'children',
    title: '基本样式',
    schema: {
      margin: marginCssSchema,
      padding: paddingCssSchema,
      font: fontCssSchema
    }
  }
};
