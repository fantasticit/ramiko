import React, { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { PageProvider } from 'api/page';
import { renderPage } from 'views/editor';
import style from './index.module.scss';

const Page: NextPage<any> = ({ page }) => {
  const components = page.content || [];

  return (
    <div className={style.wrapper}>
      {renderPage({ components: page.content })}
    </div>
  );
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const page = await PageProvider.getPage(id);
  return { page };
};

export default Page;
