import React, { useState, useRef, useCallback } from 'react';
import debounce from 'lodash/debounce';
import cls from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { Mode, IComponent, IPageSetting } from '../../type';
import { transformPageStyle } from '../../renderPage';
import { DndCover } from './DndCover';
import { renderComponent } from './renderComponent';
import style from './index.module.scss';

interface IProps {
  components: Array<IComponent>;
  setting: IPageSetting;
  mode: Mode;
  onClosePreview: () => void;
  onMove: (
    component: any,
    index: number,
    direction: 'up' | 'down'
  ) => [IComponent, number];
  onSwap: (index1, index2) => void;
  onEdit: (index: number) => void;
  onCopy: (index: number) => void;
  onDelete: (index: number) => void;
  insertBefore: (index: number) => number;
  insertAfter: (index: number) => number;
}

const COMPONENT_COVER_WRAPPER_ID_PREFIX = 'ramiko_component_cover_wrapper_';

export const Preview: React.FC<IProps> = ({
  setting = null,
  components = [],
  mode = 'edit',
  onClosePreview,
  onMove,
  onSwap,
  onEdit,
  onCopy,
  onDelete,
  insertBefore,
  insertAfter
}) => {
  const isEdit = mode === 'edit';
  const toolboxRef = useRef(null);
  const hoverBgRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const calcToolboxAndHoverBgAttrs = useCallback(el => {
    if (!el) {
      return;
    }
    // FIXME: 遇到图片时可能需要等待图片加载完成，才可计算出正确高度
    const handle = () => {
      const { y, height } = el.getBoundingClientRect();
      toolboxRef.current.style.top = `${y}px`;
      hoverBgRef.current.style.top = y - 60 + 'px';
      hoverBgRef.current.style.height = height + 'px';
    };

    const img = (el.parentNode && el.parentNode.querySelector('img')) || null;

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
    50,
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

  const handleSwap = (dragIndex, hoverIndex) => {
    onSwap(dragIndex, hoverIndex);
    setCurrentIndex(hoverIndex);
    setTimeout(() => {
      const el = document.querySelector(
        `#${COMPONENT_COVER_WRAPPER_ID_PREFIX + hoverIndex}`
      );
      calcToolboxAndHoverBgAttrs(el);
    }, 0);
  };

  // TODO:插入组件，不应当是直接使用当前组件，考虑占位，然后进行组件选择
  const handleInsertBefore = () => {
    if (currentIndex > -1) {
      const newIndex = insertBefore(currentIndex);
      setCurrentIndex(newIndex);
      setTimeout(() => {
        const el = document.querySelector(
          `#${COMPONENT_COVER_WRAPPER_ID_PREFIX + newIndex}`
        );
        calcToolboxAndHoverBgAttrs(el);
      }, 0);
    }
  };

  const handleInsertAfter = () => {
    if (currentIndex > -1) {
      const newIndex = insertAfter(currentIndex);
      setCurrentIndex(newIndex);
      setTimeout(() => {
        const el = document.querySelector(
          `#${COMPONENT_COVER_WRAPPER_ID_PREFIX + newIndex}`
        );
        calcToolboxAndHoverBgAttrs(el);
      }, 0);
    }
  };

  const copy = () => {
    if (currentIndex > -1) {
      onCopy(currentIndex);
    }
  };

  const deleteComponent = () => {
    if (!current || currentIndex < 0) {
      return;
    }
    onDelete(currentIndex);
    setCurrentIndex(-1);
    setCurrent(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
          className={cls(
            style.contentWrapper,
            isEdit ? false : style.isPreview
          )}
          style={transformPageStyle({ setting })}
        >
          {components.map((component, index) => {
            return (
              <div
                className={cls(
                  style.componentWrapper,
                  currentIndex === index && isEdit ? style.isHover : false
                )}
                key={index}
              >
                {isEdit ? (
                  <DndCover
                    domId={COMPONENT_COVER_WRAPPER_ID_PREFIX + index}
                    id={index}
                    index={index}
                    onMouseMove={e => {
                      e.persist();
                      setCurrent(component);
                      setCurrentIndex(index);
                      handleMove(e);
                    }}
                    onClick={() => {
                      setCurrent(component);
                      setCurrentIndex(index);
                      onEdit(index);
                    }}
                    onDrop={handleSwap}
                    onInsertBefore={handleInsertBefore}
                    onInsertAfter={handleInsertAfter}
                  />
                ) : null}
                <div className={style.componentInstanceWrapper}>
                  {renderComponent({ component, isEdit })}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={style.hoverBgWrapper}
          ref={hoverBgRef}
          style={{ visibility: isEdit ? 'visible' : 'hidden' }}
        ></div>
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
              <CopyOutlined onClick={copy} />
            </li>
            <li>
              <DeleteOutlined onClick={deleteComponent} />
            </li>
          </ul>
        </div>
      </div>
    </DndProvider>
  );
};
