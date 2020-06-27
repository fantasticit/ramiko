import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { IComponent, IPageSetting } from '../../type';
import { PropsEditor } from './PropsEditor';
import { FunctionEditor } from './FunctionEditor';
import { SettingEditor } from './SettingEditor';
import style from './index.module.scss';

const { TabPane } = Tabs;

interface IProps {
  component: IComponent | null;
  setting: IPageSetting | null;
  onPropsChange: (props: Pick<IComponent, 'props'>) => void;
  onFunctionsChange: () => void;
  onSettingChange: (arg: IPageSetting) => void;
  onClose: () => void;
}

export const Editor: React.FC<IProps> = ({
  component = null,
  setting = null,
  onPropsChange,
  onFunctionsChange,
  onSettingChange,
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
          <TabPane tab="页面设置" key="setting">
            <SettingEditor setting={setting} onChange={onSettingChange} />
          </TabPane>
        </Tabs>
      </main>
    </div>
  );
};
