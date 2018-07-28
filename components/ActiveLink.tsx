import React from 'react';
import { withRouter } from 'next/router';

interface Router {
  pathname: string;
  query: {};
  asPath: string;
  route: string;

  push: Function;
  back: Function;
  beforePopState: Function;
  prefetch: Function;
  reload: Function;
  replace: Function;
}

interface Props {
  router?: Router;
  children: any;
  href: string;
}

const ActiveLink = ({ children, router, href }: Props) => {
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black'
  };

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};

export default withRouter(ActiveLink);
