import React from 'react';
import clone from 'lodash/cloneDeep';
import { CloseOutlined } from '@ant-design/icons';
import { renderEditorItem } from './Editor';
import style from './index.module.scss';

interface IProps {
  component: any;
  onChange: (props: any) => void;
  onClose: () => void;
}

export const PropsEditor: React.FC<IProps> = ({
  component = {},
  onChange,
  onClose
}) => {
  const { schema = {}, props = {} } = component;

  const handle = (key, newValue) => {
    const newProps = clone(props);
    newProps[key] = newValue;
    onChange(newProps);
  };

  return (
    <div className={style.wrapper}>
      <h3>
        <span>编辑器</span>
        <CloseOutlined onClick={onClose} />
      </h3>
      <main>
        <ul>
          {Object.keys(schema).map(key => {
            return (
              <li key={key}>
                {renderEditorItem(key, props[key], schema[key], handle)}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};
