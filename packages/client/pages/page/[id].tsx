import React, { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { PageProvider } from 'api/page';
import plugins from 'plugins';
import style from './index.module.scss';

const Page: NextPage<any> = ({ page }) => {
  const components = (page.content || []).map(({ name, props }) => {
    return {
      component: plugins.components.get(name),
      props
    };
  });

  return (
    <div className={style.wrapper}>
      {components.map((component, index) => {
        const { component: Component, props } = component;
        return <Component key={index} {...props} />;
      })}
    </div>
  );
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const page = await PageProvider.getPage(id);
  return { page };
};

export default Page;
