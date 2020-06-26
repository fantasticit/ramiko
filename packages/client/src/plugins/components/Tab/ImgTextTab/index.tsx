import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import style from './index.module.scss';

export const ImgTextTab = ({ tabs, defaultActive, tabPosition }) => {
  const [activeKey, setActiveKey] = useState(defaultActive);

  useEffect(() => {
    setActiveKey(defaultActive);
  }, [defaultActive]);

  return (
    <div className={style.wrapper}>
      <Tabs
        tabPosition={tabPosition}
        activeKey={activeKey}
        onChange={setActiveKey}
      >
        {tabs.map((tab, i) => {
          return (
            <Tabs.TabPane tab={tab.name} key={tab.name}>
              {(tab.items || []).map((item, j) => {
                return (
                  <a
                    key={i + '-' + j}
                    className={style.itemWrapper}
                    href={item.link}
                  >
                    <img src={item.cover} alt={item.title} />
                    <h1>{item.title}</h1>
                  </a>
                );
              })}
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

ImgTextTab.defaultProps = {
  defaultActive: '标签一',
  tabPosition: 'top',
  tabs: [
    {
      name: '标签一',
      items: [
        {
          cover:
            'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/ChMkJ14X3aqIScr1AAWqQrbP6Y0AAwP_gGzCE0ABapa019.jpg',
          title: '为什么使用 Ramiko？',
          link: '/'
        },
        {
          cover:
            'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/ChMkJ14X3aqIScr1AAWqQrbP6Y0AAwP_gGzCE0ABapa019.jpg',
          title: '为什么使用 Ramiko？',
          link: '/'
        }
      ]
    },
    {
      name: '标签二',
      items: [
        {
          cover:
            'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/ChMkJ14X3aqIScr1AAWqQrbP6Y0AAwP_gGzCE0ABapa019.jpg',
          title: '为什么使用 Ramiko？',
          link: '/'
        },
        {
          cover:
            'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-04-26/ChMkJ14X3aqIScr1AAWqQrbP6Y0AAwP_gGzCE0ABapa019.jpg',
          title: '为什么使用 Ramiko？',
          link: '/'
        }
      ]
    }
  ]
};

(ImgTextTab as any).schema = {
  defaultActive: {
    label: '默认选中',
    type: 'text'
  },
  tabPosition: {
    label: '页签位置',
    type: 'radio',
    options: ['top', 'bottom', 'left', 'right']
  },
  tabs: {
    type: 'children',
    min: 2,
    label: '标签',
    schema: {
      name: {
        label: '标题',
        type: 'text'
      },
      items: {
        type: 'children',
        min: 1,
        label: '图文',
        schema: {
          cover: {
            label: '图片链接',
            type: 'img',
            width: 686,
            height: 180
          },
          title: {
            label: '文字',
            type: 'text'
          },
          link: {
            label: '跳转链接',
            type: 'text'
          }
        }
      }
    }
  }
};
