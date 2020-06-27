import React from 'react';
import clone from 'lodash/cloneDeep';
import { IPageSetting, pageSchema } from '../../../type';
import { renderEditorItem } from '../PropsEditor/renderEditorItem';
import style from './index.module.scss';

interface IProps {
  setting: IPageSetting | null;
  onChange: (arg: IPageSetting) => void;
}

export const SettingEditor: React.FC<IProps> = ({ setting, onChange }) => {
  const handle = (key, newValue) => {
    const newProps = clone(setting);
    newProps[key] = newValue;
    onChange(newProps);
  };

  return (
    <div className={style.wrapper}>
      <ul>
        {Object.keys(pageSchema).map(key => {
          return (
            <li key={key}>
              {renderEditorItem(key, setting[key], pageSchema[key], handle)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
