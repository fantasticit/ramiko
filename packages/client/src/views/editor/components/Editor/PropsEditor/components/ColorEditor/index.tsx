import React, { useState } from 'react';
import { Popover, Button } from 'antd';
import { SketchPicker } from 'react-color';
import style from './index.module.scss';

export const ColorEditor = ({ schema, value, onChange }) => {
  const { width, height } = schema;
  const [visible, setVisible] = useState(false);

  return (
    <div className={style.wrapper}>
      <span>
        {schema.title || '颜色'}
        <span className={style.desc}>{schema.desc}</span>
      </span>
      <div>
        <Popover
          placement={'leftTop'}
          content={
            <div
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
              style={{ width: 300, textAlign: 'right' }}
            >
              <SketchPicker
                color={value}
                onChangeComplete={color => {
                  onChange(color.hex);
                }}
              />
              <Button
                size="small"
                style={{ margin: '0 10px 10px' }}
                onClick={() => setVisible(false)}
              >
                关闭
              </Button>
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
