import React from 'react';
import {
  paddingCss,
  paddingCssSchema,
  marginCss,
  marginCssSchema,
  fontCss,
  fontCssSchema,
  transformStyle
} from 'views/editor';
import chunk from 'lodash/chunk';
import style from './index.module.scss';

export const ImgTextList = ({ items = [], style: commonStyle }) => {
  const groups = chunk(items, 2);

  return (
    <div className={style.wrapper} style={transformStyle(style)}>
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
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      title: '俄罗斯',
      subTitle: '是个好地方',
      link: '/'
    },
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      title: '新西兰',
      subTitle: '也是个好地方',
      link: '/'
    },
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      title: '马来西亚',
      subTitle: 'WTF',
      link: '/'
    },
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      title: '日本',
      subTitle: '呦西呦西',
      link: '/'
    }
  ],
  style: {
    margin: marginCss,
    padding: paddingCss,
    font: fontCss
  }
};

(ImgTextList as any).schema = {
  items: {
    type: 'children',
    title: '列表',
    schema: {
      cover: {
        title: '图片链接',
        type: 'img',
        width: 686,
        height: 180
      },
      title: {
        title: '标题',
        type: 'text'
      },
      subTitle: {
        title: '副标题',
        type: 'text'
      },
      link: {
        title: '跳转链接',
        type: 'text'
      }
    }
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
