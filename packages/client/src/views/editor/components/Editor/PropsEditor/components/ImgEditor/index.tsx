import React from 'react';
import { Input, Avatar } from 'antd';
import style from './index.module.scss';

export const ImgEditor = ({ schema, value, onChange }) => {
  const { width, height } = schema;

  return (
    <div className={style.wrapper}>
      <p>
        {schema.title || '图片'}
        <span className={style.desc}>
          建议尺寸
          {width}*{height}
        </span>
        <span className={style.desc}>{schema.desc}</span>
      </p>
      {value ? (
        <div className={style.imgWrapper}>
          <img src={value} />
          <span>{value}</span>
        </div>
      ) : null}
      <div>
        <Input value={value} onChange={e => onChange(e.target.value)}></Input>
      </div>
    </div>
  );
};
