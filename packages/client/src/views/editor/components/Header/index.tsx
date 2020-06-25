import React from 'react';
import { Button } from 'antd';
import style from './index.module.scss';

interface IProps {
  loading: boolean;
  onPreview: () => void;
  onSave: () => void;
}

export const Header: React.FC<IProps> = ({ loading, onPreview, onSave }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>Ramiko</div>
      <div>
        <Button type="text" onClick={onPreview}>
          预览
        </Button>
        <Button type="primary" onClick={onSave} loading={loading}>
          保存
        </Button>
      </div>
    </div>
  );
};
