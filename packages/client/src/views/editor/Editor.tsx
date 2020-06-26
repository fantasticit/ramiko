import React, { useState } from 'react';
import clone from 'lodash/clone';
import { Modal } from 'antd';
import cls from 'classnames';
import { InfoCircleOutlined } from '@ant-design/icons';
import { PageProvider } from 'api/page';
import { Mode, IComponent } from './type';
import { Header } from './components/Header';
import { Pannel } from './components/Pannel';
import { Preview } from './components/Preview';
import { Editor as PropsEditor } from './components/Editor';
import style from './index.module.scss';

const isProd = process.env.NODE_ENV === 'production';

interface IProps {
  components?: Array<IComponent>;
}

export const Editor: React.FC<IProps> = ({
  components: defaultComponents = []
}) => {
  const [, setCount] = useState<number>(-1);
  const unsafeUpdate = () => setCount(v => v + 1);
  const [mode, setMode] = useState<Mode>('edit');
  const [componentPannelVisible, setComponentPannelVisible] = useState<boolean>(
    true
  );
  const [propsEditorVisible, setPropsEditorVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [components, setComponents] = useState<Array<IComponent>>(
    defaultComponents
  );
  const [current, setCurrent] = useState<IComponent | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // 添加组件
  const addComponent = component => {
    setComponents(components => [
      ...components,
      { ...component, id: components.length }
    ]);
  };

  // 复制组件
  const copy = index => {
    setComponents(components => {
      let target = clone(components[index]);
      target.props = target.defaultProps;
      target.fns = [];
      components.splice(index + 1, 0, target);
      components.forEach((component, index) => {
        component.id = index;
      });
      return components;
    });
    unsafeUpdate();
  };

  // 向指定索引前插入组件
  const insertBefore = (index): number => {
    let newIndex;
    setComponents(components => {
      let target = clone(components[index]);
      target.props = {};
      if (index > 0) {
        newIndex = index + 1;
        components.splice(index - 1, 0, target);
      } else {
        newIndex = 1;
        components.unshift(target);
      }
      return components;
    });
    unsafeUpdate();
    return newIndex;
  };

  // 向指定索引后插入组件
  const insertAfter = (index): number => {
    let newIndex;
    setComponents(components => {
      let target = clone(components[index]);
      target.props = {};
      newIndex = index;
      components.splice(index + 1, 0, target);
      return components;
    });
    unsafeUpdate();
    return newIndex;
  };

  // 编辑当前组件 props
  const editCurrentComponentProps = newProps => {
    setComponents(components => {
      let target = clone(components[currentIndex]);
      target.props = newProps;
      components.splice(currentIndex, 1, target);
      setCurrent(target);
      return components;
    });
    setPropsEditorVisible(true);
    unsafeUpdate();
  };

  // 交换两组件位置（拖拽）
  const swapComponent = (dragIndex, hoverIndex) => {
    setComponents(components => {
      let a = components[dragIndex];
      let b = components[hoverIndex];
      b.id = dragIndex;
      a.id = hoverIndex;
      components.splice(dragIndex, 1, b);
      components.splice(hoverIndex, 1, a);
      return components;
    });
    unsafeUpdate();
  };

  // 移动组件（向上或者向下）
  const moveComponent = (component, index, direction): [IComponent, number] => {
    if (direction === 'up') {
      if (index <= 0) {
        return [component, index];
      }
      setComponents(components => {
        let prev = components[index - 1];
        components.splice(index - 1, 2, component, prev);
        return components;
      });
      unsafeUpdate();
      return [component, index - 1];
    } else {
      if (index >= components.length - 1) {
        return [component, index];
      }
      setComponents(components => {
        let next = components[index + 1];
        components.splice(index, 2, next, component);
        return components;
      });
      unsafeUpdate();
      return [component, index + 1];
    }
  };

  // 删除组件
  const deleteComponent = index => {
    setComponents(components => {
      components.splice(index, 1);
      return components;
    });
    // 编辑器当前组件删除
    if (currentIndex === index && current) {
      setCurrent(null);
    }
    unsafeUpdate();
  };

  const save = () => {
    setLoading(true);
    const data = components.map((component: any) => {
      return {
        id: component.id,
        name: component.name,
        props: component.props,
        schema: component.schema,
        fns: component.fns.map(fn => ({
          name: fn.name,
          props: fn.props,
          schema: fn.schema
        }))
      };
    });
    PageProvider.addPage({ name: Math.random(), content: data }).then(
      (res: any) => {
        setLoading(false);
        const url = `${document.location.origin}${
          isProd ? '/ramiko' : ''
        }/page/${res.id}`;
        Modal.confirm({
          title: '保存成功',
          icon: <InfoCircleOutlined />,
          content: '页面已成功保存。可以通过 ' + url + '查看。是否现在查看？',
          onOk: () => window.open(url),
          okText: '去查看',
          cancelText: '取消'
        });
      }
    );
  };

  return (
    <div className={style.wrapper}>
      <Header
        loading={loading}
        onPreview={() => setMode('preview')}
        onSave={save}
      />
      <main>
        <div
          className={cls(
            style.pannelWrapper,
            style.left,
            componentPannelVisible ? style.isVisible : false
          )}
        >
          <Pannel
            visible={componentPannelVisible}
            onOpen={() => setComponentPannelVisible(true)}
            onSelect={component => {
              addComponent(component);
              setComponentPannelVisible(true);
            }}
            onClose={() => setComponentPannelVisible(false)}
          />
        </div>
        <Preview
          mode={mode}
          onClosePreview={() => setMode('edit')}
          components={components}
          onEdit={index => {
            setCurrent(components[index]);
            setCurrentIndex(index);
            setPropsEditorVisible(true);
          }}
          onSwap={swapComponent}
          onMove={moveComponent}
          onCopy={copy}
          onDelete={deleteComponent}
          insertBefore={insertBefore}
          insertAfter={insertAfter}
        />
        <div
          className={cls(
            style.pannelWrapper,
            style.right,
            current && propsEditorVisible ? style.isVisible : false
          )}
        >
          <PropsEditor
            component={current}
            onPropsChange={editCurrentComponentProps}
            onFunctionsChange={unsafeUpdate}
            onClose={() => setPropsEditorVisible(false)}
          />
        </div>
      </main>
    </div>
  );
};
