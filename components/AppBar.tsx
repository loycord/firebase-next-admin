import React from 'react';
import styled from 'styled-components';

import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import { Navigation } from '../customize/types';

const NRouter: any = Router;

NRouter.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
NRouter.onRouteChangeComplete = () => NProgress.done();
NRouter.onRouteChangeError = () => NProgress.done();

const View = styled.header`
  grid-column: 2 / -1;
  grid-row: 0 / 1;
  box-shadow: 0 0.5rem 1rem
    ${({ theme: { colors, utils } }) => utils.rgba(colors.PRIMARY, 0.1)};
  z-index: 9;
  background-color: ${({ theme: { colors } }) => colors.WHITE};

  ${({ theme: { media } }) => media.phone`
    grid-column: 1 / -1;
    grid-row: 2 / 3;
  `};
`;
const NavBar = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 100%;
  max-width: 100%;
  padding: 0 2rem;

  ${({ theme: { media } }) => media.phone`
    max-width: 100vw;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0;
  `};
`;

interface NavLinkProps {
  isActive: boolean;
  theme?: any;
}

const NavLink = styled.a`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ isActive, theme: { colors } }: NavLinkProps) =>
    isActive ? colors.PRIMARY : colors.DISABLE};

  padding: 2rem;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    color: ${({ theme: { colors } }) => colors.PRIMARY};
  }
`;

interface Props {
  pathname: string;
  data?: Navigation[];
}

class AppBar extends React.PureComponent<Props> {
  render() {
    const { pathname = '/', data } = this.props;
    const pathArr = pathname.split('/');
    const rootPathname = pathArr[1];

    return (
      <View>
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </Head>
        <NavBar>
          {data &&
            data.map(link => (
              <Link key={link.name} href={link.pathname}>
                <NavLink isActive={link.pathname === '/' + rootPathname}>
                  {link.name}
                </NavLink>
              </Link>
            ))}
        </NavBar>
      </View>
    );
  }
}

export default AppBar;
