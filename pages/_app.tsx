import React from 'react';
import App, { Container } from 'next/app';
import styled from 'styled-components';
import withStyle from '../styles';
// components
import AppBar from '../components/AppBar';
import SideBar from '../components/SideBar';
import HomeBox from '../components/HomeBox';
// customize
import { navigation, Logo } from '../customize';

const StyledContainer = withStyle(Container);

const Layout = styled.div`
  display: grid;

  width: 100%;
  height: 100vh;

  grid-template-columns: 7rem 1fr;
  grid-template-rows: 7rem 1fr;
`;

interface MainProps {
  isSideBar: boolean;
}
const Main = styled.div`
  overflow-y: auto;
  ${({ isSideBar }: MainProps) => !isSideBar && 'grid-column: 1 / -1;'};
`;

class MyApp extends App {
  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    const { pathname = '/' } = pageProps;
    const pathArr = pathname.split('/');
    const rootPathname = pathArr[1];
    const regPath = new RegExp('^/' + rootPathname);

    let isSideBar = false;
    if (rootPathname !== '') {
      isSideBar = !!navigation.find(page => regPath.test(page.pathname));
    }

    return (
      <StyledContainer>
        <Layout>
          <HomeBox>
            <Logo />
          </HomeBox>
          <AppBar pathname={pageProps.pathname} data={navigation} />
          {isSideBar && (
            <SideBar pathname={pageProps.pathname} data={navigation} />
          )}
          <Main isSideBar={isSideBar}>
            <Component {...pageProps} />
          </Main>
        </Layout>
      </StyledContainer>
    );
  }
}

export default MyApp;
