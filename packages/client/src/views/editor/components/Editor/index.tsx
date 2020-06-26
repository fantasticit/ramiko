import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { IComponent } from '../../type';
import { PropsEditor } from './PropsEditor';
import { FunctionEditor } from './FunctionEditor';
import style from './index.module.scss';

const { TabPane } = Tabs;

interface IProps {
  component: IComponent | null;
  onPropsChange: (props: Pick<IComponent, 'props'>) => void;
  onFunctionsChange: () => void;
  onClose: () => void;
}

export const Editor: React.FC<IProps> = ({
  component = null,
  onPropsChange,
  onFunctionsChange,
  onClose
}) => {
  return (
    <div className={style.wrapper}>
      <h3>
        <span>编辑器</span>
        <CloseOutlined onClick={onClose} />
      </h3>
      <main>
        <Tabs defaultActiveKey="props" size="small">
          <TabPane tab="属性" key="props">
            <PropsEditor component={component} onChange={onPropsChange} />
          </TabPane>
          <TabPane tab="函数" key="function">
            <FunctionEditor
              fns={(component && component.fns) || []}
              onChange={fns => {
                if (!component) {
                  return;
                }
                component.fns = fns;
                onFunctionsChange();
              }}
            />
          </TabPane>
        </Tabs>
      </main>
    </div>
  );
};
