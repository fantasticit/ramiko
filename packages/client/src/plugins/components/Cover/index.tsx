import React from 'react';
import cls from 'classnames';
import style from './index.module.scss';

export const Cover = ({ isFull = false, link, imgUrl }) => {
  return (
    <div
      className={cls({
        [style.wrapper]: true,
        [style.isFull]: isFull
      })}
    >
      <a href={link}>
        <img src={imgUrl} alt={imgUrl} />
      </a>
    </div>
  );
};

Cover.defaultProps = {
  isFull: false,
  imgUrl:
    'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/ChMkJ14X3aqIScr1AAWqQrbP6Y0AAwP_gGzCE0ABapa019.jpg',
  link: ''
};

(Cover as any).schema = {
  isFull: {
    title: '全宽展示',
    type: 'switch'
  },
  imgUrl: {
    title: '图片链接',
    type: 'img',
    width: 686,
    height: 180
  },
  link: {
    title: '跳转链接',
    type: 'text'
  }
};
