import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import chunk from 'lodash/chunk';
import style from './index.module.scss';

export const ImgTextList = ({ items = [] }) => {
  const groups = chunk(items, 2);

  return (
    <div className={style.wrapper}>
      {groups.map((group, i) => {
        return (
          <div className={style.row} key={i}>
            {group.map((item, j) => {
              return (
                <div className={style.col} key={i + '_' + j}>
                  <a href={item.link}>
                    <div className={style.mask}></div>
                    <img src={item.cover} alt={item.title} />
                    <div className={style.content}>
                      <p className={style.title}>{item.title}</p>
                      <p className={style.subTitle}>{item.subTitle}</p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

ImgTextList.defaultProps = {
  items: [
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/ChMkJ14X3aqIScr1AAWqQrbP6Y0AAwP_gGzCE0ABapa019.jpg',
      title: '俄罗斯',
      subTitle: '是个好地方',
      link: '/'
    },
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/ChMkJ14X3aqIScr1AAWqQrbP6Y0AAwP_gGzCE0ABapa019.jpg',
      title: '新西兰',
      subTitle: '也是个好地方',
      link: '/'
    },
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/ChMkJ14X3aqIScr1AAWqQrbP6Y0AAwP_gGzCE0ABapa019.jpg',
      title: '马来西亚',
      subTitle: 'WTF',
      link: '/'
    },
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/ChMkJ14X3aqIScr1AAWqQrbP6Y0AAwP_gGzCE0ABapa019.jpg',
      title: '日本',
      subTitle: '呦西呦西',
      link: '/'
    }
  ]
};

(ImgTextList as any).schema = {
  items: {
    type: 'children',
    label: '列表',
    schema: {
      cover: {
        label: '图片链接',
        type: 'img',
        width: 686,
        height: 180
      },
      title: {
        label: '标题',
        type: 'text'
      },
      subTitle: {
        label: '副标题',
        type: 'text'
      },
      link: {
        label: '跳转链接',
        type: 'text'
      }
    }
  }
};
