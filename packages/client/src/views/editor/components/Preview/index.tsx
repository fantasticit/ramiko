import React, { useState, useRef, useCallback } from 'react';
import cls from 'classnames';
import debounce from 'lodash/debounce';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
import { renderComponent } from './renderComponent';
import style from './index.module.scss';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  border: isDragging ? '1px dashed #000' : 'none',
  background: isDragging ? '#fff' : 'transparent',
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: 'transparent',
  padding: 0,
  width: '100%'
});

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
  onDelete
}) => {
  const isEdit = mode === 'edit';
  const pageStyle = transformPageStyle({ setting });
  delete pageStyle.minHeight;
  delete pageStyle.height;
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
    { leading: true, trailing: false }
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

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    handleSwap(+result.source.index, +result.destination.index);
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
        style={pageStyle}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                style={getListStyle(droppableSnapshot.isDraggingOver)}
              >
                {components.map((component, index) => (
                  <Draggable
                    key={component.id}
                    className={cls(
                      style.componentWrapper,
                      currentIndex === index && isEdit ? style.isHover : false
                    )}
                    draggableId={component.id}
                    index={index}
                  >
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        className={style.componentWrapper}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        style={getItemStyle(
                          draggableSnapshot.isDragging,
                          draggableProvided.draggableProps.style
                        )}
                      >
                        {isEdit && (
                          <div
                            id={COMPONENT_COVER_WRAPPER_ID_PREFIX + index}
                            className={style.componentCoverWrapper}
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
                          />
                        )}
                        <div className={style.componentInstanceWrapper}>
                          {renderComponent({ component, isEdit })}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
  );
};
