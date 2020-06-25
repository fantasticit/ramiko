import React, { useState, useRef } from 'react';
import throttle from 'lodash/throttle';
import cls from 'classnames';
import { Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import style from './index.module.scss';
import plugins from '@/plugins';

interface IProps {
  components: Array<any>;
  mode: 'edit' | 'preview';
  onClosePreview: () => void;
  onMove: (
    component: any,
    index: number,
    direction: 'up' | 'down'
  ) => [any, number];
  onEdit: (component: any, index: number) => void;
  onDelete: (component: any, index: number) => void;
}

export const Preview: React.FC<IProps> = ({
  components = [],
  mode = 'edit',
  onClosePreview,
  onMove,
  onEdit,
  onDelete
}) => {
  const isEdit = mode === 'edit';
  const toolboxRef = useRef(null);
  const [current, setCurrent] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleMove = throttle(e => {
    const el = e.target;
    if (el && toolboxRef.current) {
      const { y } = el.getBoundingClientRect();
      toolboxRef.current.style.top = `${y}px`;
    }
  }, 100);

  return (
    <div className={cls(style.wrapper, isEdit ? false : style.isPreview)}>
      <div
        className={cls(
          style.closePreviewWrapper,
          isEdit ? false : style.isPreview
        )}
        onClick={onClosePreview}
      >
        <CloseOutlined />
      </div>
      <div
        className={cls(style.contentWrapper, isEdit ? false : style.isPreview)}
      >
        {components.map((component, index) => {
          const { name, schema, props } = component;
          const Component = plugins.components.get(name);

          return (
            <div
              className={cls(
                style.componentItemWrapper,
                currentIndex === index && isEdit ? style.isHover : false
              )}
              key={index}
            >
              {isEdit ? (
                <div
                  className={style.componentItemCoverWrapper}
                  onMouseMove={e => {
                    e.persist();
                    setCurrent(component);
                    setCurrentIndex(index);
                    handleMove(e);
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setCurrent(component);
                    setCurrentIndex(index);
                    onEdit(component, index);
                  }}
                ></div>
              ) : null}
              <div className={style.componentItemInstanceWrapper}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={style.componentToolboxWrapper}
        ref={toolboxRef}
        style={{
          visibility: currentIndex > -1 && isEdit ? 'visible' : 'hidden'
        }}
      >
        <ul>
          <li>
            <ArrowUpOutlined
              onClick={() => {
                if (!current || currentIndex < 0) {
                  return;
                }
                const [newComponent, newIndex] = onMove(
                  current,
                  currentIndex,
                  'up'
                );
                setCurrent(newComponent);
                setCurrentIndex(newIndex);
              }}
            />
            <Divider className={style.dividerWrapper} />
            <ArrowDownOutlined
              onClick={() => {
                if (
                  !current ||
                  currentIndex < 0 ||
                  currentIndex >= components.length - 1
                ) {
                  return;
                }
                const [newComponent, newIndex] = onMove(
                  current,
                  currentIndex,
                  'down'
                );
                setCurrent(newComponent);
                setCurrentIndex(newIndex);
              }}
            />
          </li>
          <li>
            <DeleteOutlined
              onClick={() => {
                if (!current || currentIndex < 0) {
                  return;
                }
                onDelete(current, currentIndex);
                setCurrentIndex(-1);
                setCurrent({});
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
