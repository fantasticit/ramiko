import React, { useState } from 'react';
import { Popover } from 'antd';
import { SketchPicker } from 'react-color';
import style from './index.module.scss';

export const ColorEditor = ({ schema, value, onChange }) => {
  const { width, height } = schema;
  const [visible, setVisible] = useState(false);

  return (
    <div className={style.wrapper}>
      <span>{schema.label || '颜色'}</span>
      <div>
        <Popover
          placement={'leftTop'}
          content={
            <div
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <SketchPicker
                color={value}
                onChangeComplete={color => {
                  onChange(color.hex);
                  setVisible(false);
                }}
              />
            </div>
          }
          title={null}
          trigger="click"
          visible={visible}
          onVisibleChange={setVisible}
        >
          <div
            onClick={() => {
              setVisible(true);
            }}
          >
            <div
              className={style.block}
              style={{ backgroundColor: value }}
            ></div>
            <span>{value}</span>
          </div>
        </Popover>
      </div>
    </div>
  );
};
