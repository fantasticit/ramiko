import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { PlusOutlined } from '@ant-design/icons';
import style from './index.module.scss';

export interface CardProps {
  domId: string;
  id: any;
  index: number;
  onDrop: (dragIndex: number, hoverIndex: number) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick: () => void;
  onInsertBefore: () => void;
  onInsertAfter: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const DndCover: React.FC<CardProps> = ({
  domId,
  id,
  index,
  onDrop,
  onMouseMove,
  onClick,
  onInsertBefore,
  onInsertAfter
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'card',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onDrop(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={style.componentCoverWrapper}
      id={domId}
      onMouseMove={onMouseMove}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
    >
      {/* <div
        className={style.action}
        onMouseMove={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          onInsertBefore();
        }}
      >
        <PlusOutlined />
      </div>
      <div
        className={style.action}
        onMouseMove={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          onInsertAfter();
        }}
      >
        <PlusOutlined />
      </div> */}
    </div>
  );
};
