import React, { useState, useRef, useCallback } from 'react';
import debounce from 'lodash/debounce';
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

const COMPONENT_COVER_WRAPPER_ID_PREFIX = 'ramiko_component_cover_wrapper_';

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
  const hoverBgRef = useRef(null);
  const [current, setCurrent] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);

  const calcToolboxAndHoverBgAttrs = useCallback(el => {
    // FIXME: 遇到图片时可能需要等待图片加载完成，才可计算出正确高度
    const handle = () => {
      const { y, height } = el.getBoundingClientRect();
      toolboxRef.current.style.top = `${y}px`;
      hoverBgRef.current.style.top = y - 60 + 'px';
      hoverBgRef.current.style.height = height + 'px';
    };

    const img = el.parentNode.querySelector('img');

    if (img) {
      const imgIns = new Image();
      imgIns.onload = () => handle();
      imgIns.onerror = () => handle();
      imgIns.src = img.src;
    } else {
      handle();
    }
  }, []);

  const handleMove = debounce(
    e => {
      const el = e.target;
      if (el && toolboxRef.current && hoverBgRef.current) {
        calcToolboxAndHoverBgAttrs(el);
      }
    },
    100,
    { leading: true, traling: false }
  );

  const moveComponent = direction => {
    let newComponent;
    let newIndex;

    if (direction === 'up') {
      if (!current || currentIndex < 0) {
        return;
      }
      [newComponent, newIndex] = onMove(current, currentIndex, 'up');
    } else {
      if (
        !current ||
        currentIndex < 0 ||
        currentIndex >= components.length - 1
      ) {
        return;
      }
      [newComponent, newIndex] = onMove(current, currentIndex, 'down');
    }

    setCurrent(newComponent);
    setCurrentIndex(newIndex);

    setTimeout(() => {
      const el = document.querySelector(
        `#${COMPONENT_COVER_WRAPPER_ID_PREFIX + newIndex}`
      );
      calcToolboxAndHoverBgAttrs(el);
    }, 0);
  };

  const deleteComponent = () => {
    if (!current || currentIndex < 0) {
      return;
    }
    onDelete(current, currentIndex);
    setCurrentIndex(-1);
    setCurrent({});
  };

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
                style.componentWrapper,
                currentIndex === index && isEdit ? style.isHover : false
              )}
              key={index}
            >
              {isEdit ? (
                <div
                  className={style.componentCoverWrapper}
                  id={COMPONENT_COVER_WRAPPER_ID_PREFIX + index} // 唯一 id 用于 dom 查询
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
              <div className={style.componentInstanceWrapper}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={style.hoverBgWrapper} ref={hoverBgRef}></div>
      <div
        className={style.toolboxWrapper}
        ref={toolboxRef}
        style={{
          visibility: currentIndex > -1 && isEdit ? 'visible' : 'hidden'
        }}
      >
        <ul>
          <li>
            <ArrowUpOutlined onClick={() => moveComponent('up')} />
            <Divider className={style.dividerWrapper} />
            <ArrowDownOutlined onClick={() => moveComponent('down')} />
          </li>
          <li>
            <DeleteOutlined onClick={deleteComponent} />
          </li>
        </ul>
      </div>
    </div>
  );
};
